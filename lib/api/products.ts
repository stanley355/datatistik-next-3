import { env } from "../env";
import {
  Product,
  ApiPagination,
  ProductLocalization,
  S3Image,
  Api,
  ProductOption,
} from "../types";
import qs from "qs";

const baseUrl = env.NEXT_PUBLIC_API_URL + "/products";

type FindProductsParams = {
  is_available?: boolean;
};

export const findProducts = async (
  params?: FindProductsParams,
): Promise<ApiPagination<Product[]> | undefined> => {
  const queryParams = qs.stringify(params, { addQueryPrefix: true });
  try {
    const res = await fetch(baseUrl + queryParams, {
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
