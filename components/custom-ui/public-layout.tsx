import React from "react";
// import { Navigation } from "./_components";
import { Navigation, PublicSidebar } from "./navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <PublicSidebar />
      <div className="flex flex-col w-full">
        <Navigation />
        <main className="p-2 w-full flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};
