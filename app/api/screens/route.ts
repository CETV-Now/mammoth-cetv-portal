import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
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

  const screens = await db
    .collection("screens")
    .find(
      { account_id: account._id },
      { projection: { _id: 1, screen_name: 1, location_name: 1, playlist_id: 1 } }
    )
    .toArray();

  const serialized = screens.map((screen) => ({
    _id: screen._id.toString(),
    screen_name: screen.screen_name,
    location_name: screen.location_name,
    playlist_id: screen.playlist_id ? screen.playlist_id.toString() : null,
  }));

  return Response.json(serialized);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { location_id, screen_name } = body;

  if (!location_id) {
    return Response.json({ error: "location_id is required" }, { status: 400 });
  }
  if (!screen_name) {
    return Response.json({ error: "screen_name is required" }, { status: 400 });
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

  let locationId: ObjectId;
  try {
    locationId = new ObjectId(location_id);
  } catch {
    return Response.json({ error: "Invalid location_id" }, { status: 400 });
  }

  const location = await db.collection("locations").findOne({ _id: locationId });
  if (!location) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }
  if (location.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();
  const cetvNetworkId = new ObjectId(process.env.CETV_NETWORK_ID);

  const newScreen = await db.collection("screens").insertOne({
    account_id: account._id,
    location_id: locationId,
    screen_name,
    location_name: location.name,
    partner: "CETV",
    state: null,
    status: "new",
    play_count: 0,
    screen_size: null,
    network_id: cetvNetworkId,
    utc_offset: 0,
    connected: false,
    ad_serving_mode: "ad-supported",
    layout_id: null,
    playlist_id: null,
    created_at: now,
    updated_at: now,
    tag: "CETVNEWTESTING",
  });

  return Response.json({ screenId: newScreen.insertedId.toString() }, { status: 201 });
}
