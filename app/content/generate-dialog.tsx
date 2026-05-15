"use client";

import * as React from "react";
import { Loader2, Sparkles, WandSparkles } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ContentItem } from "./content-library";

const RUNTIME_OPTIONS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
  { value: "20", label: "20 seconds" },
  { value: "30", label: "30 seconds" },
];

type Step = "idle" | "generating" | "preview" | "saving";

interface GenerateDialogProps {
  onGenerated: (item: ContentItem) => void;
}

export function GenerateDialog({ onGenerated }: GenerateDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>("idle");
  const [prompt, setPrompt] = React.useState("");
  const [name, setName] = React.useState("");
  const [runtime, setRuntime] = React.useState("15");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const isGenerating = step === "generating";
  const isPreview = step === "preview";
  const isSaving = step === "saving";
  const isPromptStep = step === "idle" || step === "generating";
  const isReviewStep = step === "preview" || step === "saving";

  function handleOpenChange(next: boolean) {
    if (isGenerating || isSaving) return;
    setOpen(next);
    if (!next) reset();
  }

  function reset() {
    setStep("idle");
    setPrompt("");
    setName("");
    setRuntime("15");
    setPreviewUrl(null);
  }

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setStep("generating");
    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Generation failed");
      }
      const { imageUrl } = await res.json();
      setPreviewUrl(imageUrl);
      if (!name) setName(prompt.slice(0, 48).trim());
      setStep("preview");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
      setStep("idle");
    }
  }

  async function handleApprove() {
    if (!previewUrl) return;
    setStep("saving");
    try {
      const res = await fetch("/api/content/generate/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: previewUrl,
          name: name.trim() || prompt.slice(0, 48),
          runtime: parseInt(runtime, 10),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save");
      }
      const item: ContentItem = await res.json();
      onGenerated(item);
      toast.success("Image added to your content library");
      handleOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save image");
      setStep("preview");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="size-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className={isReviewStep ? "max-w-3xl" : "max-w-lg"}>
        <DialogHeader>
          <DialogTitle>
            {isReviewStep ? "Review Generated Image" : "Generate Content with AI"}
          </DialogTitle>
        </DialogHeader>

        {isPromptStep && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gen-prompt">Describe your content</Label>
              <Textarea
                id="gen-prompt"
                placeholder='e.g. "Create a promotion for $1 Nigiri on Tuesday nights. Use an image of Tuna nigiri and a modern feel."'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <Label htmlFor="gen-name">Name</Label>
                <Input
                  id="gen-name"
                  placeholder="Auto-filled from prompt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Duration</Label>
                <Select value={runtime} onValueChange={setRuntime} disabled={isGenerating}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RUNTIME_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {isReviewStep && previewUrl && (
          <div className="flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden bg-muted aspect-video">
              <img
                src={previewUrl}
                alt="Generated content preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <Label htmlFor="gen-name-review">Name</Label>
                <Input
                  id="gen-name-review"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Duration</Label>
                <Select value={runtime} onValueChange={setRuntime} disabled={isSaving}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RUNTIME_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {isPromptStep && (
            <>
              <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isGenerating}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <WandSparkles className="size-4" />
                    Generate
                  </>
                )}
              </Button>
            </>
          )}
          {isReviewStep && (
            <>
              <Button
                variant="outline"
                onClick={() => { setPreviewUrl(null); setStep("idle"); }}
                disabled={isSaving}
              >
                Make Changes
              </Button>
              <Button onClick={handleApprove} disabled={isSaving || !name.trim()}>
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
