"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, GripVertical, HelpCircle, ImageIcon, Trash2, Tv, VideoIcon } from "lucide-react";
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
  DialogFooter,
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

export interface DayPart {
  days: string[];
  start: string;
  end: string;
}

export interface PlaylistData {
  _id: string;
  name: string;
  content: Array<{ id: string | null; name: string; day_part?: DayPart | null }>;
  channels: Array<{ id: string | null; name: string }>;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];

const DAY_FULL_NAMES: Record<Day, string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};

const DAY_SHORT_MAP: Record<string, Day> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

interface Schedule {
  always: boolean;
  allDay: boolean;
  startTime: string;
  endTime: string;
  days: Day[];
}

const DEFAULT_SCHEDULE: Schedule = {
  always: true,
  allDay: true,
  startTime: "08:00",
  endTime: "20:00",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

interface PlaylistItem {
  localKey: string;
  id: string;
  name: string;
  url?: string;
  mime_type?: string;
  schedule?: Schedule;
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
        mime_type: item.id ? content.find((c) => c._id === item.id)?.mime_type : undefined,
        schedule: item.day_part
          ? {
              always: false,
              allDay: item.day_part.start === "00:00" && item.day_part.end === "23:59",
              startTime: item.day_part.start,
              endTime: item.day_part.end,
              days: item.day_part.days
                .map((d) => DAY_SHORT_MAP[d])
                .filter((d): d is Day => d !== undefined),
            }
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
  const [schedulingKey, setSchedulingKey] = React.useState<string | null>(null);
  const [scheduleWarningOpen, setScheduleWarningOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const schedulingItem = schedulingKey
    ? playlistItems.find((i) => i.localKey === schedulingKey) ?? null
    : null;

  function openSchedule(localKey: string) {
    setSchedulingKey(localKey);
  }

  function handleScheduleSave(localKey: string, schedule: Schedule) {
    setPlaylistItems((prev) =>
      prev.map((i) => (i.localKey === localKey ? { ...i, schedule } : i))
    );
    setSchedulingKey(null);
  }

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

  function handleContentAdd(selectedItems: ContentItem[]) {
    const existingIds = new Set(playlistItems.map((p) => p.id));
    const newItems = selectedItems
      .filter((item) => !existingIds.has(item._id))
      .map((item) => ({
        localKey: crypto.randomUUID(),
        id: item._id,
        name: item.name,
        url: item.url,
        mime_type: item.mime_type,
      }));
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
    const hasAlwaysItem = playlistItems.some((i) => !i.schedule || i.schedule.always);
    if (!hasAlwaysItem) {
      setScheduleWarningOpen(true);
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
          content: playlistItems.map(({ id, name, schedule }) => ({
            id,
            name,
            day_part: schedule && !schedule.always
              ? {
                  days: schedule.days.map((d) => DAY_FULL_NAMES[d]),
                  start: schedule.allDay ? "00:00" : schedule.startTime,
                  end: schedule.allDay ? "23:59" : schedule.endTime,
                }
              : null,
          })),
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
            <p className="text-xs text-muted-foreground">Add your uploaded images and videos. There is no limit on the number of items you can add but each playlist must have at least one item. You can schedule each content item to play on certain days and times.</p>
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
                      onSchedule={() => openSchedule(item.localKey)}
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
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => {
                    const allSelected = screens.every((s) => selectedScreenIds.includes(s._id));
                    setSelectedScreenIds(allSelected ? [] : screens.map((s) => s._id));
                  }}
                >
                  {screens.every((s) => selectedScreenIds.includes(s._id)) ? "Deselect all" : "Assign to all"}
                </button>
              </div>
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

      {schedulingItem && (
        <ScheduleDialog
          item={schedulingItem}
          onClose={() => setSchedulingKey(null)}
          onSave={(schedule) => handleScheduleSave(schedulingItem.localKey, schedule)}
        />
      )}

      <Dialog open={scheduleWarningOpen} onOpenChange={setScheduleWarningOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Schedule conflict</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            All playlists must have at least one content item that is set to &ldquo;Always play&rdquo;. This will prevent your screen from being blank.
          </p>
          <DialogFooter>
            <Button onClick={() => setScheduleWarningOpen(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface SortablePlaylistItemProps {
  item: PlaylistItem;
  onRemove: () => void;
  onSchedule: () => void;
}

function SortablePlaylistItem({ item, onRemove, onSchedule }: SortablePlaylistItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.localKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasSchedule = item.schedule && !item.schedule.always;

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
        onClick={onSchedule}
        title={hasSchedule ? "Edit schedule" : "Set schedule"}
        className={`transition-colors shrink-0 ${
          hasSchedule ? "text-green-500" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Clock className="size-4" />
        <span className="sr-only">Schedule</span>
      </button>

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

interface ScheduleDialogProps {
  item: PlaylistItem;
  onClose: () => void;
  onSave: (schedule: Schedule) => void;
}

function ScheduleDialog({ item, onClose, onSave }: ScheduleDialogProps) {
  const initial = item.schedule ?? DEFAULT_SCHEDULE;
  const [always, setAlways] = React.useState(initial.always);
  const [allDay, setAllDay] = React.useState(initial.allDay);
  const [startTime, setStartTime] = React.useState(initial.startTime);
  const [endTime, setEndTime] = React.useState(initial.endTime);
  const [days, setDays] = React.useState<Day[]>(initial.days);

  function toggleDay(day: Day) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleSave() {
    onSave({ always, allDay, startTime, endTime, days });
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
          <p className="text-sm text-muted-foreground truncate">{item.name}</p>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-1">
          {/* Always / Custom radio */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="radio"
                name="schedule-type"
                checked={always}
                onChange={() => setAlways(true)}
                className="accent-primary"
              />
              <span className="text-sm font-medium">Always play</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="radio"
                name="schedule-type"
                checked={!always}
                onChange={() => setAlways(false)}
                className="accent-primary"
              />
              <span className="text-sm font-medium">Custom schedule</span>
            </label>
          </div>

          {/* Custom schedule options */}
          {!always && (
            <div className="flex flex-col gap-4">
              {/* Days */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Days</Label>
                <div className="flex gap-1.5 flex-wrap">
                  {DAYS.map((day) => {
                    const active = days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* All day / Specific hours toggle */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs">Time</Label>
                <div className="flex rounded-md border overflow-hidden w-fit">
                  <button
                    type="button"
                    onClick={() => setAllDay(true)}
                    className={`text-xs px-3 py-1.5 font-medium transition-colors ${
                      allDay
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All day
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllDay(false)}
                    className={`text-xs px-3 py-1.5 font-medium transition-colors border-l ${
                      !allDay
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Specific hours
                  </button>
                </div>
              </div>

              {/* Time inputs */}
              {!allDay && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="start-time" className="text-xs">Start time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="end-time" className="text-xs">End time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  if (isVideo) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <VideoIcon className="size-4 text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <ImageIcon className="size-4 text-muted-foreground" />
    </div>
  );
}
