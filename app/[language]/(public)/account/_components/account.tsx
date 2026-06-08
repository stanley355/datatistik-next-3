"use client";
import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { SomethingWrongCard } from "@/components/custom-ui/something-wrong-card";
import { ThemeToggle } from "@/components/custom-ui/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authGetSessionOptions } from "@/hooks/auth";
import { useLanguage } from "@/hooks/language";
import { authSignOut, isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Account = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useQuery(authGetSessionOptions());

  const onLogoutClick = async () => {
    await authSignOut();
    queryClient.invalidateQueries({
      queryKey: authGetSessionOptions().queryKey,
    });
    router.push("/");
  };

  if (session.isLoading) {
    return <LoadingLogo />;
  }

  if (!session.data || isAuthError(session.data)) {
    return <SomethingWrongCard />;
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="font-mono">ACCOUNT</CardTitle>
          <CardDescription>Manage and protect your account</CardDescription>
        </div>
        <ThemeToggle />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h4 className="font-mono font-semibold">Email</h4>
          <p>{session.data.user.email}</p>
        </div>
        <div>
          <h4 className="font-mono font-semibold">Name</h4>
          <p>{session.data.user.name}</p>
        </div>
        <div>
          <h4 className="font-mono font-semibold">Date Joined</h4>
          <p>
            {new Date(session.data.user.createdAt).toLocaleString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {session.data.user.role === "admin" && (
            <Link
              href="/admin"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Admin
            </Link>
          )}
          <Button
            className="w-fit"
            variant="destructive"
            onClick={onLogoutClick}
          >
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
