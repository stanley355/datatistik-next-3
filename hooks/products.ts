import { create } from "zustand";
import { createProduct, findProducts } from "@/lib/api/products";
import {
  mutationOptions,
  queryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { CURRENCIES } from "@/lib/types/currencies";
import { LANGUAGES } from "@/lib/types/languages";

type ProductStore = {
  currency: (typeof CURRENCIES)[number];
  language: (typeof LANGUAGES)[number];
  setCurrency: (currency: (typeof CURRENCIES)[number]) => void;
  setLanguage: (language: (typeof LANGUAGES)[number]) => void;
};

// 2. Apply the interface to the create function
export const useProductStore = create<ProductStore>((set) => ({
  currency: "RMB",
  language: "id",
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
  setLanguage: (newLanguage) => set({ language: newLanguage }),
}));

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
