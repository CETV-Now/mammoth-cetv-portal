import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { ScreensPage, type LocationGroup, type LocationOption, type ScreenRow } from "./screens-page";

export default async function ScreensPageRoute() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const rawScreens = await db
    .collection("screens")
    .find({ account_id: account._id, status: { $ne: "deleted" } })
    .sort({ created_at: 1 })
    .toArray();

  const rawLocations = await db
    .collection("locations")
    .find({ account_id: account._id, deleted: { $ne: true } })
    .sort({ name: 1 })
    .toArray();

  const locations: LocationOption[] = rawLocations.map((l) => ({
    _id: l._id.toString(),
    name: l.name as string,
  }));

  // Fetch playlist and layout names for assigned ones
  const playlistIds = rawScreens
    .map((s) => s.playlist_id)
    .filter((id): id is ObjectId => id != null);

  const layoutIds = rawScreens
    .map((s) => s.layout_id)
    .filter((id): id is ObjectId => id != null);

  const [playlistDocs, layoutDocs] = await Promise.all([
    playlistIds.length
      ? db.collection("playlists").find({ _id: { $in: playlistIds } }).project({ name: 1 }).toArray()
      : Promise.resolve([]),
    layoutIds.length
      ? db.collection("screen_layouts").find({ _id: { $in: layoutIds } }).project({ name: 1 }).toArray()
      : Promise.resolve([]),
  ]);

  const playlistNameMap = Object.fromEntries(
    playlistDocs.map((p) => [p._id.toString(), p.name as string])
  );

  const layoutNameMap = Object.fromEntries(
    layoutDocs.map((l) => [l._id.toString(), l.name as string])
  );

  // Seed the map with all locations so empty ones still appear
  const groupMap = new Map<string, LocationGroup>();
  for (const l of rawLocations) {
    groupMap.set(l._id.toString(), {
      location_id: l._id.toString(),
      location_name: l.name as string,
      screens: [],
    });
  }

  for (const s of rawScreens) {
    const locId = s.location_id?.toString() ?? "unknown";
    const locName = s.location_name ?? "Unknown Location";

    if (!groupMap.has(locId)) {
      groupMap.set(locId, { location_id: locId, location_name: locName, screens: [] });
    }

    const screen: ScreenRow = {
      _id: s._id.toString(),
      screen_name: s.screen_name,
      location_name: locName,
      status: s.status ?? "new",
      connected: s.connected ?? false,
      ad_serving_mode: s.ad_serving_mode ?? "ad-supported",
      playlist_id: s.playlist_id ? s.playlist_id.toString() : null,
      playlist_name: s.playlist_id ? (playlistNameMap[s.playlist_id.toString()] ?? null) : null,
      layout_id: s.layout_id ? s.layout_id.toString() : null,
      layout_name: s.layout_id ? (layoutNameMap[s.layout_id.toString()] ?? null) : null,
    };

    groupMap.get(locId)!.screens.push(screen);
  }

  const locationGroups = Array.from(groupMap.values());

  return <ScreensPage locationGroups={locationGroups} locations={locations} />;
}
