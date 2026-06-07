import { buttonVariants } from "@/components/ui/button";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { LuUser } from "react-icons/lu";

type NavigationAccountLinkProps = {
  isBottomNavigation: boolean;
};

export const NavigationAccountLink = ({
  isBottomNavigation,
}: NavigationAccountLinkProps) => {
  const session = useQuery(authGetSessionOptions());
  if (!session.data || isAuthError(session.data)) {
    return (
      <Link
        href={"/auth/login"}
        title="Login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          isBottomNavigation
            ? "flex-col"
            : "text-primary-foreground hidden sm:flex",
        )}
      >
        <LuUser /> Login
      </Link>
    );
  }

  return (
    <Link
      href={"/account"}
      title="Account"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        isBottomNavigation
          ? "flex-col"
          : "text-primary-foreground hidden sm:flex",
      )}
    >
      <LuUser /> Account
    </Link>
  );
};
