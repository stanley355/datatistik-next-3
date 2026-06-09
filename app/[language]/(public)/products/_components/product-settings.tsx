"use client";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import { CURRENCIES } from "@/lib/types/currencies";
import { LANGUAGES } from "@/lib/types/languages";

export const ProductSettings = () => {
  const { productLanguage, setProductLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="grid grid-cols-2 max-w-96 gap-4">
      <NativeSelect
        defaultValue={currency}
        className="w-full"
        onChange={(e) =>
          setCurrency(e.target.value as (typeof CURRENCIES)[number])
        }
      >
        {CURRENCIES.map((currency) => (
          <NativeSelectOption key={currency} value={currency}>
            CURRENCY: {currency}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <NativeSelect
        defaultValue={productLanguage}
        className="w-full "
        onChange={(e) =>
          setProductLanguage(e.target.value as (typeof LANGUAGES)[number])
        }
      >
        {LANGUAGES.map((lang) => (
          <NativeSelectOption key={lang} value={lang}>
            NAME: {lang.toUpperCase()}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};
