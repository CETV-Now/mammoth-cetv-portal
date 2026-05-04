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
    .collection("external_channels")
    .find({})
    .sort({ name: 1 })
    .toArray();

  const channels = rawChannels.map((c) => ({
    _id: c._id.toString(),
    name: c.name as string,
    thumbnail: (c.thumbnail as string) ?? null,
    content_count: Array.isArray(c.external_content) ? c.external_content.length : 0,
  }));

  return <ChannelsPage channels={channels} />;
}
