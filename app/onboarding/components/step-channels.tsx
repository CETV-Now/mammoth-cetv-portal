"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CHANNELS = [
  { id: "sports", label: "Sports" },
  { id: "news", label: "News" },
  { id: "fail-reels", label: "Fail Reels" },
];

export function StepChannels({ screenId, onComplete }: { screenId: string | null; onComplete: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleChannel(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleSubmit(channels: string[]) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/channels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channels, screenId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save channels");
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
        <h2 className="text-lg font-semibold">Select Licensed Content Channels</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose the channels you'd like to include in your content mix.</p>
      </div>

      <div className="space-y-3">
        {CHANNELS.map((channel) => (
          <div key={channel.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer" onClick={() => toggleChannel(channel.id)}>
            <Checkbox
              id={channel.id}
              checked={selected.includes(channel.id)}
              onCheckedChange={() => toggleChannel(channel.id)}
            />
            <Label htmlFor={channel.id} className="cursor-pointer text-sm font-medium">
              {channel.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
          onClick={() => handleSubmit([])}
        >
          Skip
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
