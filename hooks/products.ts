import { createProduct, findProducts } from "@/lib/api/products";
import {
  mutationOptions,
  queryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export const findProductOptions = (
  options?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findProducts>>>>,
) => {
  return queryOptions({
    ...options,
    queryKey: ["products"],
    queryFn: () => findProducts(),
  });
};

type CreateProductData = Awaited<ReturnType<typeof createProduct>>;
type CreateProductParams = Parameters<typeof createProduct>[0];
export const createProductOptions = (
  options?: Partial<
    UseMutationOptions<CreateProductData, unknown, CreateProductParams>
  >,
) => {
  return mutationOptions({
    mutationKey: ["create-product"],
    mutationFn: async (params: CreateProductParams) => {
      return await createProduct(params);
    },
    ...options,
  });
};
