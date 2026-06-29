import { findUserCart, removeCart, updateCart } from "@/lib/api";
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

type UpdateCartParams = { cartId: string; amount: number };
type UpdateCartData = Awaited<ReturnType<typeof updateCart>>;
export const updateCartOptions = (
  options?: Partial<
    UseMutationOptions<UpdateCartData, unknown, UpdateCartParams>
  >,
) => {
  return mutationOptions({
    mutationKey: ["update-cart"],
    mutationFn: async (params: UpdateCartParams) => {
      return await updateCart(params.cartId, { amount: params.amount });
    },
    ...options,
  });
};
