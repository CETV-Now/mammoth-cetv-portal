import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { AcceptInviteButton } from "./accept-invite-button";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function AcceptInvitePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return <InviteError message="This invite link is invalid." />;
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const invite = await db.collection("invites").findOne({ token });

  if (!invite) {
    return <InviteError message="This invite link is invalid or has already been used." />;
  }

  if (invite.status === "accepted") {
    return <InviteError message="This invite has already been accepted." />;
  }

  if (new Date() > invite.expires_at) {
    return <InviteError message="This invite has expired. Ask the account owner to send a new one." />;
  }

  const account = await db.collection("accounts").findOne({ _id: invite.account_id });
  const companyName = account?.companyName ?? account?.name ?? "CETV Now";

  const { userId } = await auth();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://portal.cetvnow.com";
  const returnUrl = `${appUrl}/invite/accept?token=${token}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-xl border shadow p-8 text-center flex flex-col items-center gap-4">
        <img src="/cetv_logo.png" alt="CETV Now" className="h-12 w-auto" />
        <div>
          <h1 className="text-xl font-semibold">You've been invited</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Join <strong>{companyName}</strong> on CETV Now
          </p>
        </div>
        {userId ? (
          <AcceptInviteButton token={token} />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <a
              href={`/sign-up?redirect_url=${encodeURIComponent(returnUrl)}`}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
            >
              Create account &amp; accept
            </a>
            <a
              href={`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`}
              className="w-full inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Sign in to accept
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function InviteError({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-xl border shadow p-8 text-center flex flex-col items-center gap-4">
        <img src="/cetv_logo.png" alt="CETV Now" className="h-12 w-auto" />
        <p className="text-muted-foreground text-sm">{message}</p>
        <a href="/dashboard" className="text-sm underline underline-offset-4">
          Go to dashboard
        </a>
      </div>
    </div>
  );
}
