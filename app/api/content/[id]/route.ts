import { auth } from "@clerk/nextjs/server";
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

  let contentId: ObjectId;
  try {
    contentId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid content id" }, { status: 400 });
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

  const content = await db.collection("content").findOne({ _id: contentId });
  if (!content) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }

  if (content.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const status = body?.status === "active" ? "active" : "archived";

  await db.collection("content").updateOne(
    { _id: contentId },
    { $set: { status, updated_at: new Date() } }
  );

  return Response.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let contentId: ObjectId;
  try {
    contentId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid content id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
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

  const content = await db.collection("content").findOne({ _id: contentId });
  if (!content) {
    return Response.json({ error: "Content not found" }, { status: 404 });
  }

  if (content.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.collection("content").updateOne(
    { _id: contentId },
    { $set: { name: body.name.trim(), runtime: Number(body.runtime) || 0, updated_at: new Date() } }
  );

  return Response.json({ success: true });
}
