import { auth } from "@clerk/nextjs/server";
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
    return Response.json({});
  }

  const location = await db
    .collection("locations")
    .findOne({ account_id: user.account_id }, { sort: { created_at: -1 } });

  const screen = await db
    .collection("screens")
    .findOne({ account_id: user.account_id }, { sort: { created_at: -1 } });

  if (!location) {
    return Response.json({});
  }

  return Response.json({
    address: location.address ?? "",
    city: location.city ?? "",
    state: location.state ?? "",
    zip: location.zip ?? "",
    locationId: location._id.toString(),
    screenId: screen?._id.toString() ?? null,
  });
}
