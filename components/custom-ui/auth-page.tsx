import { authGetSession, isAuthError } from "@/lib/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type AuthPageProps = {
  children: React.ReactNode;
};

export const AuthPage = async ({ children }: AuthPageProps) => {
  const head = await headers();
  const cookie = head.get("cookie");
  console.log(cookie);
  const session = await authGetSession({ cookie });
  if (!session || isAuthError(session)) {
    redirect("/login");
  }
  return <>{children}</>;
};
