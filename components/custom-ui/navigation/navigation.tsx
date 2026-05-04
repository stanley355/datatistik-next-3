"use client";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authGetSessionOptions } from "@/hooks/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuUser, LuUserCog } from "react-icons/lu";

const UserMenuLinks = () => {
  const session = useQuery(authGetSessionOptions());
  if (!session.data || isAuthError(session.data)) {
    return (
      <Link
        href={"/auth/login"}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <LuUser /> Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {session.data.user.role === "admin" && (
        <Link
          href={"/admin"}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <LuUserCog /> Admin
        </Link>
      )}
      <Link
        href={"/account"}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <LuUser /> Account
      </Link>
    </div>
  );
};

export const Navigation = () => {
  const isMobile = useIsMobile();

  return (
    <div className="border-b">
      <div className="flex items-center justify-between container mx-auto">
        <Link href="/" className="p-2 font-bold text-lg font-mono">
          DELIFUNDS
        </Link>

        {isMobile ? (
          <SidebarTrigger />
        ) : (
          <div className="flex items-center gap-4">
            <UserMenuLinks />
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );
};
