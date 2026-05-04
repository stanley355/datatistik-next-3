import { authVerifyEmail } from "@/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const authVerifyEmailOptions = (
  token: string,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof authVerifyEmail>>>
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["verify-email", token],
    queryFn: () => authVerifyEmail(token),
  });
};
