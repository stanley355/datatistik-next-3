import React from "react";
import { BottomNavigation, Navigation } from "./navigation";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <main className="p-4 lg:px-0 w-full flex-1 mt-16">{children}</main>
      <BottomNavigation />
    </div>
  );
};
