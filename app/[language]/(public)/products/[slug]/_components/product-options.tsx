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
  formatPriceAddition: (amountInMinorUnits: number) => string;
};

export const ProductOptions = ({
  options,
  productLanguage,
  selectedOptionValues,
  setSelectedOptionValues,
  formatPriceAddition,
}: ProductOptionsProps) => {
  if (options.length === 0) return null;

  return (
    <fieldset className="space-y-5 border-t border-[var(--sample-rule)] pt-6">
      <legend className="sr-only">Product options</legend>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-[var(--sample-indigo)] uppercase">
            Configure
          </p>
          <h2 className="mt-1 font-semibold">Choose product options</h2>
        </div>
        <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
          Required
        </span>
      </div>
      <div className="space-y-5">
        {options.map((option, optionIndex) => (
          <div
            key={`option_${optionIndex}`}
            className="space-y-2.5"
            role="group"
            aria-labelledby={`product-option-${optionIndex}`}
          >
            <p
              id={`product-option-${optionIndex}`}
              className="text-sm font-semibold capitalize"
            >
              {option[productLanguage]}
            </p>
            <div className="flex flex-wrap gap-2">
              {option.values.map((val, index) => (
                <Button
                  key={`val_${index}`}
                  type="button"
                  variant="outline"
                  aria-pressed={
                    selectedOptionValues[optionIndex]?.en === val.en
                  }
                  className={
                    selectedOptionValues[optionIndex]?.en === val.en
                      ? "h-auto min-h-10 border-[var(--sample-indigo)] bg-[var(--sample-indigo)] px-3 py-2 text-white shadow-none hover:bg-[var(--sample-indigo)]/90 hover:text-white dark:text-[#11131a]"
                      : "h-auto min-h-10 border-[var(--sample-rule)] bg-transparent px-3 py-2 shadow-none hover:border-[var(--sample-indigo)] hover:bg-[var(--sample-indigo)]/5"
                  }
                  onClick={() => {
                    setSelectedOptionValues((currentValues) => ({
                      ...currentValues,
                      [optionIndex]: val,
                    }));
                  }}
                >
                  <span>{val[productLanguage]}</span>
                  {val.price_addition > 0 ? (
                    <span className="font-mono text-[0.625rem] opacity-75">
                      +{formatPriceAddition(val.price_addition)}
                    </span>
                  ) : null}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
