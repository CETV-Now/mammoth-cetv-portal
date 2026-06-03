import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { PlaylistForm, type ContentItem, type Screen, type PlaylistData } from "../../components/playlist-form";

export default async function EditPlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  let playlistId: ObjectId;
  try {
    playlistId = new ObjectId(id);
  } catch {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const rawPlaylist = await db.collection("playlists").findOne({ _id: playlistId });
  if (!rawPlaylist) notFound();

  if (rawPlaylist.account_id.toString() !== account._id.toString()) notFound();

  const playlist: PlaylistData = {
    _id: rawPlaylist._id.toString(),
    name: rawPlaylist.name,
    content: (rawPlaylist.content ?? []).map((item: any) => ({
      id: item.id ? item.id.toString() : null,
      name: item.name,
      day_part: item.day_part ?? null,
    })),
    channels: (rawPlaylist.channels ?? []).map((item: any) => ({
      id: item.id ? item.id.toString() : null,
      name: item.name,
    })),
  };

  const rawContent = await db
    .collection("content")
    .find({ account_id: account._id, status: "active" })
    .sort({ created_at: -1 })
    .toArray();

  const content: ContentItem[] = rawContent.map((item) => ({
    _id: item._id.toString(),
    name: item.name,
    url: item.url,
    mime_type: item.mime_type,
    thumbnail_url: item.thumbnail_url,
  }));

  const rawScreens = await db
    .collection("screens")
    .find({ account_id: account._id })
    .toArray();

  const assignedPlaylistIds = rawScreens
    .map((s) => s.playlist_id)
    .filter((pid) => pid && pid.toString() !== playlistId.toString());

  const otherPlaylistDocs = assignedPlaylistIds.length
    ? await db.collection("playlists").find({ _id: { $in: assignedPlaylistIds } }).toArray()
    : [];

  const playlistNameMap = Object.fromEntries(
    otherPlaylistDocs.map((p) => [p._id.toString(), p.name as string])
  );

  const screens: Screen[] = rawScreens.map((s) => ({
    _id: s._id.toString(),
    screen_name: s.screen_name,
    location_name: s.location_name,
    assigned_playlist_name:
      s.playlist_id && s.playlist_id.toString() !== playlistId.toString()
        ? playlistNameMap[s.playlist_id.toString()]
        : undefined,
  }));

  const assignedScreenDocs = await db
    .collection("screens")
    .find({ account_id: account._id, playlist_id: playlistId })
    .toArray();

  const assignedScreenIds = assignedScreenDocs.map((s) => s._id.toString());

  const rawChannels = await db
    .collection("external_content_channels")
    .find({})
    .sort({ name: 1 })
    .toArray();

  const externalChannels = rawChannels.map((c) => ({
    _id: c._id.toString(),
    name: c.name as string,
  }));

  return (
    <PlaylistForm
      mode="edit"
      playlist={playlist}
      content={content}
      screens={screens}
      externalChannels={externalChannels}
      assignedScreenIds={assignedScreenIds}
    />
  );
}
