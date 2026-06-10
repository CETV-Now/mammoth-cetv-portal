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

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
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

  let screenObjectId: ObjectId | null = null;
  let locationObjectId: ObjectId | null = null;
  try {
    screenObjectId = screenId ? new ObjectId(screenId) : null;
    locationObjectId = locationId ? new ObjectId(locationId) : null;
  } catch {
    return Response.json({ error: "Invalid screenId or locationId" }, { status: 400 });
  }

  let stripeCustomerId: string = account.stripeCustomerId;
  if (!stripeCustomerId) {
    try {
      const customer = await stripe.customers.create({
        metadata: { clerkUserId: userId, accountId: account._id.toString() },
      });
      stripeCustomerId = customer.id;
    } catch (err) {
      console.error("[orders] Stripe customer create failed:", err);
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
    console.error("[orders] SetupIntent create failed:", err);
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

  return Response.json({ success: true });
}
