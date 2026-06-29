import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CartJoinProduct } from "@/lib/api";
import { Cart } from "@/lib/types";
import { CURRENCIES } from "@/lib/types/currencies";
import { LANGUAGES } from "@/lib/types/languages";
import { rmbToIdr } from "@/lib/utils";
import { useMemo, useOptimistic, useState } from "react";
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";

type CartProductProps = {
  cartJoinProduct: CartJoinProduct;
  productLanguage: (typeof LANGUAGES)[number];
  currency: (typeof CURRENCIES)[number];
  onCheckedChange: (c: boolean) => void;
  onRemoveClick: (cartId: string) => void;
  onUpdateAmount: (cartId: string, newAmount: number) => void;
};

export const CartProduct = ({
  cartJoinProduct,
  productLanguage,
  currency,
  onCheckedChange,
  onRemoveClick,
  onUpdateAmount,
}: CartProductProps) => {
  const [quantity, setQuantity] = useState(cartJoinProduct[0].amount);
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
      return rmbToIdr((finalPrice * quantity) / 100);
    }
    return `RMB${(finalPrice * quantity).toLocaleString("zh-CN")}`;
  }, [currency, cartJoinProduct, quantity]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4 border-b ">
        <p className="text-lg font-bold">
          {cartJoinProduct[1].title[productLanguage]}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveClick(cartJoinProduct[0].id)}
        >
          <LuTrash2 />
        </Button>
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
        <ul className="text-xs flex flex-col gap-1">
          {cartJoinProduct[0].options.map((o) => (
            <li
              key={`${o[productLanguage]}`}
              className="flex items-center gap-4"
            >
              <span className="w-20 uppercase">{o[productLanguage]}:</span>
              <span>{o.value[productLanguage]}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              disabled={quantity <= 1}
              onClick={() => {
                setQuantity((q) => q - 1);
                onUpdateAmount(cartJoinProduct[0].id, quantity - 1);
              }}
            >
              <LuMinus />
            </Button>
            <span>{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setQuantity((q) => q + 1);
                onUpdateAmount(cartJoinProduct[0].id, quantity + 1);
              }}
            >
              <LuPlus />
            </Button>
          </div>
          <p className="text-lg text-primary font-semibold">{price}</p>
        </div>
        <Checkbox
          className="size-6 ml-auto border-primary"
          onCheckedChange={onCheckedChange}
        />
      </CardFooter>
    </Card>
  );
};
