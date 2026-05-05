import { findProducts } from "@/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const productsOptions = (
  options?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findProducts>>>>,
) => {
  return queryOptions({
    ...options,
    queryKey: ["products"],
    queryFn: () => findProducts(),
  });
};
