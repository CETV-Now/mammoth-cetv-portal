import { headers } from "next/headers";
import { Webhook } from "svix";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

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
  const wh = new Webhook(webhookSecret);

  let event: ClerkUserCreatedEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id: clerkUserId, first_name, last_name } = event.data;
    const firstName = first_name ?? "";
    const lastName = last_name ?? "";

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const now = new Date();
    const accountId = new ObjectId();

    await db.collection("accounts").insertOne({
      _id: accountId,
      name: `${firstName} ${lastName}'s Account`.trim(),
      stripeCustomerId: null,
      onboardingStep: 1,
      onboardingComplete: false,
      created_at: now,
      updated_at: now,
    });

    await db.collection("users").insertOne({
      account_id: accountId,
      clerk_user_id: clerkUserId,
      first_name: firstName,
      last_name: lastName,
      status: "active",
      created_at: now,
      updated_at: now,
    });
  }

  return new Response("OK", { status: 200 });
}
