import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { channels } = body;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const now = new Date();

  await db.collection("screens").updateOne(
    { account_id: user.account_id },
    { $set: { channels: channels ?? [], updated_at: now } },
    { sort: { created_at: 1 } }
  );

  await db.collection("accounts").updateOne(
    { _id: user.account_id },
    { $set: { onboardingStep: 4, updated_at: now } }
  );

  return Response.json({ success: true });
}
