import { env } from "../env";
import { Api, Cart, ProductLocalization, ProductOptionValue } from "../types";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/carts";

type CreateCartOption = ProductLocalization & { value: ProductOptionValue };
type CreateCartSchema = {
  user_id: string;
  product_id: number;
  amount: number;
  options: CreateCartOption[];
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
