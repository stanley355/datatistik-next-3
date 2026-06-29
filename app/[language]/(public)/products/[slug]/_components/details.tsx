import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import type { Product, ProductOptionValue } from "@/lib/types";
import { rmbToIdr } from "@/lib/utils";
import { useMemo, useState } from "react";
import { ProductDescription } from "./product-description";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { sendGAEvent } from "@next/third-parties/google";
import { toast } from "sonner";
import { authGetSession, isAuthError } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ProductOptions } from "./product-options";
import { createCart } from "@/lib/api/carts";
import { useQueryClient } from "@tanstack/react-query";
import { findCartByUserOptions } from "@/hooks/carts";

type DynamicProductDetailsProps = {
  session: Awaited<ReturnType<typeof authGetSession>>;
  product: Product;
};

export const DynamicProductDetails = ({
  session,
  product,
}: DynamicProductDetailsProps) => {
  const router = useRouter();
  const { productLanguage } = useLanguage();
  const { currency } = useCurrency();
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    Record<number, ProductOptionValue>
  >({});
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  const price = useMemo(() => {
    const basePrice = product.price;
    const optionValuesPrice =
      Object.values(selectedOptionValues).length > 0
        ? Object.values(selectedOptionValues)
            .map((val) => val.price_addition ?? 0)
            .reduce((a, b) => a + b)
        : 0;
    const finalPrice = basePrice + optionValuesPrice;

    if (currency === "IDR") {
      return rmbToIdr(finalPrice / 100);
    }
    return `RMB${finalPrice.toLocaleString("zh-CN")}`;
  }, [currency, product.price, selectedOptionValues]);

  const onAddClick = async () => {
    try {
      if (!isAuthError(session) && session?.user.id) {
        const selectedOptions = Object.values(selectedOptionValues);
        if (selectedOptions.length !== product.options.length) {
          toast.warning("Please select product option");
          return;
        }
        const cartPayload: Parameters<typeof createCart>[0] = {
          user_id: session.user.id,
          product_id: product.id,
          amount: quantity,
          options: selectedOptions.map((val, index) => ({
            id: product.options[index].id,
            en: product.options[index].en,
            cn: product.options[index].cn,
            value: val,
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
      return;
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl text-primary font-semibold">{price}</p>
      <h1 className="text-lg font-bold mb-4">
        {product.title[productLanguage]}
      </h1>

      <ProductOptions
        productLanguage={productLanguage}
        options={product.options}
        selectedOptionValues={selectedOptionValues}
        setSelectedOptionValues={setSelectedOptionValues}
      />

      <div className="flex items-center gap-4 my-4">
        <p className="min-w-24">Quantity: </p>
        <div className="flex items-center gap-8 ">
          <Button
            size="icon"
            variant="outline"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
          >
            <LuMinus />
          </Button>
          <span>{quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <LuPlus />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:max-w-96">
        <Button
          variant="secondary"
          onClick={() => {
            sendGAEvent(`buy_product_${product.id}`);
          }}
        >
          <LuShoppingCart /> Buy
        </Button>
        <Button
          variant="default"
          onClick={() => {
            sendGAEvent(`add_to_cart_product_${product.id}`);
            onAddClick();
          }}
        >
          <LuShoppingCart /> Add to Cart
        </Button>
      </div>

      <ProductDescription
        className="lg:hidden"
        description={product.description}
      />
    </div>
  );
};
