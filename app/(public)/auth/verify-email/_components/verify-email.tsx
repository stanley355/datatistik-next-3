"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { VerifyEmailForm } from "./verify-email-form";
import { useQuery } from "@tanstack/react-query";
import { authVerifyEmailOptions } from "@/hooks/auth";
import { VerifyEmailLoading } from "./verify-email-loading";
import { isAuthError } from "@/lib/api";
import { VerifyEmailSuccess } from "./verify-email-success";

type VerifyEmailProps = {
  token: string;
};

export const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading } = useQuery(authVerifyEmailOptions(token));
  if (isLoading) {
    return <VerifyEmailLoading />;
  }

  if (!isAuthError(data) && data?.status) {
    return <VerifyEmailSuccess />;
  }
  return <VerifyEmailForm />;
};
