"use client";
import { TAOBAO_PRODUCTS } from "@/lib/constant/taobao-products";
import Link from "next/link";
import { useProducts } from "../_hooks/use-products";
import { useQuery } from "@tanstack/react-query";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { createUserSearch } from "@/lib/api/user_search";

const formatIdrPrice = (price: string) => {
  const idrPrice = parseInt(price) * 2000;
  return idrPrice.toLocaleString("id-ID");
};

export const ProductList = () => {
  const { language, currency } = useProducts();

  const session = useQuery(authGetSessionOptions());

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
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
      {TAOBAO_PRODUCTS.map((product) => (
        <Link
          key={product.id}
          href="/auth/login"
          onClick={() => onLinkClick(`product:${product.title_en}`)}
        >
          <img
            title={product.title_en}
            alt={product.title}
            src={product.image}
            className="w-full object-cover aspect-square rounded"
          />

          <div>
            <p className="text-sm">
              {language === "CN" ? product.title : product.title_en}
            </p>
            <p className="text-lg text-primary font-bold">
              {currency === "RMB"
                ? `RMB ${product.price}`
                : `IDR ${formatIdrPrice(product.price)}`}
            </p>
          </div>
        </Link>
      ))}
      <Link
        href="/auth/login"
        onClick={() => onLinkClick(`product:see_more`)}
        className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground rounded"
      >
        See More
      </Link>
    </div>
  );
};
