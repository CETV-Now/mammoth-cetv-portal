import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, address, city, state, zip, lat, long, geo_point } = body;

  if (!name || !address) {
    return Response.json({ error: "Name and address are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const now = new Date();
  const cetvNetworkId = new ObjectId(process.env.CETV_NETWORK_ID);

  try {
  const newLocation = await db.collection("locations").insertOne({
    account_id: user.account_id,
    network_id: cetvNetworkId,
    name: name,
    address: address,
    city: city,
    state: state,
    zip: zip,
    lat: lat,
    long: long,
    geo_point: geo_point,
    created_at: now,
    updated_at: now,
    tag: "CETVNEWTESTING"
  });

  const locationId = newLocation.insertedId;

  const newScreen = await db.collection("screens").insertOne({
    account_id: user.account_id,
    location_id: locationId,
    screen_name: `${name} Screen 1`,
    location_name: name,
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
    tag: "CETVNEWTESTING"
  });

  await db.collection("accounts").updateOne(
    { _id: user.account_id },
    { $set: { onboardingStep: 3, updated_at: now } }
  );

    return Response.json({ locationId: locationId.toString(), screenId: newScreen.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("[location route] DB write error:", err);
    return Response.json({ error: err instanceof Error ? err.message : "Database write failed" }, { status: 500 });
  }
}
