"use client";
import { EmptyCart } from "./empty";
import { authGetSessionOptions } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { findCartByUserOptions } from "@/hooks/carts";
import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { isAuthError } from "@/lib/api";
import { useLanguage } from "@/hooks/language";
import { CartProduct } from "./cart-product";
import { useCurrency } from "@/hooks/currency";
import { Button } from "@/components/ui/button";
import { LuArrowLeft } from "react-icons/lu";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export const Carts = () => {
  const [selectedCart, setSelectedCart] = useState<string[]>([]);
  const { productLanguage } = useLanguage();
  const { currency } = useCurrency();
  const session = useQuery(authGetSessionOptions());
  const user = !isAuthError(session.data) ? session.data?.user : null;
  const cart = useQuery(
    findCartByUserOptions(String(user?.id), {
      enabled: !!user?.id,
    }),
  );
  if (session.isLoading || cart.isLoading) {
    return (
      <div className="container mx-auto min-h-screen flex items-start justify-center mt-16 p-4">
        <LoadingLogo />
      </div>
    );
  }

  if (cart.data?.data && cart?.data?.data?.data.length > 0) {
    const cartData = cart?.data?.data?.data;
    return (
      <div className="container mx-auto min-h-screen mt-16 p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon-lg">
            <LuArrowLeft />
          </Button>
          <h1 className="font-bold text-lg">CART</h1>
        </div>
        <div className="flex flex-col gap-4">
          {cartData.map((c) => (
            <CartProduct
              cartJoinProduct={c}
              key={c[0].id}
              productLanguage={productLanguage}
              currency={currency}
              onCheckedChange={(checked) => {
                const oldSet = [...selectedCart];
                if (checked) {
                  oldSet.push(c[0].id);
                  setSelectedCart(oldSet);
                } else {
                  const cartIndex = oldSet.indexOf(c[0].id);
                  oldSet.splice(cartIndex, 1);
                  setSelectedCart(oldSet);
                }
              }}
            />
          ))}
        </div>
        <div className="fixed  bg-card bottom-4  w-80 lg:w-96 shadow -translate-x-[50%] flex items-center justify-between left-[50%] rounded-full py-2 px-4">
          <span>{Array.from(selectedCart.values()).length} items chosen</span>

          <Button
            className="rounded-full"
            disabled={Array.from(selectedCart.values()).length === 0}
            onClick={() => sendGAEvent("cart_checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center mt-16 p-4">
      <EmptyCart />
    </div>
  );
};
