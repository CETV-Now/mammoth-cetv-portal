"use client";

import * as React from "react";
import { Archive, ArrowDown, ArrowUp, Clock, ImageIcon, Pencil, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type TypeFilter = "all" | "video" | "image";
type SortKey = "name_asc" | "name_desc" | "date_asc" | "date_desc";

export function ContentLibrary({ initialItems }: ContentLibraryProps) {
  const [items, setItems] = React.useState<ContentItem[]>(initialItems);
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>("all");
  const [sort, setSort] = React.useState<SortKey>("name_asc");

  function handleUploaded(newItem: ContentItem) {
    setItems((prev) => [newItem, ...prev]);
  }

  async function handleUpdate(id: string, updates: { name: string; runtime: number }) {
    try {
      const res = await fetch(`/api/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update");
      }
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...updates } : item))
      );
      toast.success("Content updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
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

  const visibleItems = React.useMemo(() => {
    let filtered = items;
    if (typeFilter === "video") filtered = items.filter((i) => i.mime_type.startsWith("video/"));
    else if (typeFilter === "image") filtered = items.filter((i) => i.mime_type.startsWith("image/"));

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "name_asc":  return a.name.localeCompare(b.name);
        case "name_desc": return b.name.localeCompare(a.name);
        case "date_asc":  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "date_desc": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [items, typeFilter, sort]);

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
        <p className="text-muted-foreground text-sm">You haven&apos;t uploaded anything yet.</p>
        <UploadDialog onUploaded={handleUploaded} />
      </div>
    );
  }

  const filterButtons: { value: TypeFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "video", label: "Videos" },
    { value: "image", label: "Images" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Content Library</h1>
        <UploadDialog onUploaded={handleUploaded} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {filterButtons.map(({ value, label }) => (
            <Button
              key={value}
              variant={typeFilter === value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTypeFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">
              <span className="flex items-center gap-1.5"><ArrowUp className="size-3.5" />Name</span>
            </SelectItem>
            <SelectItem value="name_desc">
              <span className="flex items-center gap-1.5"><ArrowDown className="size-3.5" />Name</span>
            </SelectItem>
            <SelectItem value="date_asc">
              <span className="flex items-center gap-1.5"><ArrowUp className="size-3.5" />Added Date</span>
            </SelectItem>
            <SelectItem value="date_desc">
              <span className="flex items-center gap-1.5"><ArrowDown className="size-3.5" />Added Date</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {visibleItems.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-12">No {typeFilter === "video" ? "videos" : "images"} found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map((item) => (
            <ContentCard key={item._id} item={item} onArchive={handleArchive} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
  onArchive: (id: string) => void;
  onUpdate: (id: string, updates: { name: string; runtime: number }) => Promise<void>;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ContentCard({ item, onArchive, onUpdate }: ContentCardProps) {
  const isImage = item.mime_type.startsWith("image/");
  const isVideo = item.mime_type.startsWith("video/");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editName, setEditName] = React.useState(item.name);
  const [editRuntime, setEditRuntime] = React.useState(String(item.runtime));
  const [saving, setSaving] = React.useState(false);

  function openEdit() {
    setEditName(item.name);
    setEditRuntime(String(item.runtime));
    setEditOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    await onUpdate(item._id, { name: editName.trim(), runtime: Number(editRuntime) || 0 });
    setSaving(false);
    setEditOpen(false);
  }

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
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-muted-foreground hover:text-foreground"
                onClick={openEdit}
              >
                <Pencil className="size-3.5" />
                <span className="sr-only">Edit</span>
              </Button>
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
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Display Duration</Label>
              <Select
                value={editRuntime}
                onValueChange={setEditRuntime}
                disabled={isVideo}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Seconds</SelectItem>
                  <SelectItem value="10">10 Seconds</SelectItem>
                  <SelectItem value="15">15 Seconds</SelectItem>
                  <SelectItem value="20">20 Seconds</SelectItem>
                  <SelectItem value="30">30 Seconds</SelectItem>
                </SelectContent>
              </Select>
              {isVideo && (
                <p className="text-xs text-muted-foreground">Duration is set by the video file and cannot be changed.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !editName.trim()}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
