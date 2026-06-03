import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { ChannelDetailPage } from "./channel-detail-page";

export default async function ChannelDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  let channelId: ObjectId;
  try {
    channelId = new ObjectId(id);
  } catch {
    redirect("/channels");
  }

  const channel = await db.collection("external_content_channels").findOne({ _id: channelId });
  if (!channel) redirect("/channels");

  const rawContent = await db
    .collection("external_content")
    .find({ external_content_channel_id: channelId })
    .sort({ published_date: -1 })
    .toArray();

  const contentItems = rawContent.map((item) => ({
    title: (item.title as string) ?? "",
    url: (item.url as string) ?? "",
    thumbnail_url: (item.thumbnail_url as string) ?? null,
    published_date: (item.published_date as string) ?? null,
  }));

  return (
    <ChannelDetailPage
      channelId={id}
      channelName={channel.name as string}
      thumbnail={(channel.thumbnail as string) ?? null}
      items={contentItems}
    />
  );
}
