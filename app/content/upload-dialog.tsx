"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, ImageIcon, Loader2, Upload, VideoIcon, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentItem {
  _id: string;
  name: string;
  url: string;
  mime_type: string;
  runtime: number;
  created_at: string;
}

interface UploadDialogProps {
  onUploaded: (item: ContentItem) => void;
}

const RUNTIME_OPTIONS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
  { value: "20", label: "20 seconds" },
  { value: "30", label: "30 seconds" },
];

type UploadStatus = "idle" | "uploading" | "done" | "error";

interface FileEntry {
  id: string;
  file: File;
  name: string;
  runtime: string;
  aspectWarning: boolean;
  durationError: boolean;
  status: UploadStatus;
  errorMessage?: string;
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

function ImageThumb({ file }: { file: File }) {
  const url = React.useMemo(() => URL.createObjectURL(file), [file]);
  React.useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return <img src={url} alt="" className="size-full object-cover" />;
}

export function UploadDialog({ onUploaded }: UploadDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [entries, setEntries] = React.useState<FileEntry[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleOpenChange(next: boolean) {
    if (!isUploading) {
      setOpen(next);
      if (!next) setEntries([]);
    }
  }

  function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;

    const newEntries: FileEntry[] = Array.from(files).map((file) => ({
      id: makeId(),
      file,
      name: file.name.replace(/\.[^.]+$/, ""),
      runtime: "15",
      aspectWarning: false,
      durationError: false,
      status: "idle",
    }));

    setEntries((prev) => [...prev, ...newEntries]);

    newEntries.forEach((entry) => {
      const { file } = entry;

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          if (Math.abs(ratio - 16 / 9) > 0.02) {
            setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, aspectWarning: true } : e));
          }
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }

      if (file.type === "video/mp4") {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          const updates: Partial<FileEntry> = {};
          if (video.duration > 30) updates.durationError = true;
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const ratio = video.videoWidth / video.videoHeight;
            if (Math.abs(ratio - 16 / 9) > 0.02) updates.aspectWarning = true;
          }
          if (Object.keys(updates).length > 0) {
            setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, ...updates } : e));
          }
          URL.revokeObjectURL(url);
        };
        video.src = url;
      }
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function updateEntry(id: string, updates: Partial<FileEntry>) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, ...updates } : e));
  }

  async function uploadOne(entry: FileEntry): Promise<ContentItem> {
    const urlRes = await fetch("/api/content/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: entry.file.name, contentType: entry.file.type }),
    });
    if (!urlRes.ok) {
      const err = await urlRes.json().catch(() => ({}));
      throw new Error(err.error ?? "Failed to get upload URL");
    }
    const { uploadUrl, s3Url } = await urlRes.json();

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      body: entry.file,
      headers: { "Content-Type": entry.file.type },
    });
    if (!putRes.ok) throw new Error("Failed to upload to storage");

    const contentRes = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: entry.name.trim() || entry.file.name,
        url: s3Url,
        mimeType: entry.file.type,
        runtime: parseInt(entry.runtime, 10),
        is16_9: !entry.aspectWarning,
      }),
    });
    if (!contentRes.ok) {
      const err = await contentRes.json().catch(() => ({}));
      throw new Error(err.error ?? "Failed to save content");
    }
    return contentRes.json();
  }

  async function handleUploadAll() {
    const toUpload = entries.filter((e) => e.status === "idle" && !e.durationError);
    if (toUpload.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const entry of toUpload) {
      updateEntry(entry.id, { status: "uploading" });
      try {
        const newItem = await uploadOne(entry);
        updateEntry(entry.id, { status: "done" });
        onUploaded(newItem);
        successCount++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        updateEntry(entry.id, { status: "error", errorMessage: msg });
        errorCount++;
      }
    }

    setIsUploading(false);

    if (errorCount === 0) {
      toast.success(`${successCount} item${successCount !== 1 ? "s" : ""} uploaded`);
      handleOpenChange(false);
    } else if (successCount > 0) {
      toast.error(`${errorCount} item${errorCount !== 1 ? "s" : ""} failed — ${successCount} uploaded successfully`);
    } else {
      toast.error(`All ${errorCount} upload${errorCount !== 1 ? "s" : ""} failed`);
    }
  }

  const uploadableCount = entries.filter((e) => e.status === "idle" && !e.durationError).length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload Content
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Content</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.mp4"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
            disabled={isUploading}
          />

          {entries.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-colors py-12"
            >
              <Upload className="size-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to select files</span>
              <span className="text-xs text-muted-foreground/60">JPG, PNG or MP4</span>
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {entries.length} file{entries.length !== 1 ? "s" : ""} selected
              </span>
              {!isUploading && (
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Add more files
                </Button>
              )}
            </div>
          )}

          {entries.length > 0 && (
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
              {entries.map((entry) => {
                const isImage = entry.file.type.startsWith("image/");
                return (
                  <div key={entry.id} className="flex flex-col gap-1.5 rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                        {isImage ? (
                          <ImageThumb file={entry.file} />
                        ) : (
                          <VideoIcon className="size-5 text-muted-foreground" />
                        )}
                      </div>

                      <Input
                        value={entry.name}
                        onChange={(e) => updateEntry(entry.id, { name: e.target.value })}
                        placeholder="Name"
                        disabled={isUploading}
                        className="flex-1 h-8 text-sm"
                      />

                      {isImage && (
                        <Select
                          value={entry.runtime}
                          onValueChange={(v) => updateEntry(entry.id, { runtime: v })}
                          disabled={isUploading}
                        >
                          <SelectTrigger className="w-32 h-8 text-sm shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {RUNTIME_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      <div className="shrink-0 flex items-center gap-1">
                        {entry.status === "uploading" && (
                          <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        )}
                        {entry.status === "done" && (
                          <CheckCircle2 className="size-4 text-green-500" />
                        )}
                        {entry.status === "error" && (
                          <span className="text-xs text-destructive">Failed</span>
                        )}
                        {(entry.status === "idle" || entry.status === "error") && !isUploading && (
                          <button
                            type="button"
                            onClick={() => removeEntry(entry.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="size-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {entry.durationError && (
                      <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs text-red-800">
                        <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                        <span>Exceeds the 30-second maximum. Remove this file or replace it with a shorter clip.</span>
                      </div>
                    )}
                    {entry.aspectWarning && (
                      <div className="flex gap-2 rounded-md border border-yellow-200 bg-yellow-50 px-2.5 py-2 text-xs text-yellow-800">
                        <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                        <span>Not 16:9 — may appear cropped or letterboxed on screen. You can still upload it.</span>
                      </div>
                    )}
                    {entry.status === "error" && entry.errorMessage && (
                      <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs text-red-800">
                        <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                        <span>{entry.errorMessage}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUploadAll} disabled={isUploading || uploadableCount === 0}>
            {isUploading
              ? "Uploading..."
              : uploadableCount > 0
              ? `Upload ${uploadableCount} file${uploadableCount !== 1 ? "s" : ""}`
              : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
