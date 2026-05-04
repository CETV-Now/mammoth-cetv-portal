"use client";

import * as React from "react";
import { CheckIcon, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContentItem } from "./playlist-form";

interface ContentPickerProps {
  content: ContentItem[];
  alreadySelected: string[];
  onAdd: (ids: string[]) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContentPicker({
  content,
  alreadySelected,
  onAdd,
  open,
  onOpenChange,
}: ContentPickerProps) {
  const [pendingIds, setPendingIds] = React.useState<string[]>([]);

  // Reset selection when dialog opens
  React.useEffect(() => {
    if (open) setPendingIds([]);
  }, [open]);

  function toggleItem(id: string) {
    if (alreadySelected.includes(id)) return;
    setPendingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleAdd() {
    onAdd(pendingIds);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>

        {content.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No content available. Upload content in the Content Library first.
          </p>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-1">
            <div className="grid grid-cols-3 gap-3">
              {content.map((item) => {
                const isAlready = alreadySelected.includes(item._id);
                const isPending = pendingIds.includes(item._id);
                const isImage = item.mime_type.startsWith("image/");
                const isVideo = item.mime_type.startsWith("video/");

                return (
                  <button
                    key={item._id}
                    type="button"
                    disabled={isAlready}
                    onClick={() => toggleItem(item._id)}
                    className={[
                      "group relative rounded-md overflow-hidden border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isAlready
                        ? "cursor-default opacity-60 border-border"
                        : isPending
                        ? "border-primary"
                        : "border-transparent hover:border-border",
                    ].join(" ")}
                  >
                    <div className="aspect-video relative bg-muted">
                      {isImage && (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      {isVideo && (
                        <video
                          src={item.url}
                          className="absolute inset-0 h-full w-full object-cover"
                          controls={false}
                          autoPlay={false}
                          preload="metadata"
                          muted
                        />
                      )}
                      {!isImage && !isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="size-6 text-muted-foreground" />
                        </div>
                      )}

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
                    <p className="px-2 py-1.5 text-xs font-medium truncate">{item.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={pendingIds.length === 0}>
            Add to Playlist{pendingIds.length > 0 ? ` (${pendingIds.length})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
