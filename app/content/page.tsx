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
    .find({ account_id: account._id, status: "active" })
    .sort({ created_at: -1 })
    .toArray();

  const items: ContentItem[] = rawItems.map((item) => ({
    _id: item._id.toString(),
    name: item.name,
    url: item.url,
    mime_type: item.mime_type,
    runtime: item.runtime,
    created_at: item.created_at?.toISOString() ?? new Date().toISOString(),
  }));

  return <ContentLibrary initialItems={items} />;
}
