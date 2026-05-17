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

  const playlists = await db
    .collection("playlists")
    .find({ account_id: account._id, status: "active" })
    .sort({ created_at: -1 })
    .toArray();

  // Single query to get all screen counts — avoids N+1 countDocuments per playlist
  const playlistIds = playlists.map((p) => p._id);
  const assignedScreens = await db
    .collection("screens")
    .find({ account_id: account._id, playlist_id: { $in: playlistIds } })
    .project({ playlist_id: 1 })
    .toArray();

  const screenCountByPlaylist = new Map<string, number>();
  for (const screen of assignedScreens) {
    const key = screen.playlist_id?.toString();
    if (key) screenCountByPlaylist.set(key, (screenCountByPlaylist.get(key) ?? 0) + 1);
  }

  const enriched = playlists.map((playlist) => ({
    ...playlist,
    _id: playlist._id.toString(),
    account_id: playlist.account_id.toString(),
    content_count: (playlist.content ?? []).length,
    channel_count: (playlist.channels ?? []).length,
    screen_count: screenCountByPlaylist.get(playlist._id.toString()) ?? 0,
    created_at: playlist.created_at?.toISOString() ?? null,
    updated_at: playlist.updated_at?.toISOString() ?? null,
  }));

  return Response.json(enriched);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, content, channels, screen_ids } = body;

  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
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

  const contentItems = (content ?? []).map(
    (item: { id: string; name: string; day_part?: { days: string[]; start: string; end: string } | null }) => ({
      id: new ObjectId(item.id),
      name: item.name,
      day_part: item.day_part ?? null,
    })
  );

  const channelItems = (channels ?? []).map(
    (item: { id: string | null; name: string }) => ({
      id: item.id ? new ObjectId(item.id) : null,
      name: item.name,
    })
  );

  const result = await db.collection("playlists").insertOne({
    account_id: account._id,
    name,
    status: "active",
    content: contentItems,
    channels: channelItems,
    created_at: now,
    updated_at: now,
  });

  const insertedId = result.insertedId;

  if (Array.isArray(screen_ids) && screen_ids.length > 0) {
    const screenObjectIds = screen_ids.map((id: string) => new ObjectId(id));
    await db.collection("screens").updateMany(
      { _id: { $in: screenObjectIds }, account_id: account._id },
      { $set: { playlist_id: insertedId, updated_at: now } }
    );
  }

  return Response.json({
    _id: insertedId.toString(),
    account_id: account._id.toString(),
    name,
    status: "active",
    content: (content ?? []),
    channels: (channels ?? []),
    content_count: (content ?? []).length,
    channel_count: (channels ?? []).length,
    screen_count: screen_ids?.length ?? 0,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  });
}
