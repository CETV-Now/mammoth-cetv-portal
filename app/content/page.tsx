import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ContentLibrary, type ContentItem } from "./content-library";

export default async function ContentPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    redirect("/onboarding");
  }

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) {
    redirect("/onboarding");
  }

  const rawItems = await db
    .collection("content")
    .find({ account_id: account._id, status: "active", type: { $ne: "layout_content" } })
    .sort({ created_at: -1 })
    .toArray();

  const items: ContentItem[] = rawItems.map((item) => ({
    _id: item._id.toString(),
    name: item.name,
    url: item.url,
    mime_type: item.mime_type,
    runtime: item.runtime,
    created_at: item.created_at?.toISOString() ?? new Date().toISOString(),
    transcoding_required: item.transcoding_required ?? false,
    transcoded: item.transcoded ?? false,
    transcoding_error: item.transcoding_error ?? false,
    thumbnail_url: item.thumbnail_url ?? null,
  }));

  const showAiGeneration = process.env.NEXT_SHOW_AI_CONTENT_CREATION === "true";

  return <ContentLibrary initialItems={items} showAiGeneration={showAiGeneration} />;
}
