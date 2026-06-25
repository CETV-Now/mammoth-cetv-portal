import { auth, clerkClient } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { tasks } from "@trigger.dev/sdk";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
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

  const screenObjectId = screenId ? new ObjectId(screenId) : null;
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
      {
        _id: promoObjectId,
        status: "active",
        $or: [
          { type: "one_time_use" },
          { used_by_account_ids: { $ne: user.account_id } },
        ],
      },
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

    if (promoCode.type === "one_time_use") {
      await db.collection("promo_codes").updateOne(
        { _id: promoObjectId },
        { $set: { used_by_account_id: user.account_id, used_at: now } }
      );
    } else {
      await db.collection("promo_codes").updateOne(
        { _id: promoObjectId },
        { $addToSet: { used_by_account_ids: user.account_id } }
      );
    }

    await db.collection("device_orders").insertOne({
      account_id: user.account_id,
      user_id: user._id,
      screen_id: screenObjectId,
      location_id: locationId ? new ObjectId(locationId) : null,
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
      const customer = await stripe.customers.create({
        metadata: { clerkUserId: userId, accountId: account._id.toString() },
      });
      stripeCustomerId = customer.id;
      await db.collection("accounts").updateOne(
        { _id: account._id },
        { $set: { stripeCustomerId, updated_at: now } }
      );
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      usage: "off_session",
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });

    await db.collection("device_orders").insertOne({
      account_id: user.account_id,
      user_id: user._id,
      screen_id: screenObjectId,
      location_id: locationId ? new ObjectId(locationId) : null,
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
