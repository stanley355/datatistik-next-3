import { PublicLayout } from "@/app/(public)/_components/public-layout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
