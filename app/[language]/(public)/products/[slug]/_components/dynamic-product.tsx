"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

import { authGetSessionOptions } from "@/hooks/auth";
import { useLanguage } from "@/hooks/language";
import { findProductByIdOptions } from "@/hooks/products";
import { cn } from "@/lib/utils";

import { ProductSettings } from "../../_components";
import styles from "../product-detail.module.css";
import { DynamicProductDetails } from "./details";
import { DynamicProductImages } from "./images";
import { ProductDescription } from "./product-description";
import { normalizeCoverIndex } from "./product-detail-utils";
import {
  ProductDetailSkeleton,
  ProductStateMessage,
} from "./product-states";

type DynamicProductProps = {
  id: number;
};

export const DynamicProduct = ({ id }: DynamicProductProps) => {
  const session = useQuery(authGetSessionOptions());
  const product = useQuery(findProductByIdOptions(id));
  const { productLanguage } = useLanguage();

  if (product.isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (product.isError) {
    return (
      <ProductStateMessage
        kind="error"
        isRetrying={product.isFetching}
        onRetry={() => product.refetch()}
      />
    );
  }

  if (!product.data?.data) {
    return <ProductStateMessage kind="not-found" />;
  }

  const productData = product.data.data;
  const productTitle = productData.title[productLanguage];
  const initialCoverIndex = normalizeCoverIndex(
    productData.image_cover_number,
    productData.image_urls.length,
  );

  return (
    <div className="mx-auto max-w-[90rem] px-4 pt-7 pb-24 sm:px-6 lg:px-8 lg:pt-9">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--sample-rule)] pb-4">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--sample-indigo)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sample-indigo)] motion-reduce:transition-none"
        >
          <LuArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
            aria-hidden="true"
          />
          Wholesale catalog
        </Link>
        <p className="font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Ref. DF-{String(productData.id).padStart(5, "0")}
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(22rem,2fr)] xl:gap-10">
        <DynamicProductImages
          images={productData.image_urls}
          initialCoverIndex={initialCoverIndex}
          productTitle={productTitle}
        />

        <aside
          className={cn(
            styles.orderEntrance,
            "overflow-hidden rounded-2xl border border-[var(--sample-rule)] bg-[var(--sample-sheet)] shadow-[0_18px_50px_rgba(22,26,43,0.07)] lg:sticky lg:top-20",
          )}
          aria-label="Build your order"
        >
          <div className="border-b border-[var(--sample-rule)] bg-[var(--sample-paper)] px-5 py-4 sm:px-7">
            <ProductSettings className="max-w-none gap-3" />
          </div>
          <div className="p-5 sm:p-7">
            <DynamicProductDetails
              isSessionLoading={session.isLoading}
              session={session.data}
              product={productData}
              productLanguage={productLanguage}
            />
          </div>
        </aside>
      </div>

      <ProductDescription
        className="mt-6 lg:mt-10"
        description={productData.description}
        productLanguage={productLanguage}
      />
    </div>
  );
};
