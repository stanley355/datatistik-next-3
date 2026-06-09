import React from "react";
import { AdminLayout } from "./_components/admin-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
