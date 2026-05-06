"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuBell, LuHouse, LuShoppingCart } from "react-icons/lu";
import { NavigationAccountLink } from "./navigation-account-link";

export const BottomNavigation = () => {
  return (
    <div className="grid grid-cols-4 gap-4 sm:hidden fixed bottom-0 left-0 border-t w-full place-items-center p-2">
      <Link
        href="/"
        title="Home"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex-col gap-2 w-full",
        )}
      >
        <LuHouse />
        Home
      </Link>
      <Link
        href="/products/carts"
        title="My Cart"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex-col gap-2 w-full",
        )}
      >
        <LuShoppingCart />
        Cart
      </Link>
      <Link
        href="/notifications"
        title="Notifications"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex-col gap-2 w-full",
        )}
      >
        <LuBell />
        Notifications
      </Link>
      <NavigationAccountLink isBottomNavigation={true} />
    </div>
  );
};
