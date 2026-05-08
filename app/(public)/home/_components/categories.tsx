"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";
import { createUserSearch } from "@/lib/api/user_search";
import { CATEGORIES } from "@/lib/constant/categories";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Categories = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>CATEGORIES</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-11">
        {CATEGORIES.map((cat) => (
          <Link
            title={cat.label}
            href="/products"
            key={cat.label}
            className="items-stretch flex flex-col w-fit shadow"
            onClick={() => onLinkClick(`category: ${cat.label}`)}
          >
            <img
              src={cat.src}
              title={cat.label}
              alt={cat.label}
              className="w-full aspect-square"
            />

            <p className="text-center">{cat.label}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
