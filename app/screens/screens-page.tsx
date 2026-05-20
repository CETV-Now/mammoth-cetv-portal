"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "@googlemaps/js-api-loader";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
import { CheckCircle2, Globe, MoreHorizontal, Pencil, Power, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ScreenRow {
  _id: string;
  screen_name: string;
  location_id: string;
  location_name: string;
  status: string;
  connected: boolean;
  device_id: string | null;
  timezone: string | null;
  ad_serving_mode: string;
  audio_enabled: boolean;
  playlist_id: string | null;
  playlist_name: string | null;
  layout_id: string | null;
  layout_name: string | null;
}

const US_TIMEZONES = [
  { id: "America/New_York", label: "Eastern Time" },
  { id: "America/Chicago", label: "Central Time" },
  { id: "America/Denver", label: "Mountain Time" },
  { id: "America/Phoenix", label: "Mountain Time (Arizona)" },
  { id: "America/Los_Angeles", label: "Pacific Time" },
  { id: "America/Anchorage", label: "Alaska Time" },
  { id: "America/Adak", label: "Hawaii-Aleutian Time" },
  { id: "Pacific/Honolulu", label: "Hawaii Time (no DST)" },
] as const;

export interface LocationGroup {
  location_id: string;
  location_name: string;
  screens: ScreenRow[];
}

export interface LocationOption {
  _id: string;
  name: string;
}

interface ScreensPageProps {
  locationGroups: LocationGroup[];
  locations: LocationOption[];
  alwaysCharge: boolean;
}

export function ScreensPage({ locationGroups: initial, locations, alwaysCharge }: ScreensPageProps) {
  const router = useRouter();
  const [locationGroups, setLocationGroups] = React.useState(initial);
  const [editingLocation, setEditingLocation] = React.useState<{ id: string; name: string; screenCount: number } | null>(null);
  const [addScreenOpen, setAddScreenOpen] = React.useState(false);
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [bulkPlaylistOpen, setBulkPlaylistOpen] = React.useState(false);
  const [bulkLayoutOpen, setBulkLayoutOpen] = React.useState(false);

  React.useEffect(() => {
    setLocationGroups(initial);
  }, [initial]);

  const allScreenIds = React.useMemo(
    () => locationGroups.flatMap((g) => g.screens.map((s) => s._id)),
    [locationGroups]
  );

  function toggleScreen(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedIds(new Set());
  }

  function handleLocationSaved(id: string, newName: string) {
    setLocationGroups((prev) =>
      prev.map((g) => g.location_id === id ? { ...g, location_name: newName } : g)
    );
  }

  return (
    <div className="flex flex-col gap-8 pt-4 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Locations &amp; Screens</h1>
        <div className="flex gap-2">
          {!selectMode && (
            <Button variant="outline" onClick={() => setSelectMode(true)}>Select</Button>
          )}
          <Button onClick={() => setAddScreenOpen(true)}>Add Screen</Button>
        </div>
      </div>

      {locationGroups.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-24">
          <p className="text-muted-foreground text-sm">No screens found.</p>
        </div>
      ) : (
        locationGroups.map((group) => (
          <LocationSection
            key={group.location_id}
            group={group}
            alwaysCharge={alwaysCharge}
            selectMode={selectMode}
            selectedIds={selectedIds}
            onToggleScreen={toggleScreen}
            onEditLocation={() => setEditingLocation({ id: group.location_id, name: group.location_name, screenCount: group.screens.length })}
          />
        ))
      )}

      <EditLocationModal
        location={editingLocation}
        onOpenChange={(open) => { if (!open) setEditingLocation(null); }}
        onSaved={handleLocationSaved}
        onDeleted={() => router.refresh()}
      />

      <AddScreenModal
        open={addScreenOpen}
        onOpenChange={setAddScreenOpen}
        locations={locations}
        onSaved={() => router.refresh()}
      />

      <BulkSetPlaylistModal
        screenIds={Array.from(selectedIds)}
        open={bulkPlaylistOpen}
        onOpenChange={setBulkPlaylistOpen}
        onSaved={() => { router.refresh(); exitSelectMode(); }}
      />

      <BulkSetLayoutModal
        screenIds={Array.from(selectedIds)}
        open={bulkLayoutOpen}
        onOpenChange={setBulkLayoutOpen}
        onSaved={() => { router.refresh(); exitSelectMode(); }}
      />

      {selectMode && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-lg px-6 py-4 flex items-center gap-4">
          <span className="text-sm font-medium">
            {selectedIds.size} screen{selectedIds.size !== 1 ? "s" : ""} selected
          </span>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => {
              const allSelected = allScreenIds.every((id) => selectedIds.has(id));
              setSelectedIds(allSelected ? new Set() : new Set(allScreenIds));
            }}
          >
            {allScreenIds.every((id) => selectedIds.has(id)) ? "Deselect all" : "Select all"}
          </button>
          <div className="flex-1" />
          <Button
            variant="outline"
            disabled={selectedIds.size === 0}
            onClick={() => setBulkPlaylistOpen(true)}
          >
            Set Playlist
          </Button>
          <Button
            variant="outline"
            disabled={selectedIds.size === 0}
            onClick={() => setBulkLayoutOpen(true)}
          >
            Set Layout
          </Button>
          <Button variant="ghost" onClick={exitSelectMode}>Cancel</Button>
        </div>
      )}
    </div>
  );
}

function LocationSection({
  group,
  alwaysCharge,
  selectMode,
  selectedIds,
  onToggleScreen,
  onEditLocation,
}: {
  group: LocationGroup;
  alwaysCharge: boolean;
  selectMode: boolean;
  selectedIds: Set<string>;
  onToggleScreen: (id: string) => void;
  onEditLocation: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onEditLocation}
        className="text-sm font-semibold text-muted-foreground uppercase tracking-wide w-fit hover:text-foreground transition-colors"
      >
        {group.location_name}
      </button>
      <div className="rounded-md border">
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col className="w-72" />
            <col className="w-24" />
            <col className="w-24" />
            <col className="w-56" />
            <col className="w-56" />
            <col className="w-10" />
          </colgroup>
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Screen Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Connected</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Layout</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Playlist</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {group.screens.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  This location does not have any screens yet.
                </td>
              </tr>
            ) : (
              group.screens.map((screen, index) => (
                <ScreenRow
                  key={screen._id}
                  screen={screen}
                  alwaysCharge={alwaysCharge}
                  selectMode={selectMode}
                  selected={selectedIds.has(screen._id)}
                  onToggle={() => onToggleScreen(screen._id)}
                  isLast={index === group.screens.length - 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScreenRow({ screen, alwaysCharge, selectMode, selected, onToggle, isLast }: { screen: ScreenRow; alwaysCharge: boolean; selectMode: boolean; selected: boolean; onToggle: () => void; isLast: boolean }) {
  const router = useRouter();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(screen.screen_name);
  const [saving, setSaving] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cancelledRef = React.useRef(false);

  React.useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  async function handleSave() {
    const trimmed = (inputRef.current?.value ?? "").trim();
    if (!trimmed || trimmed === name) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screen_name: trimmed }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update screen name");
      }
      setName(trimmed);
      setEditing(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update screen name");
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { e.preventDefault(); handleSave(); }
    if (e.key === "Escape") { cancelledRef.current = true; setEditing(false); }
  }

  function handleBlur() {
    if (cancelledRef.current) { cancelledRef.current = false; return; }
    handleSave();
  }

  return (
    <tr
      className={[isLast ? "" : "border-b", selectMode ? "cursor-pointer hover:bg-muted/30" : ""].join(" ")}
      onClick={selectMode ? onToggle : undefined}
    >
      <td className="px-4 py-3 font-medium">
        {selectMode ? (
          <div className="flex items-center gap-2.5">
            <Checkbox
              checked={selected}
              onCheckedChange={onToggle}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="truncate">{name}</span>
          </div>
        ) : editing ? (
          <input
            ref={inputRef}
            defaultValue={name}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={saving}
            className="h-7 w-full rounded border border-input bg-transparent px-2 text-sm font-medium outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 disabled:opacity-50"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group flex items-center gap-1.5 w-full text-left min-w-0"
          >
            <span className="truncate">{name}</span>
            <Pencil className="size-3 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-60 transition-opacity" />
          </button>
        )}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={screen.status} />
      </td>
      <td className="px-4 py-3">
        <ConnectedBadge connected={screen.connected} />
      </td>
      <td className="px-4 py-3 text-muted-foreground truncate">
        {screen.layout_name ?? <span className="text-muted-foreground/50">—</span>}
      </td>
      <td className="px-4 py-3">
        {screen.playlist_id && screen.playlist_name ? (
          <Link href={`/playlists/${screen.playlist_id}/edit`} className="text-primary hover:underline">
            {screen.playlist_name}
          </Link>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        {!selectMode && <ScreenMenu screen={screen} alwaysCharge={alwaysCharge} />}
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "active") return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
  if (status === "new") return <Badge variant="secondary">Pending</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

function ConnectedBadge({ connected }: { connected: boolean }) {
  if (connected) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>;
  return <Badge variant="secondary">Offline</Badge>;
}

function ScreenMenu({ screen, alwaysCharge }: { screen: ScreenRow; alwaysCharge: boolean }) {
  const router = useRouter();
  const [installOpen, setInstallOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [setPlaylistOpen, setSetPlaylistOpen] = React.useState(false);
  const [setLayoutOpen, setSetLayoutOpen] = React.useState(false);
  const [installCode, setInstallCode] = React.useState<string | null>(null);
  const [installCodeLoading, setInstallCodeLoading] = React.useState(false);
  const [activating, setActivating] = React.useState(false);
  const [activated, setActivated] = React.useState(false);
  const [orderDeviceOpen, setOrderDeviceOpen] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const pinRef = React.useRef<HTMLInputElement>(null);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}/reload`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to refresh screen");
      }
      toast.success("Refresh command sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRefreshing(false);
    }
  }

  function handleInstallOpenChange(open: boolean) {
    setInstallOpen(open);
    if (!open) {
      if (pinRef.current) pinRef.current.value = "";
      setInstallCode(null);
      setActivated(false);
    }
  }

  React.useEffect(() => {
    if (!installOpen) return;
    setInstallCodeLoading(true);
    fetch(`/api/screens/${screen._id}`)
      .then((r) => r.json())
      .then((data) => setInstallCode(data.installCode ?? null))
      .catch(() => setInstallCode(null))
      .finally(() => setInstallCodeLoading(false));
  }, [installOpen, screen._id]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {screen.status === "new" && (
            <DropdownMenuItem onSelect={() => setInstallOpen(true)} className="text-green-600 focus:text-green-600">Activate</DropdownMenuItem>
          )}
          {screen.status === "new" && (
            <DropdownMenuItem onSelect={() => setOrderDeviceOpen(true)}>Order Device</DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={() => setDetailsOpen(true)}>Screen Details</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSetPlaylistOpen(true)}>Set Playlist</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSetLayoutOpen(true)}>Set Layout</DropdownMenuItem>
          {screen.connected && (
            <DropdownMenuItem onSelect={handleRefresh} disabled={refreshing}>
              {refreshing ? "Refreshing..." : "Refresh Screen"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={installOpen} onOpenChange={handleInstallOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Activate Screen</DialogTitle>
          </DialogHeader>
          {activated ? (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                It may take a few minutes for your screen to activate. If it is not activated within 5 minutes try entering the PIN again. Make sure to use the correct case for each letter that is displayed on the screen.
              </p>
              <Button className="w-full" onClick={() => handleInstallOpenChange(false)}>OK</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-muted-foreground">There are two ways to activate your screen.</p>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 text-sm">
                  <p className="text-foreground">Scan the QR code on your screen with your phone. When prompted, enter the code below on your phone:</p>
                  <p className="font-bold text-foreground text-2xl tracking-widest font-mono text-center">
                    {installCodeLoading ? "..." : (installCode ?? "—")}
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => handleInstallOpenChange(false)}>Done</Button>
                </div>
                <div className="relative flex items-center">
                  <div className="flex-1 h-px bg-border" />
                  <span className="px-3 text-xs text-muted-foreground">or:</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <p className="text-foreground">Enter the 4 character PIN displayed on the screen and click activate:</p>
                  <input
                    ref={pinRef}
                    id="install-pin"
                    defaultValue=""
                    type="text"
                    maxLength={4}
                    placeholder="A1B2"
                    autoComplete="off"
                    autoCapitalize="none"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none text-center text-lg tracking-widest font-mono focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                  <Button
                    className="w-full"
                    disabled={activating}
                    onClick={async () => {
                      const pin = (pinRef.current?.value ?? "").replace(/[^a-zA-Z0-9]/g, "");
                      if (pin.length !== 4) {
                        toast.error("Please enter the 4-character PIN");
                        return;
                      }
                      setActivating(true);
                      try {
                        const res = await fetch(`/api/screens/${screen._id}/activate`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ pin }),
                        });
                        if (!res.ok) {
                          const err = await res.json().catch(() => ({}));
                          throw new Error(err.error ?? "Activation failed");
                        }
                        setActivated(true);
                        router.refresh();
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Activation failed");
                      } finally {
                        setActivating(false);
                      }
                    }}
                  >
                    {activating ? "Activating…" : "Activate"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ScreenDetailsModal
        screen={screen}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <SetPlaylistModal
        screen={screen}
        open={setPlaylistOpen}
        onOpenChange={setSetPlaylistOpen}
      />

      <SetLayoutModal
        screen={screen}
        open={setLayoutOpen}
        onOpenChange={setSetLayoutOpen}
      />

      <OrderDeviceModal
        screen={screen}
        alwaysCharge={alwaysCharge}
        open={orderDeviceOpen}
        onOpenChange={setOrderDeviceOpen}
      />
    </>
  );
}

const templateLabels: Record<string, string> = {
  "two-zone-vertical": "Two Zone Vertical",
  "two-zone-horizontal": "Two Zone Horizontal",
  "five-zone": "5 Zone",
};

interface LayoutOption {
  _id: string;
  name: string;
  template: string;
}

function SetLayoutModal({
  screen,
  open,
  onOpenChange,
}: {
  screen: ScreenRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [layouts, setLayouts] = React.useState<LayoutOption[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [removing, setRemoving] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setSelectedId(screen.layout_id);
    setLoading(true);
    fetch("/api/layouts")
      .then((r) => r.json())
      .then((data) => setLayouts(data))
      .catch(() => toast.error("Failed to load layouts"))
      .finally(() => setLoading(false));
  }, [open, screen.layout_id]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout_id: selectedId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update layout");
      }
      toast.success("Layout updated");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setRemoving(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout_id: null }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to remove layout");
      }
      toast.success("Layout removed");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRemoving(false);
    }
  }

  const hasChanged = selectedId !== screen.layout_id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Layout</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">
            Select a layout to assign to <span className="font-medium text-foreground">{screen.screen_name}</span>.
          </p>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading layouts...</p>
        ) : layouts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No layouts found.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {layouts.map((layout) => {
              const isAssigned = layout._id === screen.layout_id;
              const isSelected = layout._id === selectedId;
              return (
                <button
                  key={layout._id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : layout._id)}
                  className={[
                    "flex items-start gap-3 rounded-md border p-3 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/40 hover:bg-muted/40",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mt-0.5 size-4 shrink-0 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-primary" : "border-muted-foreground/40",
                    ].join(" ")}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{layout.name}</span>
                      {isAssigned && (
                        <Badge variant="secondary" className="text-xs shrink-0">Current</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {templateLabels[layout.template] ?? layout.template}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="text-xs text-muted-foreground">Make sure to refresh your screen after setting a screen layout.</p>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={!screen.layout_id || removing || saving}
          >
            {removing ? "Removing..." : "Remove Layout"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !hasChanged || !selectedId || loading}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ScreenDetailsModal({
  screen,
  open,
  onOpenChange,
}: {
  screen: ScreenRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [rebooting, setRebooting] = React.useState(false);
  const [tzDialogOpen, setTzDialogOpen] = React.useState(false);
  const [selectedTz, setSelectedTz] = React.useState("");
  const [settingTz, setSettingTz] = React.useState(false);

  const canAction = screen.connected && !!screen.device_id;
  const offlineReason = !screen.device_id
    ? "No device ID — screen actions unavailable."
    : "Screen is offline — screen actions unavailable.";

  const currentTzLabel =
    US_TIMEZONES.find((tz) => tz.id === screen.timezone)?.label ?? screen.timezone;

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}/reload`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to refresh screen");
      }
      toast.success("Refresh command sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleReboot() {
    setRebooting(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}/reboot`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to reboot screen");
      }
      toast.success("Reboot command sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRebooting(false);
    }
  }

  async function handleSetTimezone() {
    if (!selectedTz) return;
    setSettingTz(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}/set-timezone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timezone: selectedTz }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to set timezone");
      }
      toast.success("Timezone updated");
      setTzDialogOpen(false);
      setSelectedTz("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSettingTz(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "deleted" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete screen");
      }
      toast.success("Screen deleted");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Screen Details</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="pt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-base">{screen.screen_name}</p>
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      screen.connected ? "bg-green-500" : "bg-red-400"
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{screen.location_name}</p>
                <div className="pt-1">
                  <StatusBadge status={screen.status} />
                </div>
                <div className="flex flex-col gap-1 pt-1 text-sm text-muted-foreground">
                  <span>
                    <span className="font-medium text-foreground">Playlist:</span>{" "}
                    {screen.playlist_id && screen.playlist_name ? (
                      <Link
                        href={`/playlists/${screen.playlist_id}/edit`}
                        className="hover:underline"
                        onClick={() => onOpenChange(false)}
                      >
                        {screen.playlist_name}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground/50">None assigned</span>
                    )}
                  </span>
                  <span>
                    <span className="font-medium text-foreground">Layout:</span>{" "}
                    {screen.layout_name ? (
                      <span>{screen.layout_name}</span>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">Screen ID:</span>{" "}
                    <span className="font-mono text-xs">{screen._id}</span>
                  </span>
                  <span>
                    <span className="font-medium text-foreground">Sound Enabled:</span>{" "}
                    {screen.audio_enabled ? "True" : "False"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">Timezone</p>
                    <p className="text-sm text-muted-foreground">
                      {currentTzLabel ?? <span className="text-muted-foreground/50">Not set</span>}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 shrink-0"
                    disabled={!canAction}
                    onClick={() => { setSelectedTz(""); setTzDialogOpen(true); }}
                  >
                    <Globe className="size-4" />
                    Set Timezone
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    disabled={!canAction || refreshing}
                    onClick={handleRefresh}
                  >
                    <RotateCcw className="size-4" />
                    {refreshing ? "Refreshing..." : "Refresh Screen"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    disabled={!canAction || rebooting}
                    onClick={handleReboot}
                  >
                    <Power className="size-4" />
                    {rebooting ? "Rebooting..." : "Reboot Screen"}
                  </Button>
                  {!canAction && (
                    <p className="w-full text-xs text-muted-foreground">{offlineReason}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={tzDialogOpen} onOpenChange={(v) => { if (!v) setTzDialogOpen(false); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Set Timezone</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Select value={selectedTz} onValueChange={setSelectedTz}>
              <SelectTrigger>
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                {US_TIMEZONES.map((tz) => (
                  <SelectItem key={tz.id} value={tz.id}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={!selectedTz || settingTz} onClick={handleSetTimezone}>
              {settingTz ? "Setting..." : "Set Timezone"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface PlaylistOption {
  _id: string;
  name: string;
  content_count: number;
  channel_count: number;
}

function SetPlaylistModal({
  screen,
  open,
  onOpenChange,
}: {
  screen: ScreenRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [playlists, setPlaylists] = React.useState<PlaylistOption[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setSelectedId(screen.playlist_id);
    setLoading(true);
    fetch("/api/playlists")
      .then((r) => r.json())
      .then((data) => setPlaylists(data))
      .catch(() => toast.error("Failed to load playlists"))
      .finally(() => setLoading(false));
  }, [open, screen.playlist_id]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/screens/${screen._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlist_id: selectedId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update playlist");
      }
      toast.success("Playlist updated");
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const hasChanged = selectedId !== screen.playlist_id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Playlist</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">
            Select a playlist to assign to <span className="font-medium text-foreground">{screen.screen_name}</span>.
          </p>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No playlists found.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {playlists.map((playlist) => {
              const isAssigned = playlist._id === screen.playlist_id;
              const isSelected = playlist._id === selectedId;
              return (
                <button
                  key={playlist._id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : playlist._id)}
                  className={[
                    "flex items-start gap-3 rounded-md border p-3 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/40 hover:bg-muted/40",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mt-0.5 size-4 shrink-0 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-primary" : "border-muted-foreground/40",
                    ].join(" ")}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{playlist.name}</span>
                      {isAssigned && (
                        <Badge variant="secondary" className="text-xs shrink-0">Current</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {playlist.content_count} item{playlist.content_count !== 1 ? "s" : ""}
                      {playlist.channel_count > 0 ? ` · ${playlist.channel_count} channel${playlist.channel_count !== 1 ? "s" : ""}` : ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="text-xs text-muted-foreground">Make sure to refresh your screen after selecting a playlist.</p>
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !hasChanged || loading}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OrderDeviceModal({
  screen,
  alwaysCharge,
  open,
  onOpenChange,
}: {
  screen: ScreenRow;
  alwaysCharge: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({ line1: "", city: "", state: "", zip: "" });
  const [loading, setLoading] = React.useState(false);
  const devicePriceCents = parseInt(process.env.NEXT_PUBLIC_DEVICE_PRICE ?? "0", 10);
  const devicePriceDisplay = `$${(devicePriceCents / 100).toFixed(2)}`;

  React.useEffect(() => {
    if (!open) {
      setShippingAddress({ line1: "", city: "", state: "", zip: "" });
      return;
    }
    setLoading(true);
    fetch(`/api/locations/${screen.location_id}`)
      .then((r) => r.json())
      .then((data) => setShippingAddress({ line1: data.address ?? "", city: data.city ?? "", state: data.state ?? "", zip: data.zip ?? "" }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open, screen.location_id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Device</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>
        ) : (
          <>
            <div className="rounded-md border bg-muted/50 px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">CETV Device (1×)</span>
              <span className="font-semibold">{devicePriceDisplay}</span>
            </div>
            {!alwaysCharge && (
              <p className="text-sm text-muted-foreground">
                We will not charge you for the device if you activate within 15 days of receiving it and keep it online for 30 days.
              </p>
            )}
            <Elements stripe={stripePromise}>
              <OrderForm
                shippingAddress={shippingAddress}
                onShippingChange={setShippingAddress}
                screenId={screen._id}
                locationId={screen.location_id}
                onSuccess={() => { onOpenChange(false); router.refresh(); }}
                onBack={() => onOpenChange(false)}
              />
            </Elements>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function BulkSetPlaylistModal({
  screenIds,
  open,
  onOpenChange,
  onSaved,
}: {
  screenIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const [playlists, setPlaylists] = React.useState<PlaylistOption[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setSelectedId(null); return; }
    setLoading(true);
    fetch("/api/playlists")
      .then((r) => r.json())
      .then((data) => setPlaylists(data))
      .catch(() => toast.error("Failed to load playlists"))
      .finally(() => setLoading(false));
  }, [open]);

  async function handleSave() {
    if (!selectedId) return;
    setSaving(true);
    try {
      await Promise.all(
        screenIds.map((id) =>
          fetch(`/api/screens/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playlist_id: selectedId }),
          }).then((r) => { if (!r.ok) throw new Error(); })
        )
      );
      toast.success(`Playlist assigned to ${screenIds.length} screen${screenIds.length !== 1 ? "s" : ""}`);
      onOpenChange(false);
      onSaved();
    } catch {
      toast.error("Failed to assign playlist to one or more screens");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Playlist</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">
            Assign a playlist to {screenIds.length} selected screen{screenIds.length !== 1 ? "s" : ""}.
          </p>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No playlists found.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {playlists.map((playlist) => {
              const isSelected = playlist._id === selectedId;
              return (
                <button
                  key={playlist._id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : playlist._id)}
                  className={[
                    "flex items-start gap-3 rounded-md border p-3 text-left transition-colors",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/40",
                  ].join(" ")}
                >
                  <div className={["mt-0.5 size-4 shrink-0 rounded-full border-2 flex items-center justify-center", isSelected ? "border-primary" : "border-muted-foreground/40"].join(" ")}>
                    {isSelected && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium truncate">{playlist.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {playlist.content_count} item{playlist.content_count !== 1 ? "s" : ""}
                      {playlist.channel_count > 0 ? ` · ${playlist.channel_count} channel${playlist.channel_count !== 1 ? "s" : ""}` : ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !selectedId || loading}>
            {saving ? "Saving..." : "Apply"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BulkSetLayoutModal({
  screenIds,
  open,
  onOpenChange,
  onSaved,
}: {
  screenIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const [layouts, setLayouts] = React.useState<LayoutOption[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setSelectedId(null); return; }
    setLoading(true);
    fetch("/api/layouts")
      .then((r) => r.json())
      .then((data) => setLayouts(data))
      .catch(() => toast.error("Failed to load layouts"))
      .finally(() => setLoading(false));
  }, [open]);

  async function handleSave() {
    if (!selectedId) return;
    setSaving(true);
    try {
      await Promise.all(
        screenIds.map((id) =>
          fetch(`/api/screens/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ layout_id: selectedId }),
          }).then((r) => { if (!r.ok) throw new Error(); })
        )
      );
      toast.success(`Layout assigned to ${screenIds.length} screen${screenIds.length !== 1 ? "s" : ""}`);
      onOpenChange(false);
      onSaved();
    } catch {
      toast.error("Failed to assign layout to one or more screens");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Layout</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">
            Assign a layout to {screenIds.length} selected screen{screenIds.length !== 1 ? "s" : ""}.
          </p>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading layouts...</p>
        ) : layouts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No layouts found.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {layouts.map((layout) => {
              const isSelected = layout._id === selectedId;
              return (
                <button
                  key={layout._id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : layout._id)}
                  className={[
                    "flex items-start gap-3 rounded-md border p-3 text-left transition-colors",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/40",
                  ].join(" ")}
                >
                  <div className={["mt-0.5 size-4 shrink-0 rounded-full border-2 flex items-center justify-center", isSelected ? "border-primary" : "border-muted-foreground/40"].join(" ")}>
                    {isSelected && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium truncate">{layout.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {templateLabels[layout.template] ?? layout.template}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !selectedId || loading}>
            {saving ? "Saving..." : "Apply"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ModalStep = "form" | "prompt" | "order";

interface ShippingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

function AddScreenModal({
  open,
  onOpenChange,
  locations,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: LocationOption[];
  onSaved: () => void;
}) {
  const [step, setStep] = React.useState<ModalStep>("form");
  const [mode, setMode] = React.useState<"existing" | "new">("existing");
  const [screenName, setScreenName] = React.useState("");
  const [locationId, setLocationId] = React.useState("");
  const [locName, setLocName] = React.useState("");
  const [addressInput, setAddressInput] = React.useState("");
  const [predictions, setPredictions] = React.useState<{ place_id: string; description: string }[]>([]);
  const [addressData, setAddressData] = React.useState<{
    address: string; city: string; state: string; zip: string; lat: number; long: number;
  } | null>(null);
  const [isAddressSelected, setIsAddressSelected] = React.useState(false);
  const [mapsReady, setMapsReady] = React.useState(false);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  // order step state
  const [createdScreenId, setCreatedScreenId] = React.useState("");
  const [createdLocationId, setCreatedLocationId] = React.useState("");
  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({ line1: "", city: "", state: "", zip: "" });
  const autocompleteRef = React.useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = React.useRef<google.maps.Geocoder | null>(null);

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then(() => {
      autocompleteRef.current = new google.maps.places.AutocompleteService();
      geocoderRef.current = new google.maps.Geocoder();
      setMapsReady(true);
    });
  }, []);

  React.useEffect(() => {
    if (!open) {
      setStep("form");
      setMode("existing");
      setScreenName("");
      setLocationId("");
      setLocName("");
      setAddressInput("");
      setAddressData(null);
      setIsAddressSelected(false);
      setPredictions([]);
      setCreatedScreenId("");
      setCreatedLocationId("");
      setShippingAddress({ line1: "", city: "", state: "", zip: "" });
      setAudioEnabled(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (!mapsReady || !autocompleteRef.current || !addressInput || isAddressSelected || mode !== "new") {
      if (!addressInput) setPredictions([]);
      return;
    }
    autocompleteRef.current.getPlacePredictions(
      { input: addressInput, types: ["address"] },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results.map((r) => ({ place_id: r.place_id, description: r.description })));
        } else {
          setPredictions([]);
        }
      }
    );
  }, [addressInput, mapsReady, isAddressSelected, mode]);

  function selectPrediction(prediction: { place_id: string; description: string }) {
    setIsAddressSelected(true);
    setAddressInput(prediction.description);
    setPredictions([]);
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ placeId: prediction.place_id }, (results, status) => {
      if (status !== "OK" || !results?.[0]) {
        toast.error("Could not load address details. Please try another address.");
        return;
      }
      const result = results[0];
      const get = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.long_name ?? "";
      const getShort = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.short_name ?? "";
      setAddressData({
        address: [get("street_number"), get("route")].filter(Boolean).join(" "),
        city: get("locality") || get("sublocality") || get("administrative_area_level_2"),
        state: getShort("administrative_area_level_1"),
        zip: get("postal_code"),
        lat: result.geometry.location.lat(),
        long: result.geometry.location.lng(),
      });
    });
  }

  async function handleSave() {
    if (!screenName.trim()) { toast.error("Screen name is required"); return; }
    if (mode === "existing" && !locationId) { toast.error("Please select a location"); return; }
    if (mode === "new" && !locName.trim()) { toast.error("Location name is required"); return; }

    setSaving(true);
    try {
      let screenId = "";
      let locId = "";

      if (mode === "existing") {
        const res = await fetch("/api/screens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location_id: locationId, screen_name: screenName.trim(), audio_enabled: audioEnabled }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Failed to add screen");
        }
        const data = await res.json();
        screenId = data.screenId;
        locId = locationId;

        // Fetch location address for shipping prefill
        const locRes = await fetch(`/api/locations/${locationId}`);
        if (locRes.ok) {
          const locData = await locRes.json();
          setShippingAddress({ line1: locData.address ?? "", city: locData.city ?? "", state: locData.state ?? "", zip: locData.zip ?? "" });
        }
      } else {
        const body: Record<string, unknown> = { name: locName.trim(), screen_name: screenName.trim(), audio_enabled: audioEnabled };
        if (addressData) {
          body.address = addressData.address;
          body.city = addressData.city;
          body.state = addressData.state;
          body.zip = addressData.zip;
          body.lat = addressData.lat;
          body.long = addressData.long;
          body.geo_point = { type: "Point", coordinates: [addressData.long, addressData.lat] };
        }
        const res = await fetch("/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Failed to add location");
        }
        const data = await res.json();
        screenId = data.screenId;
        locId = data.locationId;
        if (addressData) {
          setShippingAddress({ line1: addressData.address, city: addressData.city, state: addressData.state, zip: addressData.zip });
        }
      }

      setCreatedScreenId(screenId);
      setCreatedLocationId(locId);
      onSaved(); // refresh the list immediately
      setStep("prompt");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const title = step === "form" ? "Add Screen" : step === "prompt" ? "Screen Added" : "Order Device";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex rounded-md border overflow-hidden text-sm">
                <button
                  type="button"
                  onClick={() => setMode("existing")}
                  className={["flex-1 py-2 font-medium transition-colors", mode === "existing" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"].join(" ")}
                >
                  Existing Location
                </button>
                <button
                  type="button"
                  onClick={() => setMode("new")}
                  className={["flex-1 py-2 font-medium transition-colors border-l", mode === "new" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"].join(" ")}
                >
                  New Location
                </button>
              </div>

              {mode === "existing" ? (
                <div className="flex flex-col gap-2">
                  <Label>Location</Label>
                  {locations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No locations found. Add a new location instead.</p>
                  ) : (
                    <Select value={locationId} onValueChange={setLocationId}>
                      <SelectTrigger><SelectValue placeholder="Select a location" /></SelectTrigger>
                      <SelectContent>
                        {locations.map((l) => <SelectItem key={l._id} value={l._id}>{l.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label>Location Name</Label>
                    <Input value={locName} onChange={(e) => setLocName(e.target.value)} placeholder="e.g. Main Street Cafe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Address</Label>
                    <Input
                      placeholder={mapsReady ? "Start typing an address..." : "Loading..."}
                      value={addressInput}
                      disabled={!mapsReady}
                      autoComplete="off"
                      onChange={(e) => { setAddressInput(e.target.value); setAddressData(null); setIsAddressSelected(false); }}
                    />
                    {predictions.length > 0 && (
                      <ul className="w-full bg-popover border border-border rounded-md shadow-md overflow-hidden">
                        {predictions.map((p) => (
                          <li key={p.place_id} className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground" onMouseDown={() => selectPrediction(p)}>
                            {p.description}
                          </li>
                        ))}
                      </ul>
                    )}
                    {addressData && (
                      <p className="text-xs text-muted-foreground">
                        {[addressData.address, addressData.city, addressData.state, addressData.zip].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label>Screen Name</Label>
                <Input value={screenName} onChange={(e) => setScreenName(e.target.value)} placeholder="e.g. Screen 1" />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="audio-enabled"
                  checked={audioEnabled}
                  onCheckedChange={(v) => setAudioEnabled(!!v)}
                />
                <Label htmlFor="audio-enabled">Does this screen have sound?</Label>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? "Adding..." : "Add Screen"}</Button>
            </div>
          </>
        )}

        {step === "prompt" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle2 className="size-12 text-green-500" />
              <div>
                <p className="font-medium">Screen added successfully</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Would you like to order a device for <span className="font-medium text-foreground">{screenName}</span>?
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Skip for now</Button>
              <Button onClick={() => setStep("order")}>Order Device</Button>
            </div>
          </div>
        )}

        {step === "order" && (
          <Elements stripe={stripePromise}>
            <OrderForm
              shippingAddress={shippingAddress}
              onShippingChange={setShippingAddress}
              screenId={createdScreenId}
              locationId={createdLocationId}
              onSuccess={() => onOpenChange(false)}
              onBack={() => setStep("prompt")}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}

function OrderForm({
  shippingAddress,
  onShippingChange,
  screenId,
  locationId,
  onSuccess,
  onBack,
}: {
  shippingAddress: ShippingAddress;
  onShippingChange: (addr: ShippingAddress) => void;
  screenId: string;
  locationId: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = React.useState(false);

  function updateField(field: keyof ShippingAddress, value: string) {
    onShippingChange({ ...shippingAddress, [field]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setSubmitting(true);
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          address: {
            line1: shippingAddress.line1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.zip,
          },
        },
      });

      if (error) throw new Error(error.message);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress, paymentMethodId: paymentMethod?.id, screenId, locationId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to place order");
      }

      toast.success("Order placed! Your device is on the way.");
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Shipping Address</p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="order-line1">Street Address</Label>
          <Input id="order-line1" value={shippingAddress.line1} onChange={(e) => updateField("line1", e.target.value)} placeholder="123 Main St" required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="order-city">City</Label>
            <Input id="order-city" value={shippingAddress.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Phoenix" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="order-state">State</Label>
            <Input id="order-state" value={shippingAddress.state} onChange={(e) => updateField("state", e.target.value)} placeholder="AZ" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="order-zip">ZIP</Label>
            <Input id="order-zip" value={shippingAddress.zip} onChange={(e) => updateField("zip", e.target.value)} placeholder="85001" required />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Payment Information</p>
        <p className="text-xs text-muted-foreground">Your card will be saved for future billing when the device is installed.</p>
        <div className="border border-input rounded-md px-3 py-2.5 bg-transparent">
          <CardElement
            options={{
              style: {
                base: { fontSize: "14px", color: "#000", "::placeholder": { color: "#a1a1aa" } },
              },
            }}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-between pt-1">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit" disabled={submitting || !stripe}>
          {submitting ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
}

interface Prediction {
  place_id: string;
  description: string;
}

interface AddressData {
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  long: number;
}

function EditLocationModal({
  location,
  onOpenChange,
  onSaved,
  onDeleted,
}: {
  location: { id: string; name: string; screenCount: number } | null;
  onOpenChange: (open: boolean) => void;
  onSaved: (id: string, newName: string) => void;
  onDeleted: () => void;
}) {
  const [name, setName] = React.useState("");
  const [addressInput, setAddressInput] = React.useState("");
  const [predictions, setPredictions] = React.useState<Prediction[]>([]);
  const [addressData, setAddressData] = React.useState<AddressData | null>(null);
  const [isAddressSelected, setIsAddressSelected] = React.useState(false);
  const [mapsReady, setMapsReady] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const autocompleteRef = React.useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = React.useRef<google.maps.Geocoder | null>(null);

  // Load Maps SDK once
  React.useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then(() => {
      autocompleteRef.current = new google.maps.places.AutocompleteService();
      geocoderRef.current = new google.maps.Geocoder();
      setMapsReady(true);
    });
  }, []);

  // Prefill name when modal opens
  React.useEffect(() => {
    if (location) {
      setName(location.name);
      setAddressInput("");
      setAddressData(null);
      setIsAddressSelected(false);
      setPredictions([]);
    }
  }, [location]);

  // Address predictions
  React.useEffect(() => {
    if (!mapsReady || !autocompleteRef.current || !addressInput || isAddressSelected) {
      if (!addressInput) setPredictions([]);
      return;
    }
    autocompleteRef.current.getPlacePredictions(
      { input: addressInput, types: ["address"] },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results.map((r) => ({ place_id: r.place_id, description: r.description })));
        } else {
          setPredictions([]);
        }
      }
    );
  }, [addressInput, mapsReady, isAddressSelected]);

  function selectPrediction(prediction: Prediction) {
    setIsAddressSelected(true);
    setAddressInput(prediction.description);
    setPredictions([]);

    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ placeId: prediction.place_id }, (results, status) => {
      if (status !== "OK" || !results?.[0]) {
        toast.error("Could not load address details. Please try another address.");
        return;
      }
      const result = results[0];
      const get = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.long_name ?? "";
      const getShort = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.short_name ?? "";

      setAddressData({
        address: [get("street_number"), get("route")].filter(Boolean).join(" "),
        city: get("locality") || get("sublocality") || get("administrative_area_level_2"),
        state: getShort("administrative_area_level_1"),
        zip: get("postal_code"),
        lat: result.geometry.location.lat(),
        long: result.geometry.location.lng(),
      });
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!location || !name.trim()) return;

    setSaving(true);
    try {
      const body: Record<string, unknown> = { name: name.trim() };
      if (addressData) {
        body.address = addressData.address;
        body.city = addressData.city;
        body.state = addressData.state;
        body.zip = addressData.zip;
        body.lat = addressData.lat;
        body.long = addressData.long;
        body.geo_point = { type: "Point", coordinates: [addressData.long, addressData.lat] };
      }

      const res = await fetch(`/api/locations/${location.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save location");
      }

      toast.success("Location updated");
      onSaved(location.id, name.trim());
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!location) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/locations/${location.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete location");
      }
      toast.success("Location deleted");
      onOpenChange(false);
      onDeleted();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={!!location} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="loc-name">Location Name</Label>
            <Input
              id="loc-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="loc-address">Address</Label>
            <Input
              id="loc-address"
              placeholder={mapsReady ? "Start typing to update address..." : "Loading..."}
              value={addressInput}
              disabled={!mapsReady}
              autoComplete="off"
              onChange={(e) => {
                setAddressInput(e.target.value);
                setAddressData(null);
                setIsAddressSelected(false);
              }}
            />
            {predictions.length > 0 && (
              <ul className="w-full bg-popover border border-border rounded-md shadow-md overflow-hidden">
                {predictions.map((p) => (
                  <li
                    key={p.place_id}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onMouseDown={() => selectPrediction(p)}
                  >
                    {p.description}
                  </li>
                ))}
              </ul>
            )}
            {addressData && (
              <p className="text-xs text-muted-foreground">
                {[addressData.address, addressData.city, addressData.state, addressData.zip].filter(Boolean).join(", ")}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
