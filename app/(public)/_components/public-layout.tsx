import React from "react";
import { Navigation } from "./navigation";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <main className="p-2 lg:px-0 w-full flex-1 mt-16">{children}</main>
    </div>
  );
};
