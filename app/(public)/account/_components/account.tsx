"use client";
import { SomethingWrongCard } from "@/components/custom-ui/something-wrong-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authGetSessionOptions } from "@/hooks/auth";
import { authSignOut, isAuthError } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  if (!session.data || isAuthError(session.data)) {
    return <SomethingWrongCard />;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-mono">ACCOUNT</CardTitle>
        <CardDescription>Manage and protect your account</CardDescription>
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

        <Button className="w-fit" onClick={onLogoutClick}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};
