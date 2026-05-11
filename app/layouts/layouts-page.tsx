"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const templateLabels: Record<string, string> = {
  "two-zone-vertical": "Two Zone Vertical",
  "two-zone-horizontal": "Two Zone Horizontal",
  "five-zone": "5 Zone",
  two_zone_v: "Two Zone Vertical",
  two_zone_h: "Two Zone Horizontal",
  five_zone: "5 Zone",
};

interface LayoutRow {
  _id: string;
  name: string;
  description: string;
  template: string;
  screensAssigned: number;
  hasZones: boolean;
}

export function LayoutsPage({ layouts: initial }: { layouts: LayoutRow[] }) {
  const router = useRouter();
  const [layouts, setLayouts] = React.useState(initial);

  React.useEffect(() => {
    setLayouts(initial);
  }, [initial]);

  function handleDeleted(id: string) {
    setLayouts((prev) => prev.filter((l) => l._id !== id));
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <h1 className="text-xl font-semibold">Layouts</h1>
          <p className="text-sm text-muted-foreground">
            Layouts let you determine how your screen content is presented to your customers. You can choose from three preset layout templates and customize each to fit your needs. Screens use the default layout until you assign a different layout to it, so you can create and customize your layouts ahead of time and then assign them to your screens when you&apos;re ready.
          </p>
        </div>
        <Button onClick={() => router.push("/layouts/new")} className="shrink-0">
          Create Layout
        </Button>
      </div>

      {layouts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-24">
          <p className="text-sm text-muted-foreground">No layouts created yet.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Template</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Screens Assigned</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {layouts.map((layout) => (
                <tr key={layout._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{layout.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {templateLabels[layout.template] ?? layout.template}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {layout.description || <span className="italic">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{layout.screensAssigned}</td>
                  <td className="px-4 py-3 text-right">
                    <LayoutMenu layout={layout} onDeleted={handleDeleted} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LayoutMenu({
  layout,
  onDeleted,
}: {
  layout: LayoutRow;
  onDeleted: (id: string) => void;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const isAssigned = layout.screensAssigned > 0;

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/layouts/${layout._id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete layout");
      }
      toast.success("Layout deleted");
      onDeleted(layout._id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" disabled={deleting}>
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => window.open(`https://player-preview.cetvnow.network?layout_id=${layout._id}`, "_blank")}
          disabled={!layout.hasZones}
        >
          Preview Layout
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push(`/layouts/${layout._id}/edit`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleDelete}
          disabled={isAssigned}
          className="text-destructive focus:text-destructive"
          title={isAssigned ? "Remove this layout from all screens before deleting" : undefined}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
