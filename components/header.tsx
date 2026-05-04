"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
