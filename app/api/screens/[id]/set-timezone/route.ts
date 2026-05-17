import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

const VALID_TIMEZONES = new Set([
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Adak",
  "Pacific/Honolulu",
]);

export async function POST(
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

  const body = await req.json();
  const { timezone } = body;

  if (!timezone || !VALID_TIMEZONES.has(timezone)) {
    return Response.json({ error: "Invalid or missing timezone" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const screen = await db
    .collection("screens")
    .findOne({ _id: screenId, account_id: user.account_id }, { projection: { device_id: 1 } });

  if (!screen) {
    return Response.json({ error: "Screen not found" }, { status: 404 });
  }

  if (!screen.device_id) {
    return Response.json({ error: "Screen has no connected device" }, { status: 422 });
  }

  const socketUrl = process.env.SOCKET_SERVER_URL;
  const socketKey = process.env.SOCKET_SERVER_API_TOKEN;

  if (!socketUrl || !socketKey) {
    return Response.json({ error: "Socket server not configured" }, { status: 503 });
  }

  const socketRes = await fetch(socketUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: socketKey,
    },
    body: JSON.stringify({ deviceId: screen.device_id, action: "set_timezone", timezone }),
  });

  if (!socketRes.ok) {
    const socketBody = await socketRes.json().catch(() => ({}));
    return Response.json(
      { error: socketBody.error ?? "Failed to send command to device" },
      { status: socketRes.status }
    );
  }

  await db.collection("screens").updateOne(
    { _id: screenId },
    { $set: { timezone, updated_at: new Date() } }
  );

  return Response.json({ success: true });
}
