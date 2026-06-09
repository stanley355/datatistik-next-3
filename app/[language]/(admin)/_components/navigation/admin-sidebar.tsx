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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { LucideX } from "lucide-react";
import Link from "next/link";
import { LuBoxes, LuUser, LuUserCog } from "react-icons/lu";

export function AdminSidebar() {
  const isMobile = useIsMobile();
  const { setOpen, setOpenMobile } = useSidebar();

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
        <Link
          href="/admin"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          onClick={closeSidebar}
        >
          <LuUserCog />
          ADMIN
        </Link>
        <Link
          href="/admin/products"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          onClick={closeSidebar}
        >
          <LuBoxes />
          PRODUCTS
        </Link>
        <Link
          href="/account"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
          onClick={closeSidebar}
        >
          <LuUser />
          ACCOUNT
        </Link>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
