export type Product = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  unit: string;
  images: string[];
  metadata: Record<string, string | number>;
};
