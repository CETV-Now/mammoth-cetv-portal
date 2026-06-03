"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Tv } from "lucide-react";

interface Channel {
  _id: string;
  name: string;
  thumbnail: string | null;
  content_count: number;
}

const PLACEHOLDER_COLORS: Record<string, string> = {
  sports:      "#1e40af",
  news:        "#dc2626",
  "fail reels":"#7c3aed",
  instagram:   "#db2777",
  tiktok:      "#0d9488",
  gopro:       "#d97706",
};

function placeholderColor(name: string): string {
  const key = name.toLowerCase();
  if (PLACEHOLDER_COLORS[key]) return PLACEHOLDER_COLORS[key];
  // simple hash fallback
  const palette = ["#1e40af","#dc2626","#7c3aed","#db2777","#0d9488","#d97706","#059669","#b45309"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  return palette[Math.abs(hash) % palette.length];
}

function ChannelCard({ channel, onClick }: { channel: Channel; onClick: () => void }) {
  const color = placeholderColor(channel.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col rounded-lg border overflow-hidden text-left hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="w-full aspect-video flex items-center justify-center" style={{ backgroundColor: color }}>
        {channel.thumbnail ? (
          <img
            src={channel.thumbnail}
            alt={channel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Tv className="size-10 text-white/70" />
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-3 py-3">
        <p className="text-sm font-semibold truncate">{channel.name}</p>
        <p className="text-xs text-muted-foreground">{channel.content_count} {channel.content_count === 1 ? "item" : "items"}</p>
      </div>
    </button>
  );
}

export function ChannelsPage({ channels }: { channels: Channel[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Channels</h1>
        <p className="text-sm text-muted-foreground">
          Browse licensed content channels available to add to your playlists.
        </p>
      </div>

      {channels.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">No channels available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <ChannelCard
              key={channel._id}
              channel={channel}
              onClick={() => router.push(`/channels/${channel._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
