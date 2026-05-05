import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { OnboardingWizard } from "./components/onboarding-wizard";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Setting up your account...</p>
      </div>
    );
  }

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Setting up your account...</p>
      </div>
    );
  }

  if (account.onboardingComplete) {
    redirect("/dashboard");
  }

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  const step = account.onboardingStep ?? 1;
  const serializedAccount = {
    _id: account._id.toString(),
    name: account.name,
    onboardingStep: step,
    onboardingComplete: account.onboardingComplete ?? false,
  };

  return (
    <OnboardingWizard
      step={step}
      account={serializedAccount}
      firstName={clerkUser.firstName ?? ""}
      lastName={clerkUser.lastName ?? ""}
    />
  );
}
