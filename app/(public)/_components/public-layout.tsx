import React from "react";
import { BottomNavigation, Navigation } from "./navigation";
import { Footer } from "./footer";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <main className="w-full flex-1">{children}</main>
      <BottomNavigation />
      <Footer />
    </div>
  );
};
