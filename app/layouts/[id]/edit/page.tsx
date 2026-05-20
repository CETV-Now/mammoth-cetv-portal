import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { EditLayoutPage } from "./edit-layout-page";

export default async function EditLayoutPageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  let layoutId: ObjectId;
  try {
    layoutId = new ObjectId(id);
  } catch {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const [layout, assignedScreenCount] = await Promise.all([
    db.collection("screen_layouts").findOne({ _id: layoutId, account_id: user.account_id }),
    db.collection("screens").countDocuments({ layout_id: layoutId, account_id: user.account_id, status: { $ne: "deleted" } }),
  ]);

  if (!layout) notFound();

  const templateNormalize: Record<string, string> = {
    two_zone_v: "two-zone-vertical",
    two_zone_h: "two-zone-horizontal",
    five_zone: "five-zone",
  };
  const template = layout.template as string;

  return (
    <EditLayoutPage
      layoutId={id}
      name={layout.name as string}
      description={(layout.description ?? "") as string}
      template={templateNormalize[template] ?? template}
      zoneData={layout.zone_data as object[]}
      clockWeatherScheme={(layout.clock_weather_scheme as string) ?? "blue"}
      hasAssignedScreens={assignedScreenCount > 0}
    />
  );
}
