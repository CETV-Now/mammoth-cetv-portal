import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk/v3";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let screenId: ObjectId;
  try {
    screenId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid screen id" }, { status: 400 });
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

  const screen = await db.collection("screens").findOne({ _id: screenId });
  if (!screen) {
    return Response.json({ error: "Screen not found" }, { status: 404 });
  }

  if (screen.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const now = new Date();
  const update: Record<string, unknown> = { updated_at: now };

  if ("playlist_id" in body) {
    update.playlist_id = body.playlist_id ? new ObjectId(body.playlist_id) : null;
  }

  if ("layout_id" in body) {
    update.layout_id = body.layout_id ? new ObjectId(body.layout_id) : null;
  }

  if ("status" in body) {
    update.status = body.status;
    if (body.status === "deleted") {
      update.deleted_date = now;
    }
  }

  await db.collection("screens").updateOne({ _id: screenId }, { $set: update });

  // Fire refresh-screen when a playlist or layout assignment changes (not on deletion)
  const isAssignmentChange = ("playlist_id" in body || "layout_id" in body) && !("status" in body);
  if (isAssignmentChange) {
    tasks
      .trigger("refresh-screen", { screenId: id })
      .catch((err) => console.error("[refresh-screen] trigger failed:", err));
  }

  return Response.json({ success: true });
}
