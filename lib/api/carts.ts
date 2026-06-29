import { env } from "../env";
import { Api, ApiPagination, Cart, CartOption, Product } from "../types";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/carts";

type CreateCartSchema = {
  user_id: string;
  product_id: number;
  amount: number;
  options: CartOption[];
};

export const createCart = async (
  params?: CreateCartSchema,
): Promise<Api<Cart> | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export type CartJoinProduct = [Cart, Product];
export const findUserCart = async (
  userId: string,
): Promise<ApiPagination<CartJoinProduct[]> | undefined> => {
  try {
    const res = await fetch(baseUrl + `/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const removeCart = async (
  cartId: string,
): Promise<Api<Cart> | undefined> => {
  try {
    const res = await fetch(baseUrl + `/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
