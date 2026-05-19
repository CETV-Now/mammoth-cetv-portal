import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const currentUser = await db.collection("users").findOne({ clerk_user_id: userId });
    if (!currentUser) {
      console.error("[invites] User not found for clerk_user_id:", userId);
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const account = await db.collection("accounts").findOne({ _id: currentUser.account_id });
    if (!account) {
      console.error("[invites] Account not found for account_id:", currentUser.account_id);
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    const existingMember = await db.collection("users").findOne({
      account_id: currentUser.account_id,
      email: normalizedEmail,
    });
    if (existingMember) {
      return Response.json({ error: "This person is already a member of your account" }, { status: 409 });
    }

    const existingInvite = await db.collection("invites").findOne({
      account_id: currentUser.account_id,
      email: normalizedEmail,
      status: "pending",
    });
    if (existingInvite) {
      return Response.json({ error: "An invite has already been sent to this email" }, { status: 409 });
    }

    const token = crypto.randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const { insertedId } = await db.collection("invites").insertOne({
      token,
      account_id: currentUser.account_id,
      email: normalizedEmail,
      invited_by_user_id: currentUser._id,
      status: "pending",
      expires_at: expiresAt,
      created_at: now,
      accepted_at: null,
    });

    console.log("[invites] Invite created:", insertedId.toString(), "for", normalizedEmail);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://portal.cetvnow.com";
    const inviteUrl = `${appUrl}/invite/accept?token=${token}`;
    const inviterName = `${currentUser.first_name} ${currentUser.last_name}`.trim();
    const companyName = account.companyName ?? account.name;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "CETV Now <hello@mail.cetvnow.network>",
      to: normalizedEmail,
      subject: `${inviterName} invited you to join ${companyName} on CETV Now`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
          <img src="${appUrl}/cetv_logo.png" alt="CETV Now" style="height: 48px; margin-bottom: 24px;" />
          <h2 style="margin: 0 0 8px;">You've been invited</h2>
          <p style="color: #555; margin: 0 0 24px;">
            ${inviterName} has invited you to join <strong>${companyName}</strong> on CETV Now.
          </p>
          <a href="${inviteUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">
            Accept Invitation
          </a>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">
            This invitation expires in 7 days. If you didn't expect this email, you can ignore it.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("[invites] Resend error:", emailError);
    } else {
      console.log("[invites] Email sent:", emailData?.id);
    }

    return Response.json({ success: true, _id: insertedId.toString() });
  } catch (err) {
    console.error("[invites] Unhandled error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const currentUser = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!currentUser) return Response.json({ error: "User not found" }, { status: 404 });

  const invites = await db
    .collection("invites")
    .find({ account_id: currentUser.account_id, status: "pending" })
    .sort({ created_at: -1 })
    .toArray();

  return Response.json(
    invites.map((i) => ({
      _id: i._id.toString(),
      email: i.email,
      created_at: i.created_at,
      expires_at: i.expires_at,
    }))
  );
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const inviteId = searchParams.get("id");
  if (!inviteId) return Response.json({ error: "id is required" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const currentUser = await db.collection("users").findOne({ clerk_user_id: userId });
  if (!currentUser) return Response.json({ error: "User not found" }, { status: 404 });

  await db.collection("invites").deleteOne({
    _id: new ObjectId(inviteId),
    account_id: currentUser.account_id,
    status: "pending",
  });

  return Response.json({ success: true });
}
