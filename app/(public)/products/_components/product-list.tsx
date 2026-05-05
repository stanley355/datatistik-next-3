"use client";
import { productsOptions } from "@/hooks/products";
import { useQuery } from "@tanstack/react-query";
import { LuSearch } from "react-icons/lu";
import { ProductNotFound } from "./product-not-found";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductListLoading } from "./product-list-loading";

export const ProductList = () => {
  const { data, isLoading } = useQuery(productsOptions());
  if (isLoading) {
    return <ProductListLoading />;
  }
  if (!data || !data.data || data?.data?.data.length === 0) {
    return <ProductNotFound />;
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(325px,350px))]   w-full">
      {Array.from({ length: 15 }).map((_, i) => (
        <Skeleton className="w-full h-64" key={`skeleton_${i}`} />
      ))}
    </div>
  );
};
