"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ActivateScreenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenId: string;
}

export function ActivateScreenModal({ open, onOpenChange, screenId }: ActivateScreenModalProps) {
  const router = useRouter();
  const [installCode, setInstallCode] = React.useState<string | null>(null);
  const [installCodeLoading, setInstallCodeLoading] = React.useState(false);
  const [activating, setActivating] = React.useState(false);
  const [activated, setActivated] = React.useState(false);
  const pinRef = React.useRef<HTMLInputElement>(null);

  function handleOpenChange(open: boolean) {
    onOpenChange(open);
    if (!open) {
      if (pinRef.current) pinRef.current.value = "";
      setInstallCode(null);
      setActivated(false);
    }
  }

  React.useEffect(() => {
    if (!open) return;
    setInstallCodeLoading(true);
    fetch(`/api/screens/${screenId}`)
      .then((r) => r.json())
      .then((data) => setInstallCode(data.installCode ?? null))
      .catch(() => setInstallCode(null))
      .finally(() => setInstallCodeLoading(false));
  }, [open, screenId]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Activate Screen</DialogTitle>
        </DialogHeader>
        {activated ? (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              It may take a few minutes for your screen to activate. If it is not activated within 5
              minutes try entering the PIN again. Make sure to use the correct case for each letter
              that is displayed on the screen.
            </p>
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              OK
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="text-sm text-muted-foreground">There are two ways to activate your screen.</p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 text-sm">
                <p className="text-foreground">
                  Scan the QR code on your screen with your phone. When prompted, enter the code
                  below on your phone:
                </p>
                <p className="font-bold text-foreground text-2xl tracking-widest font-mono text-center">
                  {installCodeLoading ? "..." : (installCode ?? "—")}
                </p>
                <Button variant="outline" className="w-full" onClick={() => handleOpenChange(false)}>
                  Done
                </Button>
              </div>
              <div className="relative flex items-center">
                <div className="flex-1 h-px bg-border" />
                <span className="px-3 text-xs text-muted-foreground">or:</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <p className="text-foreground">
                  Enter the 4 character PIN displayed on the screen and click activate:
                </p>
                <input
                  ref={pinRef}
                  defaultValue=""
                  type="text"
                  maxLength={4}
                  placeholder="A1B2"
                  autoComplete="off"
                  autoCapitalize="none"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none text-center text-lg tracking-widest font-mono focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                <Button
                  className="w-full"
                  disabled={activating}
                  onClick={async () => {
                    const pin = (pinRef.current?.value ?? "").replace(/[^a-zA-Z0-9]/g, "");
                    if (pin.length !== 4) {
                      toast.error("Please enter the 4-character PIN");
                      return;
                    }
                    setActivating(true);
                    try {
                      const res = await fetch(`/api/screens/${screenId}/activate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ pin }),
                      });
                      if (!res.ok) {
                        const err = await res.json().catch(() => ({}));
                        throw new Error(err.error ?? "Activation failed");
                      }
                      setActivated(true);
                      router.refresh();
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : "Activation failed");
                    } finally {
                      setActivating(false);
                    }
                  }}
                >
                  {activating ? "Activating…" : "Activate"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
