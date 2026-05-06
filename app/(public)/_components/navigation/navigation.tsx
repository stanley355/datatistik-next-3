"use client";
import { buttonVariants } from "@/components/ui/button";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuSearch, LuShoppingCart, LuUser, LuUserCog } from "react-icons/lu";
import { NavigationSearchForm } from "./navigation-search-form";
import { NavigationAccountLink } from "./navigation-account-link";

export const Navigation = () => {
  const pathname = usePathname();
  if (pathname === "/search") {
    return <></>;
  }
  return (
    <div className="shadow bg-primary fixed top-0 left-0 w-full p-2 z-10">
      <div className="container mx-auto flex items-center justify-between gap-2 ">
        <Link
          href="/search"
          className="bg-background rounded p-2 flex items-center gap-2 flex-1 sm:hidden"
        >
          <LuSearch className="text-xl" />
          <span className="text-sm text-muted-foreground">
            Search Delifunds
          </span>
        </Link>
        <Link
          href="/"
          title="DELIFUNDS"
          className="text-primary-foreground font-bold text-2xl font-mono hidden sm:contents"
        >
          DELIFUNDS
        </Link>
        <NavigationSearchForm />
        <Link
          href="/products/carts"
          title="My Cart"
          className={cn(
            buttonVariants({ size: "icon", variant: "ghost" }),
            "text-primary-foreground",
          )}
        >
          <LuShoppingCart />
        </Link>
        <NavigationAccountLink isBottomNavigation={false} />
      </div>
    </div>
  );
};
