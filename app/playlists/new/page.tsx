import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { PlaylistForm, type ContentItem, type Screen } from "../components/playlist-form";

export default async function NewPlaylistPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

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
    .filter(Boolean);

  const playlistDocs = assignedPlaylistIds.length
    ? await db.collection("playlists").find({ _id: { $in: assignedPlaylistIds } }).toArray()
    : [];

  const playlistNameMap = Object.fromEntries(
    playlistDocs.map((p) => [p._id.toString(), p.name as string])
  );

  const screens: Screen[] = rawScreens.map((s) => ({
    _id: s._id.toString(),
    screen_name: s.screen_name,
    location_name: s.location_name,
    assigned_playlist_name: s.playlist_id ? playlistNameMap[s.playlist_id.toString()] : undefined,
  }));

  const rawChannels = await db
    .collection("external_channels")
    .find({})
    .sort({ name: 1 })
    .toArray();

  const externalChannels = rawChannels.map((c) => ({
    _id: c._id.toString(),
    name: c.name as string,
  }));

  return <PlaylistForm mode="create" content={content} screens={screens} externalChannels={externalChannels} />;
}
