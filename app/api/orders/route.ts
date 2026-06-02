import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { shippingAddress, paymentMethodId, screenId, locationId } = body;

  if (!shippingAddress || !paymentMethodId) {
    return Response.json(
      { error: "shippingAddress and paymentMethodId are required" },
      { status: 400 }
    );
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
  let setupIntent: Stripe.SetupIntent;
  try {
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

    setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      usage: "off_session",
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      const isClientError =
        err instanceof Stripe.errors.StripeCardError ||
        err instanceof Stripe.errors.StripeInvalidRequestError;
      return Response.json({ error: err.message }, { status: isClientError ? 400 : 502 });
    }
    throw err;
  }

  const screenObjectId = screenId ? new ObjectId(screenId) : null;

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

  return Response.json({ success: true });
}
