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
  image_urls: string[];
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
  image_url: string;
  price_addition: number;
};
