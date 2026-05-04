"use client";

import * as React from "react";
import Link from "next/link";
import { Archive, ListVideo, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export interface PlaylistListItem {
  _id: string;
  name: string;
  content_count: number;
  channel_count: number;
  screen_count: number;
}

interface PlaylistsPageProps {
  initialPlaylists: PlaylistListItem[];
}

export function PlaylistsPage({ initialPlaylists }: PlaylistsPageProps) {
  const [playlists, setPlaylists] = React.useState<PlaylistListItem[]>(initialPlaylists);

  async function handleArchive(id: string) {
    setPlaylists((prev) => prev.filter((p) => p._id !== id));
    try {
      const res = await fetch(`/api/playlists/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "archive" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to archive");
      }
      toast.success("Playlist archived");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Archive failed");
      setPlaylists(initialPlaylists);
    }
  }

  async function handleDelete(id: string) {
    setPlaylists((prev) => prev.filter((p) => p._id !== id));
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete");
      }
      toast.success("Playlist deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      setPlaylists(initialPlaylists);
    }
  }

  if (playlists.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
        <ListVideo className="size-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">You haven&apos;t created any playlists yet.</p>
        <Button asChild>
          <Link href="/playlists/new">Create Playlist</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Playlists</h1>
        <Button asChild>
          <Link href="/playlists/new">Create Playlist</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Content Items</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Channels</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Screens</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist, index) => (
              <tr
                key={playlist._id}
                className={index < playlists.length - 1 ? "border-b" : ""}
              >
                <td className="px-4 py-3 font-medium">{playlist.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{playlist.content_count}</td>
                <td className="px-4 py-3 text-muted-foreground">{playlist.channel_count}</td>
                <td className="px-4 py-3 text-muted-foreground">{playlist.screen_count}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild className="h-7 px-2">
                      <Link href={`/playlists/${playlist._id}/edit`}>
                        <Pencil className="size-3.5" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-muted-foreground hover:text-foreground"
                      onClick={() => handleArchive(playlist._id)}
                    >
                      <Archive className="size-3.5" />
                      <span className="sr-only">Archive</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(playlist._id)}
                    >
                      <Trash2 className="size-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
