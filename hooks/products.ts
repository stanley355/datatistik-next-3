import { findProducts } from "@/lib/api/products";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export const findProductOptions = (
  options?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findProducts>>>>,
) => {
  return queryOptions({
    ...options,
    queryKey: ["products"],
    queryFn: () => findProducts(),
  });
};
