import React from "react";
import { Navigation } from "./_components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PublicSidebar } from "./_components/navigation/public-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PublicSidebar />
      <div className="flex flex-col w-full">
        <Navigation />
        <main className="p-2 w-full flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
