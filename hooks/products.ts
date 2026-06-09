import {
  createProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "@/lib/api/products";
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

export const findProductByIdOptions = (
  id: number,
  options?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof findProductById>>>
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: ["product-by-id", id],
    queryFn: () => findProductById(id),
  });
};

type UpdateProductData = Awaited<ReturnType<typeof updateProduct>>;
type UpdateProductParams = Parameters<typeof updateProduct>[1];
export const updateProductOptions = (
  options?: Partial<
    UseMutationOptions<UpdateProductData, unknown, UpdateProductParams>
  >,
) => {
  return mutationOptions({
    mutationKey: ["update-product"],
    mutationFn: async (params: UpdateProductParams & { id: number }) => {
      return await updateProduct(params.id, params);
    },
    ...options,
  });
};
