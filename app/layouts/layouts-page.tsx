"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const templateLabels: Record<string, string> = {
  "two-zone-vertical": "Two Zone Vertical",
  "two-zone-horizontal": "Two Zone Horizontal",
  "five-zone": "5 Zone",
};

interface LayoutRow {
  _id: string;
  name: string;
  description: string;
  template: string;
  screensAssigned: number;
}

export function LayoutsPage({ layouts }: { layouts: LayoutRow[] }) {
  const router = useRouter();

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
