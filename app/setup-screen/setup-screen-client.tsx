"use client";

import * as React from "react";
import { ActivateScreenModal } from "@/components/activate-screen-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface UnactivatedScreen {
  _id: string;
  screen_name: string;
  location_name: string;
}

export function ActivateScreenList({ screens }: { screens: UnactivatedScreen[] }) {
  const [activatingId, setActivatingId] = React.useState<string | null>(null);

  if (screens.length === 0) {
    return (
      <p className="mt-3 text-sm text-muted-foreground">No screens pending activation.</p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-3">
        {screens.map((screen) => (
          <div key={screen._id} className="flex items-center justify-between rounded-md border px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{screen.screen_name}</span>
              <span className="text-xs text-muted-foreground">{screen.location_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Pending</Badge>
              <Button size="sm" onClick={() => setActivatingId(screen._id)}>
                Activate
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ActivateScreenModal
        open={activatingId !== null}
        onOpenChange={(open) => { if (!open) setActivatingId(null); }}
        screenId={activatingId ?? ""}
      />
    </>
  );
}
