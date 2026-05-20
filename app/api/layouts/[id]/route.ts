import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk/v3";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let layoutId: ObjectId;
  try {
    layoutId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid layout id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const layout = await db.collection("screen_layouts").findOne({ _id: layoutId });
  if (!layout) return Response.json({ error: "Layout not found" }, { status: 404 });
  if (layout.account_id.toString() !== user.account_id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const assignedCount = await db.collection("screens").countDocuments({
    account_id: user.account_id,
    layout_id: layoutId,
    status: { $ne: "deleted" },
  });

  if (assignedCount > 0) {
    return Response.json({ error: "Layout is assigned to one or more screens" }, { status: 409 });
  }

  await db.collection("screen_layouts").deleteOne({ _id: layoutId });

  return Response.json({ success: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let layoutId: ObjectId;
  try {
    layoutId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid layout id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const layout = await db.collection("screen_layouts").findOne({ _id: layoutId });
  if (!layout) return Response.json({ error: "Layout not found" }, { status: 404 });
  if (layout.account_id.toString() !== user.account_id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { name, description, zone_data, clock_weather_scheme } = body;

  if (!name || !Array.isArray(zone_data)) {
    return Response.json({ error: "name and zone_data are required" }, { status: 400 });
  }

  await db.collection("screen_layouts").updateOne(
    { _id: layoutId },
    { $set: { name, description: description ?? "", zone_data, clock_weather_scheme: clock_weather_scheme ?? "blue", updated_at: new Date() } }
  );

  tasks
    .trigger("layout-html-generator", { screenLayoutId: id })
    .catch((err) => console.error("[layout-html-generator] trigger failed:", err));

  return Response.json({ success: true });
}
