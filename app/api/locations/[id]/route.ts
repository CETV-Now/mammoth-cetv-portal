import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let locationId: ObjectId;
  try {
    locationId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid location id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const location = await db.collection("locations").findOne({ _id: locationId });
  if (!location) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }

  if (location.account_id.toString() !== user.account_id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json({
    _id: location._id.toString(),
    name: location.name,
    address: location.address ?? "",
    city: location.city ?? "",
    state: location.state ?? "",
    zip: location.zip ?? "",
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let locationId: ObjectId;
  try {
    locationId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid location id" }, { status: 400 });
  }

  const body = await req.json();
  const { name, address, city, state, zip, lat, long, geo_point } = body;

  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const location = await db.collection("locations").findOne({ _id: locationId });
  if (!location) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }

  if (location.account_id.toString() !== user.account_id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();

  const update: Record<string, unknown> = { name, updated_at: now };

  if (address !== undefined) {
    update.address = address;
    update.city = city;
    update.state = state;
    update.zip = zip;
    update.lat = lat;
    update.long = long;
    update.geo_point = geo_point;
  }

  await db.collection("locations").updateOne({ _id: locationId }, { $set: update });

  // Keep location_name in sync on all screens for this location
  if (name !== location.name) {
    await db.collection("screens").updateMany(
      { location_id: locationId },
      { $set: { location_name: name, updated_at: now } }
    );
  }

  return Response.json({ success: true, name });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let locationId: ObjectId;
  try {
    locationId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid location id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const location = await db.collection("locations").findOne({ _id: locationId });
  if (!location) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }

  if (location.account_id.toString() !== user.account_id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const activeScreenCount = await db.collection("screens").countDocuments({
    location_id: locationId,
    status: { $ne: "deleted" },
  });

  if (activeScreenCount > 0) {
    return Response.json({ error: "Cannot delete a location that has screens" }, { status: 409 });
  }

  await db.collection("locations").updateOne(
    { _id: locationId },
    { $set: { deleted: true, deleted_date: new Date(), updated_at: new Date() } }
  );

  return Response.json({ success: true });
}
