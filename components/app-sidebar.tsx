"use client";

import * as React from "react";
import { Monitor, Library, Layout, ListVideo, Tv, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
}

interface NavigationGroup {
  title: string;
  items: MenuItem[];
}

const navigationGroups: NavigationGroup[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Locations & Screens",
        url: "/screens",
        icon: Monitor,
      },
      {
        title: "Content Library",
        url: "/content",
        icon: Library,
      },
      {
        title: "Playlists",
        url: "/playlists",
        icon: ListVideo,
      },
      {
        title: "Channels",
        url: "/channels",
        icon: Tv,
      },
      {
        title: "Layouts",
        url: "/layouts",
        icon: Layout,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TvMinimalPlay className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">CETV Portal</span>
                  <span className="text-xs text-muted-foreground">Self-Service</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <UserButton afterSignOutUrl="/sign-in" />
              {state === "expanded" && <span className="text-sm text-muted-foreground">Account</span>}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
