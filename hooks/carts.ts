import { findUserCart } from "@/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const findCartByUserOptions = (
  userId: string,
  options?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findUserCart>>>>,
) => {
  return queryOptions({
    ...options,
    queryKey: ["user-cart", userId],
    queryFn: () => findUserCart(userId),
  });
};
