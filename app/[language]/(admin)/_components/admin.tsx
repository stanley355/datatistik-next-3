"use client";
import { SomethingWrongCard } from "@/components/custom-ui/something-wrong-card";
import { buttonVariants } from "@/components/ui/button";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Admin = () => {
  const session = useQuery(authGetSessionOptions());

  if (!session.data || isAuthError(session.data)) {
    return <SomethingWrongCard />;
  }
  return (
    <div className="container mx-auto p-4 lg:px-0 flex flex-col gap-4">
      <p className="capitalize font-bold">Hi, {session.data.user.name}</p>
      <Link href="/admin/products" className={cn(buttonVariants(), "w-fit")}>
        See Products
      </Link>
    </div>
  );
};
