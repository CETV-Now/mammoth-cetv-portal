import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk/v3";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const layouts = await db
    .collection("screen_layouts")
    .find({ account_id: user.account_id })
    .sort({ name: 1 })
    .project({ name: 1, template: 1 })
    .toArray();

  return Response.json(
    layouts.map((l) => ({ _id: l._id.toString(), name: l.name as string, template: l.template as string }))
  );
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { template, name, description, zone_data } = body;

  if (!template || !name || !Array.isArray(zone_data)) {
    return Response.json({ error: "template, name, and zone_data are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const now = new Date();
  const result = await db.collection("screen_layouts").insertOne({
    template,
    name,
    description: description ?? "",
    account_id: user.account_id,
    zone_data,
    created_at: now,
    updated_at: now,
  });

  const layoutId = result.insertedId.toString();

  // Fire-and-forget — don't block the save response if Trigger.dev is unavailable
  tasks
    .trigger("layout-html-generator", { screenLayoutId: layoutId })
    .catch((err) => console.error("[layout-html-generator] trigger failed:", err));

  return Response.json({ _id: layoutId });
}
