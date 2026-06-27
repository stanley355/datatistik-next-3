import { ProductLocalization, ProductOptionValue } from "./products";

export type CartOption = ProductLocalization & {
  value: ProductOptionValue;
};

export type Cart = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  product_id: number;
  options: CartOption[];
  amount: number;
};
