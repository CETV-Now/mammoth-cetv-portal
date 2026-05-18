import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { LayoutsPage } from "./layouts-page";

export default async function LayoutsPageRoute() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const [rawLayouts, rawScreens, sampleImageDoc] = await Promise.all([
    db
      .collection("screen_layouts")
      .find({ account_id: user.account_id })
      .sort({ created_at: -1 })
      .toArray(),
    db
      .collection("screens")
      .find({ account_id: user.account_id, status: { $ne: "deleted" }, layout_id: { $exists: true, $ne: null } })
      .project({ layout_id: 1 })
      .toArray(),
    db
      .collection("content")
      .findOne(
        { account_id: account._id, status: "active", mime_type: { $regex: /^image\// } },
        { projection: { url: 1 }, sort: { created_at: -1 } }
      ),
  ]);

  const screenCountByLayout = new Map<string, number>();
  for (const screen of rawScreens) {
    const key = screen.layout_id.toString();
    screenCountByLayout.set(key, (screenCountByLayout.get(key) ?? 0) + 1);
  }

  const layouts = rawLayouts.map((l) => ({
    _id: l._id.toString(),
    name: l.name as string,
    description: (l.description ?? "") as string,
    template: l.template as string,
    screensAssigned: screenCountByLayout.get(l._id.toString()) ?? 0,
    hasZones: Array.isArray(l.zone_data) && l.zone_data.length > 0,
  }));

  const sampleImageUrl = (sampleImageDoc?.url as string) ?? null;

  return <LayoutsPage layouts={layouts} sampleImageUrl={sampleImageUrl} />;
}
