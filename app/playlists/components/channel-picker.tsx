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

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
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
                  "group relative rounded-md overflow-hidden border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isAlready
                    ? "cursor-default opacity-60 border-border"
                    : isPending
                    ? "border-primary"
                    : "border-transparent hover:border-border",
                ].join(" ")}
              >
                <div className="aspect-video relative bg-muted rounded-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tv className="size-4 text-muted-foreground" />
                  </div>

                  {isAlready && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="rounded-full bg-primary p-1">
                        <CheckIcon className="size-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}

                  {isPending && !isAlready && (
                    <div className="absolute top-1.5 right-1.5">
                      <div className="rounded-full bg-primary p-0.5">
                        <CheckIcon className="size-3 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="px-1 py-1 text-xs font-medium truncate leading-tight">{channel.name}</p>
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
