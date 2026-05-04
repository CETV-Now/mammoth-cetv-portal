"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Play, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const PLACEHOLDER_ITEMS: ContentItem[] = [
  { title: "Highlight Reel — Week 12", url: "", thumbnail_url: null, published_date: "2025-03-15" },
  { title: "Top Moments Compilation", url: "", thumbnail_url: null, published_date: "2025-02-28" },
  { title: "Best of the Season", url: "", thumbnail_url: null, published_date: "2025-01-20" },
];

function ContentCard({ item, channelName }: { item: ContentItem; channelName: string }) {
  const color = placeholderColor(channelName);
  const isPlaceholder = !item.url;

  return (
    <button
      type="button"
      disabled={isPlaceholder}
      className="flex flex-col rounded-lg border overflow-hidden text-left hover:shadow-md transition-shadow disabled:cursor-default group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="w-full aspect-video flex items-center justify-center relative"
        style={{ backgroundColor: item.thumbnail_url ? undefined : color + "33" }}
      >
        {item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full" style={{ backgroundColor: color + "22" }}>
            <div
              className="rounded-full p-3"
              style={{ backgroundColor: color + "33" }}
            >
              <Play className="size-6" style={{ color }} />
            </div>
          </div>
        )}
        {isPlaceholder && (
          <div className="absolute inset-0 flex items-end px-2 pb-1.5">
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/40 text-white/70">
              Preview
            </span>
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
  const displayItems = items.length > 0 ? items : PLACEHOLDER_ITEMS;
  const isShowingPlaceholders = items.length === 0;

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
            {isShowingPlaceholders ? "32 items" : `${items.length} item${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {isShowingPlaceholders && (
        <p className="text-xs text-muted-foreground -mt-2">
          Content for this channel is coming soon. Below is a preview of what items will look like.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayItems.map((item, i) => (
          <ContentCard key={item.url || i} item={item} channelName={channelName} />
        ))}
      </div>
    </div>
  );
}
