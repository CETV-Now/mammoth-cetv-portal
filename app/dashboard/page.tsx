import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tv } from "lucide-react";
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

  return (
    <div className="flex flex-1 items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-[2]" />
          <div className="relative flex items-center justify-center size-28 rounded-3xl bg-primary/10 ring-1 ring-primary/20">
            <Tv className="size-14 text-primary" strokeWidth={1.25} />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Welcome to CETV Now!</h1>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          While you wait for your device to arrive, you can start adding images and
          videos to your library and creating playlists.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          You can also preview the licensed content that is available to play in your location.
        </p>
      </div>
    </div>
  );
}
