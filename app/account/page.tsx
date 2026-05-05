import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ProfileForm } from "./components/profile-form";
import { ClerkProfile } from "./components/clerk-profile";

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  const account = user
    ? await db.collection("accounts").findOne({ _id: user.account_id })
    : null;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">My Account</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and account settings.
        </p>
      </div>

      <ProfileForm
        firstName={clerkUser.firstName ?? ""}
        lastName={clerkUser.lastName ?? ""}
        companyName={account?.companyName ?? ""}
        phone={account?.phone ?? ""}
        website={account?.website ?? ""}
        industry={account?.industry ?? ""}
      />

      <ClerkProfile />
    </div>
  );
}
