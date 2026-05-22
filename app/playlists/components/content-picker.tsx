"use client";

import * as React from "react";
import { AlertTriangle, CheckIcon, ImageIcon, Upload, VideoIcon, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import type { ContentItem } from "./playlist-form";

const RUNTIME_OPTIONS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
  { value: "20", label: "20 seconds" },
  { value: "30", label: "30 seconds" },
];

interface ContentPickerProps {
  content: ContentItem[];
  alreadySelected: string[];
  onAdd: (items: ContentItem[]) => void;
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
  const [localContent, setLocalContent] = React.useState<ContentItem[]>(content);
  const [pendingIds, setPendingIds] = React.useState<string[]>([]);
  const [uploadOpen, setUploadOpen] = React.useState(false);

  // Upload state
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [runtime, setRuntime] = React.useState("15");
  const [isUploading, setIsUploading] = React.useState(false);
  const [aspectWarning, setAspectWarning] = React.useState(false);
  const [durationError, setDurationError] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const isImage = file?.type.startsWith("image/") ?? false;

  React.useEffect(() => {
    if (open) {
      setPendingIds([]);
      setLocalContent(content);
      closeUploadZone();
    }
  }, [open]);

  function closeUploadZone() {
    setUploadOpen(false);
    setName("");
    setFile(null);
    setRuntime("15");
    setAspectWarning(false);
    setDurationError(false);
    setIsDragging(false);
  }

  function toggleItem(id: string) {
    if (alreadySelected.includes(id)) return;
    setPendingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleAdd() {
    const selectedItems = pendingIds
      .map((id) => localContent.find((c) => c._id === id))
      .filter((c): c is ContentItem => c !== undefined);
    onAdd(selectedItems);
    onOpenChange(false);
  }

  function applyFile(selected: File) {
    setFile(selected);
    setAspectWarning(false);
    setDurationError(false);

    if (!name) setName(selected.name.replace(/\.[^.]+$/, ""));

    if (selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected);
      const img = new Image();
      img.onload = () => {
        if (Math.abs(img.naturalWidth / img.naturalHeight - 16 / 9) > 0.02) {
          setAspectWarning(true);
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }

    if (selected.type === "video/mp4") {
      const url = URL.createObjectURL(selected);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (video.duration > 30) setDurationError(true);
        URL.revokeObjectURL(url);
      };
      video.src = url;
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) applyFile(selected);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) applyFile(dropped);
  }

  async function handleUpload() {
    if (!file || !name.trim() || durationError) return;

    setIsUploading(true);
    try {
      const urlRes = await fetch("/api/content/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      if (!urlRes.ok) throw new Error((await urlRes.json().catch(() => ({}))).error ?? "Failed to get upload URL");
      const { uploadUrl, s3Url } = await urlRes.json();

      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!putRes.ok) throw new Error("Failed to upload file to storage");

      const contentRes = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), url: s3Url, mimeType: file.type, runtime: parseInt(runtime, 10) }),
      });
      if (!contentRes.ok) throw new Error((await contentRes.json().catch(() => ({}))).error ?? "Failed to save content");

      const newItem: ContentItem = await contentRes.json();

      setLocalContent((prev) => [newItem, ...prev]);
      setPendingIds((prev) => [newItem._id, ...prev]);

      toast.success("Content uploaded and added to selection");
      closeUploadZone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>

        {/* Inline upload zone */}
        {uploadOpen && (
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Upload new content</p>
              <button
                type="button"
                onClick={closeUploadZone}
                disabled={isUploading}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
                <span className="sr-only">Close upload</span>
              </button>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/60"
              }`}
            >
              <Upload className="size-5 text-muted-foreground" />
              {file ? (
                <p className="text-sm font-medium text-foreground">{file.name}</p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Drop a file here or click to browse</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG or MP4 · Max 30s for video</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.mp4"
                className="sr-only"
                onChange={handleFileInput}
                disabled={isUploading}
              />
            </div>

            {/* Warnings */}
            {durationError && (
              <div className="flex gap-2.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <span>This video exceeds the 30-second maximum. Please trim it or choose a different file.</span>
              </div>
            )}
            {aspectWarning && (
              <div className="flex gap-2.5 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <span>This image is not 16:9 and may appear cropped on your display.</span>
              </div>
            )}

            {/* Name + duration (shown after file selected) */}
            {file && (
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <Label htmlFor="upload-name" className="text-xs">Name</Label>
                  <Input
                    id="upload-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Summer Promo"
                    disabled={isUploading}
                    className="text-sm"
                  />
                </div>
                {isImage && (
                  <div className="flex flex-col gap-1.5 w-36">
                    <Label htmlFor="upload-runtime" className="text-xs">Display duration</Label>
                    <Select value={runtime} onValueChange={setRuntime} disabled={isUploading}>
                      <SelectTrigger id="upload-runtime" className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RUNTIME_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <Button
              type="button"
              onClick={handleUpload}
              disabled={!file || !name.trim() || durationError || isUploading}
              className="self-end"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        )}

        {/* Content grid */}
        {localContent.length === 0 && !uploadOpen ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No content available. Upload a file above or visit the Content Library.
          </p>
        ) : localContent.length > 0 ? (
          <div className="max-h-[360px] overflow-y-auto pr-1">
            <div className="grid grid-cols-3 gap-3">
              {localContent.map((item) => {
                const isAlready = alreadySelected.includes(item._id);
                const isPending = pendingIds.includes(item._id);
                const isImg = item.mime_type.startsWith("image/");
                const isVid = item.mime_type.startsWith("video/");

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
                      {isImg && (
                        <img src={item.url} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                      )}
                      {isVid && item.thumbnail_url && (
                        <img src={item.thumbnail_url} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                      )}
                      {isVid && !item.thumbnail_url && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <VideoIcon className="size-6 text-muted-foreground" />
                        </div>
                      )}
                      {!isImg && !isVid && (
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
        ) : null}

        <DialogFooter className="sm:justify-between">
          {!uploadOpen && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUploadOpen(true)}
              className="gap-1.5"
            >
              <Upload className="size-3.5" />
              Upload
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={pendingIds.length === 0}>
              Add to Playlist{pendingIds.length > 0 ? ` (${pendingIds.length})` : ""}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
