import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let screenId: ObjectId;
  try {
    screenId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid screen id" }, { status: 400 });
  }

  const { pin } = await req.json();
  if (!pin || typeof pin !== "string") return Response.json({ error: "pin is required" }, { status: 400 });
  const sanitizedPin = pin.replace(/[^a-zA-Z0-9]/g, "");
  if (sanitizedPin.length !== 4) return Response.json({ error: "PIN must be 4 alphanumeric characters" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const screen = await db
    .collection("screens")
    .findOne({ _id: screenId, account_id: user.account_id });
  if (!screen) return Response.json({ error: "Screen not found" }, { status: 404 });

  await db.collection("screens").updateOne(
    { _id: screenId },
    { $set: { token: sanitizedPin, updated_at: new Date() } }
  );

  return Response.json({ success: true });
}
