import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(
  _req: Request,
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

  const res = await fetch(socketUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: socketKey,
    },
    body: JSON.stringify({ deviceId: screen.device_id, action: "reboot" }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return Response.json(
      { error: body.error ?? "Failed to send command to device" },
      { status: res.status }
    );
  }

  return Response.json({ success: true });
}
