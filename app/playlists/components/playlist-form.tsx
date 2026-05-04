"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GripVertical, HelpCircle, ImageIcon, Trash2, Tv } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentPicker } from "./content-picker";
import { ChannelPicker, type ExternalChannel } from "./channel-picker";

export interface ContentItem {
  _id: string;
  name: string;
  url: string;
  mime_type: string;
}

export interface Screen {
  _id: string;
  screen_name: string;
  location_name: string;
  assigned_playlist_name?: string;
}

export interface PlaylistData {
  _id: string;
  name: string;
  content: Array<{ id: string | null; name: string }>;
  channels: Array<{ id: string | null; name: string }>;
}

interface PlaylistItem {
  localKey: string;
  id: string;
  name: string;
  url?: string;
  mime_type?: string;
}

interface ChannelItem {
  id: string;
  name: string;
}

interface PlaylistFormProps {
  mode: "create" | "edit";
  playlist?: PlaylistData;
  content: ContentItem[];
  screens: Screen[];
  externalChannels: ExternalChannel[];
  assignedScreenIds?: string[];
}

export function PlaylistForm({
  mode,
  playlist,
  content,
  screens,
  externalChannels,
  assignedScreenIds = [],
}: PlaylistFormProps) {
  const router = useRouter();
  const [name, setName] = React.useState(playlist?.name ?? "");
  const [playlistItems, setPlaylistItems] = React.useState<PlaylistItem[]>(
    () =>
      (playlist?.content ?? []).map((item) => ({
        localKey: crypto.randomUUID(),
        id: item.id ?? "",
        name: item.name,
        url: item.id ? content.find((c) => c._id === item.id)?.url : undefined,
        mime_type: item.id
          ? content.find((c) => c._id === item.id)?.mime_type
          : undefined,
      }))
  );
  const [channelItems, setChannelItems] = React.useState<ChannelItem[]>(
    () => (playlist?.channels ?? []).map((item) => ({ id: item.id ?? "", name: item.name }))
  );
  const [selectedScreenIds, setSelectedScreenIds] = React.useState<string[]>(assignedScreenIds);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [channelPickerOpen, setChannelPickerOpen] = React.useState(false);
  const [channelHelpOpen, setChannelHelpOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPlaylistItems((items) => {
        const oldIndex = items.findIndex((i) => i.localKey === active.id);
        const newIndex = items.findIndex((i) => i.localKey === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleContentAdd(selectedIds: string[]) {
    const existingIds = new Set(playlistItems.map((p) => p.id));
    const newItems = selectedIds
      .filter((id) => !existingIds.has(id))
      .map((id) => {
        const c = content.find((c) => c._id === id)!;
        return {
          localKey: crypto.randomUUID(),
          id: c._id,
          name: c.name,
          url: c.url,
          mime_type: c.mime_type,
        };
      });
    setPlaylistItems((prev) => [...prev, ...newItems]);
  }

  function handleChannelAdd(added: { id: string; name: string }[]) {
    setChannelItems((prev) => {
      const existing = new Set(prev.map((c) => c.name));
      const newItems = added.filter((c) => !existing.has(c.name));
      return [...prev, ...newItems];
    });
  }

  function removePlaylistItem(localKey: string) {
    setPlaylistItems((prev) => prev.filter((i) => i.localKey !== localKey));
  }

  function removeChannel(name: string) {
    setChannelItems((prev) => prev.filter((c) => c.name !== name));
  }

  function toggleScreen(screenId: string) {
    setSelectedScreenIds((prev) =>
      prev.includes(screenId) ? prev.filter((x) => x !== screenId) : [...prev, screenId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Playlist name is required");
      return;
    }
    if (playlistItems.length === 0) {
      toast.error("Add at least one content item to the playlist");
      return;
    }

    setSaving(true);
    try {
      const url =
        mode === "create" ? "/api/playlists" : `/api/playlists/${playlist!._id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          content: playlistItems.map(({ id, name }) => ({ id, name })),
          channels: channelItems.map(({ id, name }) => ({ id: id || null, name })),
          screen_ids: selectedScreenIds,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save playlist");
      }

      router.push("/playlists");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 pt-4 max-w-2xl">
      <h1 className="text-xl font-semibold">
        {mode === "create" ? "Create Playlist" : "Edit Playlist"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Section 1 — Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="playlist-name">Name</Label>
          <Input
            id="playlist-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Playlist"
            required
          />
        </div>

        {/* Section 2 — Content */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Content</Label>
            <p className="text-xs text-muted-foreground">Add your uploaded images and videos. There is no limit on the number of items you can add but each playlist must have at least one item.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPickerOpen(true)}
            className="w-fit"
          >
            Add Content
          </Button>

          {playlistItems.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={playlistItems.map((i) => i.localKey)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-2">
                  {playlistItems.map((item) => (
                    <SortablePlaylistItem
                      key={item.localKey}
                      item={item}
                      onRemove={() => removePlaylistItem(item.localKey)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Section 3 — Channels */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Label>Channels</Label>
              <button
                type="button"
                onClick={() => setChannelHelpOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="size-3.5" />
                <span className="sr-only">Channels help</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Channels are curated lists of licensed content, from TikTok to ESPN. Channel content is only played when there is an accompanying ad. You can select up to three channels.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setChannelPickerOpen(true)}
            className="w-fit"
          >
            Add Channels
          </Button>

          {channelItems.length > 0 && (
            <div className="flex flex-col gap-2">
              {channelItems.map((channel) => (
                <div
                  key={channel.name}
                  className="flex items-center gap-3 p-2 rounded-md border bg-card"
                >
                  <Tv className="size-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm truncate">{channel.name}</span>
                  <button
                    type="button"
                    onClick={() => removeChannel(channel.name)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4 — Assign to Screens */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Assign to Screens</Label>
            <p className="text-xs text-muted-foreground">You can assign your playlist to one or more screens now, or you can take care of this later. If you assign the new playlist to a screen that has a playlist, the new playlist will take effect the next time the screen is refreshed.</p>
          </div>
          {screens.length === 0 ? (
            <p className="text-sm text-muted-foreground">No screens found for this account.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {screens.map((screen) => (
                <div key={screen._id} className="flex items-center gap-2">
                  <Checkbox
                    id={`screen-${screen._id}`}
                    checked={selectedScreenIds.includes(screen._id)}
                    onCheckedChange={() => toggleScreen(screen._id)}
                  />
                  <Label
                    htmlFor={`screen-${screen._id}`}
                    className="font-normal cursor-pointer"
                  >
                    {screen.screen_name}
                    {screen.location_name ? ` — ${screen.location_name}` : ""}
                    {screen.assigned_playlist_name && (
                      <span className="text-muted-foreground ml-1">
                        ({screen.assigned_playlist_name})
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5 — Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/playlists">Cancel</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>

      <ContentPicker
        content={content}
        alreadySelected={playlistItems.map((p) => p.id)}
        onAdd={handleContentAdd}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
      />

      <ChannelPicker
        channels={externalChannels}
        alreadySelected={channelItems.map((c) => c.name)}
        onAdd={handleChannelAdd}
        open={channelPickerOpen}
        onOpenChange={setChannelPickerOpen}
      />

      <Dialog open={channelHelpOpen} onOpenChange={setChannelHelpOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>About Channels</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface SortablePlaylistItemProps {
  item: PlaylistItem;
  onRemove: () => void;
}

function SortablePlaylistItem({ item, onRemove }: SortablePlaylistItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.localKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-2 rounded-md border bg-card"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground touch-none"
      >
        <GripVertical className="size-4" />
      </button>

      <div className="w-14 shrink-0 aspect-video relative bg-muted rounded overflow-hidden">
        <ContentThumbnail url={item.url} mime_type={item.mime_type} name={item.name} />
      </div>

      <span className="flex-1 text-sm truncate">{item.name}</span>

      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 className="size-4" />
        <span className="sr-only">Remove</span>
      </button>
    </div>
  );
}

interface ContentThumbnailProps {
  url?: string;
  mime_type?: string;
  name: string;
}

function ContentThumbnail({ url, mime_type, name }: ContentThumbnailProps) {
  const isImage = mime_type?.startsWith("image/");
  const isVideo = mime_type?.startsWith("video/");

  if (isImage && url) {
    return (
      <img
        src={url}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  if (isVideo && url) {
    return (
      <video
        src={url}
        className="absolute inset-0 h-full w-full object-cover"
        controls={false}
        autoPlay={false}
        preload="metadata"
        muted
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <ImageIcon className="size-4 text-muted-foreground" />
    </div>
  );
}
