import { authGetSession, authVerifyEmail } from "@/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const authVerifyEmailOptions = (
  token: string,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof authVerifyEmail>>>
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["auth-verify-email", token],
    queryFn: () => authVerifyEmail(token),
  });
};

export const authGetSessionOptions = (
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof authGetSession>>>
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["auth-get-session"],
    queryFn: () => authGetSession(),
  });
};
