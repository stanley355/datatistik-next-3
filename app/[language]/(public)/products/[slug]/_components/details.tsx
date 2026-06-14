import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import { Product, ProductOptionValue } from "@/lib/types";
import { rmbToIdr } from "@/lib/utils";
import { useMemo, useState } from "react";

type DynamicProductDetailsProps = {
  product: Product;
};

export const DynamicProductDetails = ({
  product,
}: DynamicProductDetailsProps) => {
  const { productLanguage } = useLanguage();
  const { currency } = useCurrency();
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    Record<number, ProductOptionValue>
  >({});

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

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg text-primary font-semibold">{price}</p>
      <h1 className="text-xl font-bold">{product.title[productLanguage]}</h1>

      <div className="flex flex-col gap-4 my-4">
        {product.options.map((option, optionIndex) => (
          <div
            key={`option_${optionIndex}`}
            className="flex items-center gap-4"
          >
            <p className="capitalize min-w-24">{option[productLanguage]}:</p>
            <span className="flex flex-wrap gap-4">
              {option.values.map((val, index) => (
                <Button
                  key={`val_${index}`}
                  variant={
                    selectedOptionValues[optionIndex] &&
                    selectedOptionValues[optionIndex].en === val.en
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    const newVal = { ...selectedOptionValues };
                    newVal[optionIndex] = val;
                    setSelectedOptionValues(newVal);
                  }}
                >
                  {val[productLanguage]}
                </Button>
              ))}
            </span>
          </div>
        ))}
      </div>

      <p className="whitespace-pre-wrap">
        {product.description[productLanguage]}
      </p>
    </div>
  );
};
