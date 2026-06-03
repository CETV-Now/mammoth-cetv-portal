"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Play, Tv, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ContentItem {
  title: string;
  url: string;
  thumbnail_url: string | null;
  published_date: string | null;
}

interface ChannelDetailPageProps {
  channelId: string;
  channelName: string;
  thumbnail: string | null;
  items: ContentItem[];
}

const PLACEHOLDER_COLORS: Record<string, string> = {
  sports:       "#1e40af",
  news:         "#dc2626",
  "fail reels": "#7c3aed",
  instagram:    "#db2777",
  tiktok:       "#0d9488",
  gopro:        "#d97706",
};

function placeholderColor(name: string): string {
  const key = name.toLowerCase();
  if (PLACEHOLDER_COLORS[key]) return PLACEHOLDER_COLORS[key];
  const palette = ["#1e40af","#dc2626","#7c3aed","#db2777","#0d9488","#d97706","#059669","#b45309"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  return palette[Math.abs(hash) % palette.length];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function ContentCard({ item, channelName, onPlay }: { item: ContentItem; channelName: string; onPlay: () => void }) {
  const color = placeholderColor(channelName);

  return (
    <button
      type="button"
      onClick={onPlay}
      className="flex flex-col rounded-lg border overflow-hidden text-left hover:shadow-md transition-shadow group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="w-full aspect-video flex items-center justify-center relative"
        style={{ backgroundColor: item.thumbnail_url ? undefined : color + "22" }}
      >
        {item.thumbnail_url ? (
          <>
            <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-3 bg-black/50">
                <Play className="size-6 text-white fill-white" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="rounded-full p-3" style={{ backgroundColor: color + "33" }}>
              <Play className="size-6" style={{ color }} />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-3 py-3">
        <p className="text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
        {item.published_date && (
          <p className="text-xs text-muted-foreground">{formatDate(item.published_date)}</p>
        )}
      </div>
    </button>
  );
}

export function ChannelDetailPage({ channelName, thumbnail, items }: ChannelDetailPageProps) {
  const color = placeholderColor(channelName);
  const [playing, setPlaying] = React.useState<ContentItem | null>(null);

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/channels">
            <ArrowLeft className="size-4 mr-1" />
            Channels
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="size-14 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: color }}
        >
          {thumbnail ? (
            <img src={thumbnail} alt={channelName} className="size-14 rounded-lg object-cover" />
          ) : (
            <Tv className="size-7 text-white/70" />
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold">{channelName}</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">No content available for this channel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <ContentCard
              key={item.url || i}
              item={item}
              channelName={channelName}
              onPlay={() => setPlaying(item)}
            />
          ))}
        </div>
      )}

      <Dialog open={!!playing} onOpenChange={(open) => { if (!open) setPlaying(null); }}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-none">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-black">
              <p className="text-sm text-white/80 font-medium truncate pr-4">{playing?.title}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 shrink-0"
                onClick={() => setPlaying(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
            {playing?.url && (
              <video
                key={playing.url}
                src={playing.url}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
