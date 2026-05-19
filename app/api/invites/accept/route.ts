import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { token } = await req.json();
  if (!token) return Response.json({ error: "Token is required" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const invite = await db.collection("invites").findOne({ token, status: "pending" });
  if (!invite) {
    return Response.json({ error: "Invite not found or already used" }, { status: 404 });
  }

  if (new Date() > invite.expires_at) {
    return Response.json({ error: "This invite has expired" }, { status: 410 });
  }

  const currentUser = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!currentUser) return Response.json({ error: "User not found" }, { status: 404 });

  const now = new Date();

  await db.collection("users").updateOne(
    { clerk_user_id: userId },
    { $set: { account_id: invite.account_id, updated_at: now } }
  );

  await db.collection("invites").updateOne(
    { token },
    { $set: { status: "accepted", accepted_at: now, accepted_by_user_id: currentUser._id } }
  );

  return Response.json({ success: true });
}
