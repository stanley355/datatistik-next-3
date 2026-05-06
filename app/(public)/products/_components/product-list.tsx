"use client";
import { productsOptions } from "@/hooks/products";
import { useQuery } from "@tanstack/react-query";
import { ProductNotFound } from "./product-not-found";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductListLoading } from "./product-list-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const ProductList = () => {
  const { data, isLoading } = useQuery(productsOptions());
  if (isLoading) {
    return <ProductListLoading />;
  }
  if (!data || !data.data || data?.data?.data.length === 0) {
    return <ProductNotFound />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 w-full items-stretch">
      {data.data.data.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product.id}
          title={product.name}
        >
          <Card className="transition-all duration-300 ease-in-out hover:translate-y-2 hover:shadow-xl h-full">
            <CardHeader>
              <img
                className="object-cover w-full aspect-square"
                src={product.images[0]}
                alt={product.name}
              />
            </CardHeader>
            <CardContent>
              <h3>{product.name}</h3>
              <h4 className="text-xl font-bold text-primary">
                {product.currency.toUpperCase()} {product.price}
              </h4>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
