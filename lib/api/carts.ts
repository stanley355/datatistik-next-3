import { env } from "../env";
import { Api, Cart } from "../types";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/carts";

type CreateCartSchema = {
  user_id: string;
  product_id: number;
  amount: number;
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
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
