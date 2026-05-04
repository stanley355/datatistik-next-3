"use client";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { authGetSessionOptions } from "@/hooks/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LucideX } from "lucide-react";
import Link from "next/link";
import { LuUser, LuUserCog } from "react-icons/lu";

export function PublicSidebar() {
  const isMobile = useIsMobile();

  const { setOpen, setOpenMobile } = useSidebar();
  const session = useQuery(authGetSessionOptions());
  const isLoggedIn =
    session.data && !isAuthError(session.data) && session.data?.session;
  const isAdmin =
    session.data &&
    !isAuthError(session.data) &&
    session.data?.user.role === "admin";

  const closeSidebar = () => {
    setOpen(false);
    setOpenMobile(false);
  };
  if (!isMobile) return <></>;
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <Link
          href="/"
          className="p-2 font-bold text-lg font-mono"
          onClick={closeSidebar}
        >
          DELIFUNDS
        </Link>

        <Button variant="ghost" size="icon" onClick={closeSidebar}>
          <LucideX />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start",
            )}
            onClick={closeSidebar}
          >
            <LuUserCog />
            ADMIN
          </Link>
        )}
        <Link
          href={isLoggedIn ? "/account" : "/auth/login"}
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          onClick={closeSidebar}
        >
          <LuUser />
          {isLoggedIn ? "ACCOUNT" : "LOGIN"}
        </Link>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
