import { headers } from "next/headers";
import { Webhook } from "svix";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { tasks } from "@trigger.dev/sdk";

interface ClerkUserCreatedEvent {
  type: "user.created";
  data: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email_addresses: Array<{ email_address: string }>;
  };
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();

  let wh: InstanceType<typeof Webhook>;
  try {
    wh = new Webhook(webhookSecret);
  } catch (err) {
    console.error("[clerk webhook] Invalid webhook secret:", err);
    return new Response("Invalid webhook secret", { status: 500 });
  }

  let event: ClerkUserCreatedEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch (err) {
    console.error("[clerk webhook] Signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  console.log("[clerk webhook] Event type:", event.type);

  if (event.type !== "user.created") {
    return new Response("OK", { status: 200 });
  }

  const { id: clerkUserId, first_name, last_name, email_addresses } = event.data;
  const firstName = first_name ?? "";
  const lastName = last_name ?? "";
  const email = email_addresses[0]?.email_address ?? "";

  console.log("[clerk webhook] Processing user.created for:", clerkUserId, email);

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  console.log("[clerk webhook] Connected to DB:", process.env.MONGODB_DB);

  const existing = await db.collection("users").findOne({ clerk_user_id: clerkUserId });
  if (existing) {
    console.log("[clerk webhook] User already exists, skipping:", clerkUserId);
    return new Response("OK", { status: 200 });
  }

  const now = new Date();
  const accountId = new ObjectId();

  try {
    await db.collection("accounts").insertOne({
      _id: accountId,
      name: `${firstName} ${lastName}'s Account`.trim(),
      stripeCustomerId: null,
      onboardingStep: 1,
      onboardingComplete: false,
      status: "active",
      platform: "CETV",
      created_at: now,
      updated_at: now,
    });

    console.log("[clerk webhook] Account created:", accountId.toString());

    await db.collection("users").insertOne({
      account_id: accountId,
      clerk_user_id: clerkUserId,
      first_name: firstName,
      last_name: lastName,
      email,
      status: "active",
      platform: "CETV",
      created_at: now,
      updated_at: now,
    });

    console.log("[clerk webhook] User created for:", clerkUserId);
  } catch (err) {
    console.error("[clerk webhook] DB write error:", err);
    return new Response("Internal server error", { status: 500 });
  }

  tasks.trigger("sync-mako", {}).catch((err) =>
    console.error("[clerk webhook] syncMako trigger failed:", err)
  );

  return new Response("OK", { status: 200 });
}
