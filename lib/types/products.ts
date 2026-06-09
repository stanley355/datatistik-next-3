import { S3Image } from "./s3";

export type Product = {
  id: number;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  is_available: boolean;
  price: number;
  title: ProductLocalization;
  description: ProductLocalization;
  options: ProductOption[];
  image_urls: S3Image[];
};

export type ProductLocalization = {
  cn: string;
  en: string;
  id: string;
};

export type ProductOption = ProductLocalization & {
  values: ProductOptionValue[];
};

export type ProductOptionValue = ProductLocalization & {
  price_addition: number;
};
