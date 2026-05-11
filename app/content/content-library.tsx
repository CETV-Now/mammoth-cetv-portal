"use client";

import * as React from "react";
import { Archive, Clock, ImageIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDialog } from "./upload-dialog";

export interface ContentItem {
  _id: string;
  name: string;
  url: string;
  mime_type: string;
  runtime: number;
  created_at: string;
}

interface ContentLibraryProps {
  initialItems: ContentItem[];
}

export function ContentLibrary({ initialItems }: ContentLibraryProps) {
  const [items, setItems] = React.useState<ContentItem[]>(initialItems);

  function handleUploaded(newItem: ContentItem) {
    setItems((prev) => [newItem, ...prev]);
  }

  async function handleArchive(id: string) {
    try {
      const res = await fetch(`/api/content/${id}`, { method: "PATCH" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to archive");
      }
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Content archived");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Archive failed");
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
        <p className="text-muted-foreground text-sm">You haven&apos;t uploaded anything yet.</p>
        <UploadDialog onUploaded={handleUploaded} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Content Library</h1>
        <UploadDialog onUploaded={handleUploaded} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ContentCard key={item._id} item={item} onArchive={handleArchive} />
        ))}
      </div>
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
  onArchive: (id: string) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ContentCard({ item, onArchive }: ContentCardProps) {
  const isImage = item.mime_type.startsWith("image/");
  const isVideo = item.mime_type.startsWith("video/");
  const [previewOpen, setPreviewOpen] = React.useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <button
          type="button"
          className="aspect-video relative bg-muted w-full block group cursor-pointer"
          onClick={() => setPreviewOpen(true)}
        >
          {isImage && (
            <img
              src={item.url}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover group-hover:opacity-80 transition-opacity"
            />
          )}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoIcon className="size-8 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          )}
          {!isImage && !isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="size-8 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          )}
        </button>
        <CardContent className="p-3 flex flex-col gap-2">
          <p className="text-sm font-medium leading-tight truncate" title={item.name}>
            {item.name}
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="text-xs gap-1.5">
                {isVideo ? (
                  <>
                    <VideoIcon className="size-3" />
                    Video
                  </>
                ) : (
                  <>
                    <ImageIcon className="size-3" />
                    Image
                  </>
                )}
              </Badge>
              {item.runtime > 0 && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Clock className="size-3" />
                  {formatDuration(item.runtime)}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-muted-foreground hover:text-destructive"
              onClick={() => onArchive(item._id)}
            >
              <Archive className="size-3.5" />
              <span className="sr-only">Archive</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className={isVideo ? "max-w-4xl" : "max-w-fit max-w-[90vw]"}>
          <DialogHeader>
            <DialogTitle className="truncate">{item.name}</DialogTitle>
          </DialogHeader>
          {isVideo && (
            <video
              src={item.url}
              controls
              autoPlay
              className="w-full rounded-md max-h-[75vh]"
            />
          )}
          {isImage && (
            <img
              src={item.url}
              alt={item.name}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-md mx-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
