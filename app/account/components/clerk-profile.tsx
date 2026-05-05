"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function ClerkProfile() {
  const { openUserProfile } = useClerk();

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6 mt-12">
      <h2 className="text-base font-semibold">Account & Security</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-5">
        Update your avatar, password, connected accounts, and security settings.
      </p>
      <Button variant="outline" onClick={() => openUserProfile()}>
        <Shield className="size-4" />
        Manage Account
      </Button>
    </div>
  );
}
