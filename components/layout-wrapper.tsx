"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const routeNames: Record<string, string> = {
  "/screens": "Screens",
  "/content": "Content",
  "/layouts": "Layouts",
  "/channels": "Channels",
  "/playlists": "Playlists",
  "/dashboard": "Dashboard",
};

function getPageName(pathname: string | null): string {
  if (!pathname) return "";
  const match = Object.entries(routeNames).find(([route]) =>
    pathname === route || pathname.startsWith(route + "/")
  );
  return match ? match[1] : "";
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
  const isOnboardingPage = pathname?.startsWith("/onboarding");

  if (isAuthPage || isOnboardingPage) {
    return <>{children}</>;
  }

  const pageName = getPageName(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{pageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
