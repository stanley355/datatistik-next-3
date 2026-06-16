"use client";
import { useQuery } from "@tanstack/react-query";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { createUserSearch } from "@/lib/api/user_search";
import { findProductOptions } from "@/hooks/products";
import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const session = useQuery(authGetSessionOptions());
  const products = useQuery(findProductOptions({ is_available: true }));

  const onLinkClick = async (keyword: string) => {
    try {
      if (session.data && !isAuthError(session.data) && session?.data.user) {
        createUserSearch(keyword, session?.data.user.id);
      } else {
        createUserSearch(keyword);
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };

  if (products.isLoading) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <LoadingLogo
            key={`loading_${index}`}
            className="border rounded min-h-48"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4">
      {products.data?.data?.data.map((prod) => (
        <ProductCard
          key={`product_${prod.id}`}
          product={prod}
          onLinkClick={onLinkClick}
        />
      ))}
    </div>
  );
};
