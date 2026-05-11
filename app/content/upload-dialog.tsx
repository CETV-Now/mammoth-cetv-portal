"use client";

import * as React from "react";
import { AlertTriangle, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function UploadDialog({ onUploaded }: UploadDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [runtime, setRuntime] = React.useState("15");
  const [isUploading, setIsUploading] = React.useState(false);
  const [aspectWarning, setAspectWarning] = React.useState(false);
  const [durationError, setDurationError] = React.useState(false);

  const isImage = file?.type.startsWith("image/") ?? false;

  function handleOpenChange(next: boolean) {
    if (!isUploading) {
      setOpen(next);
      if (!next) {
        setName("");
        setFile(null);
        setRuntime("15");
        setAspectWarning(false);
        setDurationError(false);
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setAspectWarning(false);
    setDurationError(false);

    if (!selected) return;

    if (!name) {
      const baseName = selected.name.replace(/\.[^.]+$/, "");
      setName(baseName);
    }

    if (selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected);
      const img = new Image();
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (Math.abs(ratio - 16 / 9) > 0.02) setAspectWarning(true);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      // Step 1: get presigned upload URL
      const urlRes = await fetch("/api/content/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!urlRes.ok) {
        const err = await urlRes.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to get upload URL");
      }

      const { uploadUrl, s3Url } = await urlRes.json();

      // Step 2: PUT file directly to S3
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!putRes.ok) {
        throw new Error("Failed to upload file to storage");
      }

      // Step 3: create content record
      const contentRes = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          url: s3Url,
          mimeType: file.type,
          runtime: parseInt(runtime, 10),
        }),
      });

      if (!contentRes.ok) {
        const err = await contentRes.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save content");
      }

      const newItem: ContentItem = await contentRes.json();

      toast.success("Content uploaded");
      onUploaded(newItem);
      handleOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload Content
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="content-file">File</Label>
            <Input
              id="content-file"
              type="file"
              accept=".jpg,.jpeg,.png,.mp4"
              required
              disabled={isUploading}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content-name">Name</Label>
            <Input
              id="content-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Promo"
              required
              disabled={isUploading}
            />
          </div>

          {durationError && (
            <div className="flex gap-3 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>This video exceeds the 30-second maximum. Please trim it or choose a different file.</span>
            </div>
          )}

          {aspectWarning && (
            <div className="flex gap-3 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2.5 text-sm text-yellow-800">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>This image is not 16:9 and may appear cropped or letterboxed on your display. You can still upload it or choose a different file.</span>
            </div>
          )}

          {isImage && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="content-runtime">Display Duration</Label>
              <Select value={runtime} onValueChange={setRuntime}>
                <SelectTrigger id="content-runtime" className="w-full">
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
            </div>
          )}

          <Button type="submit" disabled={isUploading || !file || !name || durationError}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
