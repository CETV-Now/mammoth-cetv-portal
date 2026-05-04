import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const channels = await db
    .collection("external_channels")
    .find({})
    .sort({ name: 1 })
    .toArray();

  return Response.json(
    channels.map((c) => ({
      _id: c._id.toString(),
      name: c.name as string,
      thumbnail: (c.thumbnail as string) ?? null,
      content_count: Array.isArray(c.external_content) ? c.external_content.length : 0,
    }))
  );
}
