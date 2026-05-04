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

  let playlistId: ObjectId;
  try {
    playlistId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid playlist id" }, { status: 400 });
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

  const playlist = await db.collection("playlists").findOne({ _id: playlistId });
  if (!playlist) {
    return Response.json({ error: "Playlist not found" }, { status: 404 });
  }

  if (playlist.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const assignedScreens = await db
    .collection("screens")
    .find({ account_id: account._id, playlist_id: playlistId })
    .toArray();

  const serializedContent = (playlist.content ?? []).map(
    (item: { id: ObjectId | null; name: string }) => ({
      id: item.id ? item.id.toString() : null,
      name: item.name,
    })
  );

  const serializedChannels = (playlist.channels ?? []).map(
    (item: { id: ObjectId | null; name: string }) => ({
      id: item.id ? item.id.toString() : null,
      name: item.name,
    })
  );

  return Response.json({
    _id: playlist._id.toString(),
    account_id: playlist.account_id.toString(),
    name: playlist.name,
    status: playlist.status,
    content: serializedContent,
    channels: serializedChannels,
    screen_ids: assignedScreens.map((s) => s._id.toString()),
    created_at: playlist.created_at?.toISOString() ?? null,
    updated_at: playlist.updated_at?.toISOString() ?? null,
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

  let playlistId: ObjectId;
  try {
    playlistId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid playlist id" }, { status: 400 });
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

  const playlist = await db.collection("playlists").findOne({ _id: playlistId });
  if (!playlist) {
    return Response.json({ error: "Playlist not found" }, { status: 404 });
  }

  if (playlist.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const now = new Date();

  if (body.action === "archive") {
    await db.collection("playlists").updateOne(
      { _id: playlistId },
      { $set: { status: "archived", updated_at: now } }
    );
    return Response.json({ success: true });
  }

  const { name, content, channels, screen_ids } = body;

  const contentItems = (content ?? []).map(
    (item: { id: string; name: string }) => ({
      id: new ObjectId(item.id),
      name: item.name,
    })
  );

  const channelItems = (channels ?? []).map(
    (item: { id: string | null; name: string }) => ({
      id: item.id ? new ObjectId(item.id) : null,
      name: item.name,
    })
  );

  await db.collection("playlists").updateOne(
    { _id: playlistId },
    {
      $set: {
        name,
        content: contentItems,
        channels: channelItems,
        updated_at: now,
      },
    }
  );

  const newScreenObjectIds: ObjectId[] =
    Array.isArray(screen_ids) && screen_ids.length > 0
      ? screen_ids.map((sid: string) => new ObjectId(sid))
      : [];

  // Assign playlist to newly selected screens
  if (newScreenObjectIds.length > 0) {
    await db.collection("screens").updateMany(
      { _id: { $in: newScreenObjectIds }, account_id: account._id },
      { $set: { playlist_id: playlistId, updated_at: now } }
    );
  }

  // Remove playlist from screens that were deselected
  await db.collection("screens").updateMany(
    {
      account_id: account._id,
      playlist_id: playlistId,
      ...(newScreenObjectIds.length > 0
        ? { _id: { $nin: newScreenObjectIds } }
        : {}),
    },
    { $set: { playlist_id: null, updated_at: now } }
  );

  return Response.json({ success: true });
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

  let playlistId: ObjectId;
  try {
    playlistId = new ObjectId(id);
  } catch {
    return Response.json({ error: "Invalid playlist id" }, { status: 400 });
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

  const playlist = await db.collection("playlists").findOne({ _id: playlistId });
  if (!playlist) {
    return Response.json({ error: "Playlist not found" }, { status: 404 });
  }

  if (playlist.account_id.toString() !== account._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.collection("playlists").deleteOne({ _id: playlistId });

  const now = new Date();
  await db.collection("screens").updateMany(
    { account_id: account._id, playlist_id: playlistId },
    { $set: { playlist_id: null, updated_at: now } }
  );

  return Response.json({ success: true });
}
