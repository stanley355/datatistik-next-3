import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CartJoinProduct } from "@/lib/api";
import { Cart } from "@/lib/types";
import { CURRENCIES } from "@/lib/types/currencies";
import { LANGUAGES } from "@/lib/types/languages";
import { rmbToIdr } from "@/lib/utils";
import { useMemo } from "react";

type CartProductProps = {
  cartJoinProduct: CartJoinProduct;
  productLanguage: (typeof LANGUAGES)[number];
  currency: (typeof CURRENCIES)[number];
  onCheckedChange: (c: boolean) => void;
};

export const CartProduct = ({
  cartJoinProduct,
  productLanguage,
  currency,
  onCheckedChange,
}: CartProductProps) => {
  const cartImage = cartJoinProduct[1].image_urls;
  const coverImage = [
    cartImage[0].endpoint,
    cartImage[0].bucket,
    cartImage[0].key,
  ].join("/");

  const price = useMemo(() => {
    const values = cartJoinProduct[0].options.map((o) => o.value);
    const basePrice = cartJoinProduct[1].price;
    const optionValuesPrice =
      values.length > 0
        ? values.map((val) => val.price_addition ?? 0).reduce((a, b) => a + b)
        : 0;
    const finalPrice = basePrice + optionValuesPrice;

    if (currency === "IDR") {
      return rmbToIdr(finalPrice / 100);
    }
    return `RMB${finalPrice.toLocaleString("zh-CN")}`;
  }, [currency, cartJoinProduct]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-4 border-b">
        <p className="text-lg font-bold">
          {cartJoinProduct[1].title[productLanguage]}
        </p>
        <Checkbox
          className="size-6 ml-auto"
          onCheckedChange={onCheckedChange}
        />
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        <div>
          <img
            src={coverImage}
            alt={cartJoinProduct[1].title[productLanguage]}
            width={100}
            height={100}
            className="object-cover aspect-square"
          />
        </div>
        <div className="flex flex-col justify-between">
          <ul className="text-xs flex flex-col gap-1">
            {cartJoinProduct[0].options.map((o) => (
              <li
                key={`${o[productLanguage]}`}
                className="flex items-center gap-4"
              >
                <span className="w-24 uppercase">{o[productLanguage]}:</span>
                <span>{o.value[productLanguage]}</span>
              </li>
            ))}
          </ul>

          <p className="text-lg text-primary font-semibold">{price}</p>
        </div>
      </CardContent>
    </Card>
  );
};
