"use client";

import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { buttonVariants } from "@/components/ui/button";
import { findProductByIdOptions } from "@/hooks/products";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ProductSettings } from "../../_components";
import { DynamicProductImages } from "./images";
import { DynamicProductDetails } from "./details";
import { ProductDescription } from "./product-description";
import { authGetSessionOptions } from "@/hooks/auth";

const ProductNotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-4">
      <Image
        src="/images/delifunds.png"
        alt="Product Not Found"
        width={165}
        height={165}
        className={cn("aspect-square object-cover")}
      />

      <p className="text-xl font-bold">Product Not Found</p>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Back Home
        </Link>

        <Link href="/products" className={cn(buttonVariants({}))}>
          Products
        </Link>
      </div>
    </div>
  );
};

type DynamicProductProps = {
  id: number;
};

export const DynamicProduct = ({ id }: DynamicProductProps) => {
  const session = useQuery(authGetSessionOptions());
  const product = useQuery(findProductByIdOptions(id));
  if (product.isLoading) {
    return <LoadingLogo />;
  }

  if (!product.data || !product.data.data) {
    return <ProductNotFound />;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:grid grid-cols-2 gap-4 lg:py-4">
        <DynamicProductImages
          coverIndex={2}
          images={product.data.data.image_urls}
        />
        <div className="p-4 flex flex-col gap-4">
          <ProductSettings />
          <DynamicProductDetails
            session={session.data}
            product={product.data.data}
          />
        </div>
      </div>

      <ProductDescription
        className="hidden lg:flex"
        description={product.data.data.description}
      />
    </div>
  );
};
