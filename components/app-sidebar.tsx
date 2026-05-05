"use client";

import * as React from "react";
import { Monitor, Library, Layout, ListVideo, Tv, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
  {
    title: "Settings",
    items: [
      {
        title: "My Account",
        url: "/account",
        icon: User,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex size-8 items-center justify-center shrink-0">
                <Image src="/cetv_logo.png" alt="CETV" width={32} height={32} className="rounded-lg object-contain" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">CETV Now!</span>
                <span className="text-xs text-muted-foreground">v. 1.0.0</span>
              </div>
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
    </Sidebar>
  );
}
