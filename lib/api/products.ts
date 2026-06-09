import { env } from "../env";
import {
  Product,
  ApiPagination,
  ProductLocalization,
  S3Image,
  Api,
  ProductOption,
} from "../types";

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

type CreateProductParam = {
  created_by_id: string;
  price: number;
  is_available: boolean;
  title: ProductLocalization;
  description: ProductLocalization;
  image_urls: S3Image[];
  image_cover_number: number;
  source_url?: string;
  options?: ProductOption[];
};

export const createProduct = async (
  param: CreateProductParam,
): Promise<Api<Product> | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const findProductById = async (
  id: number,
): Promise<Api<Product> | undefined> => {
  try {
    const res = await fetch(baseUrl + `/${id}`, {
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

type UpdateProductParam = {
  created_by_id: string;
  price: number;
  is_available: boolean;
  title: ProductLocalization;
  description: ProductLocalization;
  image_urls: S3Image[];
  image_cover_number: number;
  source_url?: string;
  options?: ProductOption[];
};

export const updateProduct = async (
  productId: number,
  param: UpdateProductParam,
): Promise<Api<Product> | undefined> => {
  try {
    const res = await fetch(baseUrl + `/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
