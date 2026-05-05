import { env } from "../env";
import { ApiPagination } from "../types/api";
import { Product } from "../types/products";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/products";

export const findProducts = async (): Promise<
  ApiPagination<Product[]> | undefined
> => {
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
