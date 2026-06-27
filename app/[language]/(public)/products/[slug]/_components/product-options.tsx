import { Button } from "@/components/ui/button";
import { ProductOption, ProductOptionValue } from "@/lib/types";
import { LANGUAGES } from "@/lib/types/languages";
import { Dispatch, SetStateAction } from "react";

type SelectedOptionValues = Record<number, ProductOptionValue>;
type ProductOptionsProps = {
  options: ProductOption[];
  productLanguage: (typeof LANGUAGES)[number];
  selectedOptionValues: SelectedOptionValues;
  setSelectedOptionValues: Dispatch<SetStateAction<SelectedOptionValues>>;
};

export const ProductOptions = ({
  options,
  productLanguage,
  selectedOptionValues,
  setSelectedOptionValues,
}: ProductOptionsProps) => {
  return (
    <div>
      <p className="underline">Product Options:</p>
      <div className="flex flex-col gap-4 my-4">
        {options.map((option, optionIndex) => (
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
    </div>
  );
};
