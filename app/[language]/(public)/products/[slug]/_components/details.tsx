import { useQueryClient } from "@tanstack/react-query";
import { sendGAEvent } from "@next/third-parties/google";
import { useCallback, useMemo, useState } from "react";
import {
  LuMinus,
  LuPackageCheck,
  LuPlus,
  LuShoppingCart,
} from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { findCartByUserOptions } from "@/hooks/carts";
import { useCurrency } from "@/hooks/currency";
import { authGetSession, isAuthError } from "@/lib/api";
import { createCart } from "@/lib/api/carts";
import type { Product, ProductOptionValue } from "@/lib/types";
import { LANGUAGES } from "@/lib/types/languages";
import { rmbToIdr } from "@/lib/utils";
import { useRouter } from "next/navigation";

import styles from "../product-detail.module.css";
import { formatProductPrice } from "./product-detail-utils";
import { ProductOptions } from "./product-options";

type DynamicProductDetailsProps = {
  isSessionLoading: boolean;
  product: Product;
  productLanguage: (typeof LANGUAGES)[number];
  session: Awaited<ReturnType<typeof authGetSession>>;
};

export const DynamicProductDetails = ({
  isSessionLoading,
  product,
  productLanguage,
  session,
}: DynamicProductDetailsProps) => {
  const router = useRouter();
  const { currency } = useCurrency();
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    Record<number, ProductOptionValue>
  >({});
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const selectedCount = Object.keys(selectedOptionValues).length;
  const remainingOptionCount = Math.max(
    product.options.length - selectedCount,
    0,
  );
  const totalMinorUnits = useMemo(
    () =>
      product.price +
      Object.values(selectedOptionValues).reduce(
        (total, value) => total + (value.price_addition ?? 0),
        0,
      ),
    [product.price, selectedOptionValues],
  );

  const formatPrice = useCallback(
    (amountInMinorUnits: number, localizedUnit?: string) =>
      formatProductPrice({
        amountInMinorUnits,
        currency,
        localizedUnit,
        formatIdr: rmbToIdr,
      }),
    [currency],
  );

  const price = formatPrice(
    totalMinorUnits,
    product.unit?.[productLanguage],
  );

  const onAddClick = async () => {
    if (isSessionLoading) return;

    try {
      if (!isAuthError(session) && session?.user.id) {
        const hasEveryOption = product.options.every(
          (_, index) => selectedOptionValues[index],
        );

        if (!hasEveryOption) {
          toast.warning("Please select every product option");
          return;
        }

        const cartPayload: Parameters<typeof createCart>[0] = {
          user_id: session.user.id,
          product_id: product.id,
          amount: quantity,
          options: product.options.map((option, index) => ({
            id: option.id,
            en: option.en,
            cn: option.cn,
            value: selectedOptionValues[index],
          })),
        };
        const savedCart = await createCart(cartPayload);
        if (savedCart?.data?.id) {
          queryClient.invalidateQueries({
            queryKey: findCartByUserOptions(String(session.user.id)).queryKey,
          });
        }
        toast.success("Product added to cart");
        return;
      }

      toast.warning("Please login to continue!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-[var(--sample-indigo)] uppercase">
            Wholesale selection
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sample-indigo)]/10 px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--sample-indigo)]">
            <LuPackageCheck className="size-3.5" aria-hidden="true" />
            Available
          </span>
        </div>
        <h1
          className={`${styles.displayType} mt-4 text-4xl leading-[0.96] font-bold tracking-[-0.025em] text-balance sm:text-5xl`}
        >
          {product.title[productLanguage]}
        </h1>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--sample-rule)] pb-6">
          <div>
            <p className="text-xs text-muted-foreground">Current order price</p>
            <p
              className={`${styles.displayType} mt-1 text-3xl leading-none font-semibold tracking-tight text-[var(--sample-indigo)] sm:text-4xl`}
              aria-live="polite"
            >
              {price}
            </p>
          </div>
          {product.options.length > 0 ? (
            <p
              className="max-w-40 text-right text-xs leading-5 text-muted-foreground"
              aria-live="polite"
            >
              {remainingOptionCount === 0
                ? "All options selected"
                : `${remainingOptionCount} option ${remainingOptionCount === 1 ? "group" : "groups"} remaining`}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Ready to add</p>
          )}
        </div>
      </div>

      <ProductOptions
        productLanguage={productLanguage}
        options={product.options}
        selectedOptionValues={selectedOptionValues}
        setSelectedOptionValues={setSelectedOptionValues}
        formatPriceAddition={(amountInMinorUnits) =>
          formatPrice(amountInMinorUnits)
        }
      />

      <div className="space-y-3 border-t border-[var(--sample-rule)] pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Quantity</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Adjust the amount for this configuration.
            </p>
          </div>
          <div className="flex items-center rounded-xl border border-[var(--sample-rule)] bg-[var(--sample-paper)] p-1">
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              onClick={() => setQuantity((current) => current - 1)}
            >
              <LuMinus />
            </Button>
            <span
              className="min-w-10 text-center font-mono text-sm font-semibold tabular-nums"
              aria-live="polite"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label="Increase quantity"
              onClick={() => setQuantity((current) => current + 1)}
            >
              <LuPlus />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          disabled={isSessionLoading}
          className="mt-3 h-12 w-full bg-[var(--sample-mandarin)] px-5 text-sm font-semibold text-[#161a2b] shadow-none hover:bg-[var(--sample-mandarin)]/90 focus-visible:ring-[var(--sample-mandarin)]"
          onClick={() => {
            sendGAEvent(`add_to_cart_product_${product.id}`);
            onAddClick();
          }}
        >
          <LuShoppingCart />
          {isSessionLoading ? "Checking account…" : "Add to cart"}
        </Button>
        <p className="text-center text-[0.6875rem] leading-5 text-muted-foreground">
          Your selected options and quantity will be saved to your cart.
        </p>
      </div>
    </div>
  );
};
