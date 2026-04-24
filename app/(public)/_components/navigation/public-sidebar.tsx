"use client";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideX } from "lucide-react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";

export function PublicSidebar() {
  const { setOpen, setOpenMobile } = useSidebar();
  const closeSidebar = () => {
    setOpen(false);
    setOpenMobile(false);
  };
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <Link
          href="/"
          className="p-2 font-bold text-lg "
          onClick={closeSidebar}
        >
          DATATISTIK
        </Link>

        <Button variant="ghost" size="icon" onClick={closeSidebar}>
          <LucideX />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <Link
          href="/auth/login"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          onClick={closeSidebar}
        >
          <LuUserRound />
          LOGIN
        </Link>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
