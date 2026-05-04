import React from "react";
import { Navigation, AdminSidebar } from "./navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <Navigation />
        <main className="p-2 w-full flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};
