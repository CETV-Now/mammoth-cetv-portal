import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ChannelsPage } from "./channels-page";

export default async function ChannelsPageRoute() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const rawChannels = await db
    .collection("external_content_channels")
    .find({})
    .sort({ name: 1 })
    .toArray();

  const channelIds = rawChannels.map((c) => c._id);
  const countDocs = await db
    .collection("external_content")
    .aggregate([
      { $match: { external_content_channel_id: { $in: channelIds } } },
      { $group: { _id: "$external_content_channel_id", count: { $sum: 1 } } },
    ])
    .toArray();

  const countMap = Object.fromEntries(countDocs.map((d) => [d._id.toString(), d.count as number]));

  const channels = rawChannels.map((c) => ({
    _id: c._id.toString(),
    name: c.name as string,
    thumbnail: (c.thumbnail as string) ?? null,
    content_count: countMap[c._id.toString()] ?? 0,
  }));

  return <ChannelsPage channels={channels} />;
}
