import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { PlaylistsPage, type PlaylistListItem } from "./playlists-page";

export default async function PlaylistsRoute() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const rawPlaylists = await db
    .collection("playlists")
    .find({ account_id: account._id, status: "active" })
    .sort({ created_at: -1 })
    .toArray();

  const initialPlaylists: PlaylistListItem[] = await Promise.all(
    rawPlaylists.map(async (playlist) => {
      const screenCount = await db
        .collection("screens")
        .countDocuments({ account_id: account._id, playlist_id: playlist._id });

      return {
        _id: playlist._id.toString(),
        name: playlist.name,
        content_count: (playlist.content ?? []).length,
        channel_count: (playlist.channels ?? []).length,
        screen_count: screenCount,
      };
    })
  );

  return <PlaylistsPage initialPlaylists={initialPlaylists} />;
}
