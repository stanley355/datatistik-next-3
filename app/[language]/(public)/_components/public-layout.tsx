import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BottomNavigation, Navigation } from "./navigation";
import { Footer } from "./footer";
import { env } from "@/lib/env";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <main className="w-full flex-1">{children}</main>
      <BottomNavigation />
      <Footer />
      <GoogleAnalytics gaId={String(env.NEXT_PUBLIC_GA_ID)} />
    </div>
  );
};
