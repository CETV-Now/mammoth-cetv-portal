import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { ActivateScreenList, type UnactivatedScreen } from "./setup-screen-client";

const staticSteps = [
  {
    title: "Unbox and power on",
    description:
      "Remove your device from the box and connect it to a power source. On first boot it might take a minute or two start up.",
  },
  {
    title: "Connect to the internet",
    description:
      "Follow the on-screen instructions to connect your device to your WiFi network or plug in an ethernet cable.",
  },
  {
    title: "Note the activation PIN",
    description:
      "Once the device boots up, an activation PIN will appear on screen. Keep it handy for the next step.",
  },
];

export default async function SetupScreenPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const user = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!user) redirect("/onboarding");

  const account = await db.collection("accounts").findOne({ _id: user.account_id });
  if (!account?.onboardingComplete) redirect("/onboarding");

  const rawScreens = await db
    .collection("screens")
    .find({ account_id: account._id, status: "new" })
    .sort({ created_at: 1 })
    .toArray();

  const unactivatedScreens: UnactivatedScreen[] = rawScreens.map((s) => ({
    _id: s._id.toString(),
    screen_name: s.screen_name as string,
    location_name: (s.location_name as string) ?? "Unknown Location",
  }));

  return (
    <div className="flex flex-1 flex-col py-12 px-6 max-w-2xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Received your first device?</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Follow the steps below to get your screen up and running.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {staticSteps.map((step, i) => (
          <div key={i} className="flex gap-4 p-5 rounded-xl border bg-card">
            <div className="flex-shrink-0 flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {i + 1}
            </div>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-4 p-5 rounded-xl border bg-card">
          <div className="flex-shrink-0 flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            4
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold">Activate your screen</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find the screen below and click the &apos;Activate&apos; button. Enter the activation PIN from
              your device to complete the setup.
            </p>
            <ActivateScreenList screens={unactivatedScreens} />
          </div>
        </div>

        <div className="flex gap-4 p-5 rounded-xl border bg-card">
          <div className="flex-shrink-0 flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            5
          </div>
          <div>
            <h2 className="font-semibold">Create Playlist</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you haven&apos;t already, upload content to the content library, then create a
              playlist. Once you&apos;ve created a playlist assign it to your new screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
