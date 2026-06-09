import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import { Product } from "@/lib/types";
import { rmbToIdr } from "@/lib/utils";

type DynamicProductDetailsProps = {
  product: Product;
};

export const DynamicProductDetails = ({
  product,
}: DynamicProductDetailsProps) => {
  const { productLanguage } = useLanguage();
  const { currency } = useCurrency();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg text-primary font-semibold">
        {currency === "IDR"
          ? rmbToIdr(product.price / 100)
          : `RMB${product.price.toLocaleString("zh-CN")}`}
      </p>
      <h1 className="text-xl font-bold">{product.title[productLanguage]}</h1>
      <p>{product.description[productLanguage]}</p>

      <div className="flex flex-col gap-2">
        <p>Options:</p>
        {product.options.map((option, optionIndex) => (
          <div
            key={`option_${optionIndex}`}
            className="flex items-center gap-4"
          >
            <p>{option[productLanguage]}</p>
            <span className="flex items-center gap-4">
              {option.values.map((val, index) => (
                <Button key={`val_${index}`} variant="outline">
                  {val[productLanguage]}
                </Button>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
