import { findUserCart, removeCart } from "@/lib/api";
import {
  mutationOptions,
  queryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

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

type RemoveCartData = Awaited<ReturnType<typeof removeCart>>;
export const removeCartOptions = (
  options?: Partial<UseMutationOptions<RemoveCartData, unknown, string>>,
) => {
  return mutationOptions({
    mutationKey: ["remove-cart"],
    mutationFn: async (cartId: string) => {
      return await removeCart(cartId);
    },
    ...options,
  });
};
