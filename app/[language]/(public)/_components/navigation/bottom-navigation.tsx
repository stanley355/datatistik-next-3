"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuHouse, LuShoppingCart } from "react-icons/lu";
import { NavigationAccountLink } from "./navigation-account-link";

export const BottomNavigation = () => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:hidden fixed bottom-4 left-[50%] -translate-x-[50%] border w-[90%] rounded-full place-items-center bg-background z-10">
      <Link
        href="/"
        title="Home"
        className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }))}
      >
        <LuHouse />
      </Link>
      <Link
        href="/products/carts"
        title="My Cart"
        className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }))}
      >
        <LuShoppingCart />
      </Link>
      <NavigationAccountLink isBottomNavigation={true} />
    </div>
  );
};
