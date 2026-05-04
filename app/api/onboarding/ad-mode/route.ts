import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { adServingMode, screenId } = body;

  if (!adServingMode) {
    return Response.json({ error: "adServingMode is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const now = new Date();

  if (screenId) {
    await db.collection("screens").updateOne(
      { _id: new ObjectId(screenId), account_id: user.account_id },
      { $set: { ad_serving_mode: adServingMode, updated_at: now } }
    );
  } else {
    await db.collection("screens").updateMany(
      { account_id: user.account_id },
      { $set: { ad_serving_mode: adServingMode, updated_at: now } }
    );
  }

  await db.collection("accounts").updateOne(
    { _id: user.account_id },
    { $set: { onboardingStep: 3, updated_at: now } }
  );

  return Response.json({ success: true });
}
