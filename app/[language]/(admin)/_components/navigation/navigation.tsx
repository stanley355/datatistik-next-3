"use client";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuBoxes, LuUser, LuUserCog } from "react-icons/lu";

const UserMenuLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={"/admin"}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <LuUserCog /> Admin
      </Link>
      <Link
        href={"/admin/products"}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <LuBoxes /> Products
      </Link>
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
