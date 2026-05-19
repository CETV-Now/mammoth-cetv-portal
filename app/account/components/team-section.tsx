"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X } from "lucide-react";

interface Member {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface PendingInvite {
  _id: string;
  email: string;
  created_at: string;
}

interface TeamSectionProps {
  members: Member[];
  pendingInvites: PendingInvite[];
}

export function TeamSection({ members, pendingInvites: initialInvites }: TeamSectionProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [invites, setInvites] = useState(initialInvites);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send invite");
      toast.success(`Invite sent to ${email}`);
      setInvites((prev) => [
        { _id: data._id ?? crypto.randomUUID(), email, created_at: new Date().toISOString() },
        ...prev,
      ]);
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  async function handleRevoke(inviteId: string) {
    try {
      const res = await fetch(`/api/invites?id=${inviteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
      toast.success("Invite revoked");
    } catch {
      toast.error("Failed to revoke invite");
    }
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 space-y-6">
      <h2 className="text-base font-semibold">Team</h2>

      <div>
        <h3 className="text-sm font-medium mb-3">Members</h3>
        <ul className="space-y-2">
          {members.map((m) => (
            <li key={m._id} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{m.first_name} {m.last_name}</span>
                <span className="text-muted-foreground ml-2">{m.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {invites.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Pending Invites</h3>
          <ul className="space-y-2">
            {invites.map((invite) => (
              <li key={invite._id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{invite.email}</span>
                <button
                  onClick={() => handleRevoke(invite._id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Revoke invite"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleInvite} className="space-y-3">
        <h3 className="text-sm font-medium">Invite Someone</h3>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="colleague@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
}
