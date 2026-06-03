"use client";

import * as React from "react";
import { CheckIcon, Tv } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MAX_CHANNELS = 3;

export interface ExternalChannel {
  _id: string;
  name: string;
  thumbnail: string | null;
  content_count: number;
}

interface ChannelPickerProps {
  channels: ExternalChannel[];
  alreadySelected: string[];
  onAdd: (channels: { id: string; name: string }[]) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChannelPicker({
  channels,
  alreadySelected,
  onAdd,
  open,
  onOpenChange,
}: ChannelPickerProps) {
  const [pendingNames, setPendingNames] = React.useState<string[]>([]);

  // Reset selection when dialog opens
  React.useEffect(() => {
    if (open) setPendingNames([]);
  }, [open]);

  function toggleChannel(name: string) {
    if (alreadySelected.includes(name)) return;
    setPendingNames((prev) => {
      if (prev.includes(name)) return prev.filter((x) => x !== name);
      if (alreadySelected.length + prev.length >= MAX_CHANNELS) return prev;
      return [...prev, name];
    });
  }

  function handleAdd() {
    const selected = pendingNames
      .map((name) => {
        const ch = channels.find((c) => c.name === name)!;
        return { id: ch._id, name: ch.name };
      });
    onAdd(selected);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Channel</DialogTitle>
          <p className="text-xs text-muted-foreground pt-1">
            You can select up to {MAX_CHANNELS} channels. Channel content is only played when an accompanying ad is available.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {channels.map((channel) => {
            const isAlready = alreadySelected.includes(channel.name);
            const isPending = pendingNames.includes(channel.name);

            return (
              <button
                key={channel._id}
                type="button"
                disabled={isAlready}
                onClick={() => toggleChannel(channel.name)}
                className={[
                  "flex items-center gap-3 rounded-md border-2 p-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isAlready
                    ? "cursor-default opacity-60 border-border"
                    : isPending
                    ? "border-primary"
                    : "border-transparent hover:border-border hover:bg-muted/50",
                ].join(" ")}
              >
                <div className="relative size-10 shrink-0 rounded overflow-hidden bg-muted flex items-center justify-center">
                  {channel.thumbnail ? (
                    <img src={channel.thumbnail} alt={channel.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Tv className="size-4 text-muted-foreground" />
                  )}
                </div>
                <span className="flex-1 text-sm font-medium">
                  {channel.name}{" "}
                  <span className="text-muted-foreground font-normal">({channel.content_count})</span>
                </span>
                {(isAlready || isPending) && (
                  <div className={`rounded-full p-0.5 shrink-0 ${isAlready ? "bg-muted-foreground" : "bg-primary"}`}>
                    <CheckIcon className="size-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={pendingNames.length === 0}>
            Add to Playlist{pendingNames.length > 0 ? ` (${pendingNames.length})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
