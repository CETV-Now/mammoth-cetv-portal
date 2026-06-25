import { auth, clerkClient } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { tasks } from "@trigger.dev/sdk";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, companyName, phone, website, industry } = body;

  if (!firstName || !lastName || !companyName || !phone || !website) {
    return Response.json(
      { error: "firstName, lastName, companyName, phone, and website are required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const now = new Date();

  const clerk = await clerkClient();
  await clerk.users.updateUser(userId, { firstName, lastName });

  const accountUpdate: Record<string, unknown> = {
    name: companyName,
    companyName,
    phone,
    website,
    onboardingStep: 2,
    updated_at: now,
  };
  if (industry) {
    accountUpdate.industry = industry;
  }

  await db.collection("accounts").updateOne(
    { _id: user.account_id },
    { $set: accountUpdate }
  );

  tasks.trigger("sync-mako", {}).catch((err) =>
    console.error("[onboarding/profile] syncMako trigger failed:", err)
  );

  return Response.json({ success: true });
}
