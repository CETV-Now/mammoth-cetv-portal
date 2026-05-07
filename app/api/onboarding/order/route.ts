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
  const { shippingAddress, paymentMethodId, screenId, locationId } = body;

  if (!shippingAddress || !paymentMethodId) {
    return Response.json({ error: "shippingAddress and paymentMethodId are required" }, { status: 400 });
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

  const screenObjectId = screenId ? new ObjectId(screenId) : null;
  const screen = screenObjectId
    ? await db.collection("screens").findOne({ _id: screenObjectId })
    : null;
  const isAdFree = screen?.ad_serving_mode === "ad-free";

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
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { onboardingComplete: true },
  });

  tasks.trigger("sync-mako", {}).catch((err) =>
    console.error("[onboarding/order] syncMako trigger failed:", err)
  );

  return Response.json({ success: true });
}
