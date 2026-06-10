import { auth, clerkClient } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { tasks } from "@trigger.dev/sdk";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { shippingAddress, paymentMethodId, promoCodeId, screenId, locationId } = body;

  if (!shippingAddress) {
    return Response.json({ error: "shippingAddress is required" }, { status: 400 });
  }
  if (!paymentMethodId && !promoCodeId) {
    return Response.json({ error: "paymentMethodId or promoCodeId is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  const now = new Date();

  let screenObjectId: ObjectId | null = null;
  let locationObjectId: ObjectId | null = null;
  try {
    screenObjectId = screenId ? new ObjectId(screenId) : null;
    locationObjectId = locationId ? new ObjectId(locationId) : null;
  } catch {
    return Response.json({ error: "Invalid screenId or locationId" }, { status: 400 });
  }
  const screen = screenObjectId
    ? await db.collection("screens").findOne({ _id: screenObjectId })
    : null;
  const isAdFree = screen?.ad_serving_mode === "ad-free";

  // Promo code path — skip Stripe entirely
  if (promoCodeId) {
    let promoObjectId: ObjectId;
    try {
      promoObjectId = new ObjectId(promoCodeId);
    } catch {
      return Response.json({ error: "Invalid promo code" }, { status: 400 });
    }

    // Atomically fetch-and-claim one_time_use codes in a single operation.
    // For reusable codes the update is a no-op write (status stays "active"),
    // but we still use findOneAndUpdate so both types go through one round-trip
    // and we get the document back to read its type.
    const promoCode = await db.collection("promo_codes").findOneAndUpdate(
      { _id: promoObjectId, status: "active" },
      [
        {
          $set: {
            status: { $cond: [{ $eq: ["$type", "one_time_use"] }, "used", "$status"] },
            updated_at: now,
          },
        },
      ],
      { returnDocument: "before" }
    );

    if (!promoCode) {
      return Response.json({ error: "Promo code is no longer available" }, { status: 400 });
    }

    await db.collection("device_orders").insertOne({
      account_id: user.account_id,
      user_id: user._id,
      screen_id: screenObjectId,
      location_id: locationObjectId,
      shippingAddress,
      promo_code_id: promoObjectId,
      status: "pending",
      created_at: now,
      updated_at: now,
    });
  } else {
    // Stripe payment path
    let stripeCustomerId: string = account.stripeCustomerId;
    if (!stripeCustomerId) {
      try {
        const customer = await stripe.customers.create({
          metadata: { clerkUserId: userId, accountId: account._id.toString() },
        });
        stripeCustomerId = customer.id;
      } catch (err) {
        console.error("[onboarding/order] Stripe customer create failed:", err);
        return Response.json(
          { error: "Payment setup failed. Please try again." },
          { status: 502 }
        );
      }
      await db.collection("accounts").updateOne(
        { _id: account._id },
        { $set: { stripeCustomerId, updated_at: now } }
      );
    }

    let setupIntent: Stripe.SetupIntent;
    try {
      setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        confirm: true,
        usage: "off_session",
        automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      });
    } catch (err) {
      if (err instanceof Stripe.errors.StripeCardError) {
        return Response.json(
          { error: err.message ?? "Your card was declined." },
          { status: 402 }
        );
      }
      if (err instanceof Stripe.errors.StripeInvalidRequestError) {
        return Response.json(
          { error: "Invalid payment details. Please re-enter your card and try again." },
          { status: 400 }
        );
      }
      console.error("[onboarding/order] SetupIntent create failed:", err);
      return Response.json(
        { error: "Payment setup failed. Please try again." },
        { status: 502 }
      );
    }

    // confirm: true with redirects disallowed must yield "succeeded" here;
    // any other status means the card was not verified, so no order may be placed.
    if (setupIntent.status !== "succeeded") {
      return Response.json(
        { error: "Your card could not be verified. Please try a different payment method." },
        { status: 402 }
      );
    }

    await db.collection("device_orders").insertOne({
      account_id: user.account_id,
      user_id: user._id,
      screen_id: screenObjectId,
      location_id: locationObjectId,
      shippingAddress,
      stripeCustomerId,
      stripeSetupIntent: setupIntent.id,
      stripeDeviceProductId: process.env.STRIPE_DEVICE_PRODUCT_ID,
      status: "pending",
      created_at: now,
      updated_at: now,
    });
  }

  await db.collection("accounts").updateOne(
    { _id: account._id },
    {
      $set: {
        onboardingComplete: true,
        onboardingStep: 4,
        stripeSubscriptionPriceId: isAdFree ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID : null,
        stripeSubscriptionProductId: isAdFree ? process.env.STRIPE_SUBSCRIPTION_PRODUCT_ID : null,
        updated_at: now,
      },
    }
  );

  const clerk = await clerkClient();
  const [clerkUser] = await Promise.all([
    clerk.users.getUser(userId),
    clerk.users.updateUserMetadata(userId, {
      publicMetadata: { onboardingComplete: true },
    }),
  ]);

  const primaryEmail = clerkUser.emailAddresses.find(
    (e) => e.id === clerkUser.primaryEmailAddressId
  )?.emailAddress ?? "";

  tasks.trigger("sync-mako", {}).catch((err) =>
    console.error("[onboarding/order] syncMako trigger failed:", err)
  );

  tasks
    .trigger("crawl-business-context", { account_id: account._id.toString() })
    .catch((err) => console.error("[onboarding/order] crawlBusinessContext trigger failed:", err));

  tasks
    .trigger("send-welcome-email", {
      account_id: account._id.toString(),
      first_name: clerkUser.firstName ?? "",
      last_name: clerkUser.lastName ?? "",
      email_address: primaryEmail,
    })
    .catch((err) => console.error("[onboarding/order] sendWelcomeEmail trigger failed:", err));

  return Response.json({ success: true });
}
