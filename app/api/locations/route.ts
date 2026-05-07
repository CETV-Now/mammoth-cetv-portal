import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { generateInstallCode } from "@/lib/installCode";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, screen_name, address, city, state, zip, lat, long, geo_point, audio_enabled } = body;

  if (!name) {
    return Response.json({ error: "Location name is required" }, { status: 400 });
  }
  if (!screen_name) {
    return Response.json({ error: "Screen name is required" }, { status: 400 });
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

  const now = new Date();
  const cetvNetworkId = new ObjectId(process.env.CETV_NETWORK_ID);

  const locationDoc: Record<string, unknown> = {
    account_id: account._id,
    network_id: cetvNetworkId,
    name,
    created_at: now,
    updated_at: now,
    tag: "CETVNEWTESTING",
  };

  if (address) {
    locationDoc.address = address;
    locationDoc.city = city;
    locationDoc.state = state;
    locationDoc.zip = zip;
    locationDoc.lat = lat;
    locationDoc.long = long;
    locationDoc.geo_point = geo_point;
  }

  const newLocation = await db.collection("locations").insertOne(locationDoc);
  const locationId = newLocation.insertedId;
  const installCode = await generateInstallCode(db);

  const newScreen = await db.collection("screens").insertOne({
    account_id: account._id,
    location_id: locationId,
    screen_name,
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
    installCode,
    audio_enabled: audio_enabled === true,
    created_at: now,
    updated_at: now,
    tag: "CETVNEWTESTING",
  });

  return Response.json(
    { locationId: locationId.toString(), screenId: newScreen.insertedId.toString() },
    { status: 201 }
  );
}
