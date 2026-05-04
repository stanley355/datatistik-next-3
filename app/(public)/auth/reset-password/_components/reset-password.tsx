"use client";
import { ResetPasswordForm } from "./reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResetPasswordProps = {
  token: string;
};

export const ResetPassword = ({ token }: ResetPasswordProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RESET PASSWORD</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  );
};
