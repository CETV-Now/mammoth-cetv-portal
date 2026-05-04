"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type AdServingMode = "ad-supported" | "ad-free";

export function StepAdMode({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<AdServingMode>("ad-supported");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(mode: AdServingMode) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/ad-mode", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adServingMode: mode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save ad mode");
      }

      onComplete();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Select Ad Serving Mode</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose how your screen will display content.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          className={cn(
            "cursor-pointer transition-all",
            selected === "ad-supported" ? "ring-2 ring-primary" : "hover:border-primary/50"
          )}
          onClick={() => setSelected("ad-supported")}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">Ad Supported</h3>
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">Recommended</span>
            </div>
            <p className="text-sm text-muted-foreground">Free. Ads play between your content. Access to licensed content channels.</p>
            <p className="text-lg font-bold mt-3">Free</p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            selected === "ad-free" ? "ring-2 ring-primary" : "hover:border-primary/50"
          )}
          onClick={() => setSelected("ad-free")}
        >
          <CardContent className="p-5">
            <h3 className="font-semibold mb-2">Ad Free</h3>
            <p className="text-sm text-muted-foreground">No ads. Licensed content not available. Subscription billed when device is installed.</p>
            <p className="text-lg font-bold mt-3">$5<span className="text-sm font-normal text-muted-foreground">/month per screen</span></p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
          onClick={() => handleSubmit("ad-supported")}
        >
          Skip (Ad Supported)
        </Button>
        <Button
          className="flex-1"
          disabled={isSubmitting}
          onClick={() => handleSubmit(selected)}
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
