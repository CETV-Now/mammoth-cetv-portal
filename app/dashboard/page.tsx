import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function DashboardPage() {
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

  const account = await db.collection("accounts").findOne({ _id: user!.account_id });
  if (!account?.onboardingComplete) {
    redirect("/onboarding");
  }

  return <div />;
}
