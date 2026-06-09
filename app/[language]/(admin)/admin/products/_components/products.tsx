"use client";
import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { findProductOptions } from "@/hooks/products";
import { useQuery } from "@tanstack/react-query";
import { ProductsTable } from "./table";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const Products = () => {
  const products = useQuery(findProductOptions());

  if (products.isLoading) {
    return <LoadingLogo className="mx-auto" />;
  }
  return (
    <div className="container mx-auto p-4 lg:px-0 flex flex-col gap-4">
      <Link
        href="/admin/products/new"
        className={cn(buttonVariants(), "w-fit ml-auto")}
      >
        <LuPlus />
        Add Product
      </Link>
      <ProductsTable products={products.data?.data?.data} />
    </div>
  );
};
