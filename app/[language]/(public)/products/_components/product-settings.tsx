"use client";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import { CURRENCIES } from "@/lib/types/currencies";
import { LANGUAGES } from "@/lib/types/languages";

export const ProductSettings = () => {
  const { productLanguage, setProductLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const CURRENCY_OPTIONS = CURRENCIES.map((curr) => ({
    label: curr,
    value: curr,
  }));
  const LANGUAGE_OPTIONS = LANGUAGES.map((lang) => ({
    label: lang,
    value: lang,
  }));
  return (
    <div className="grid grid-cols-2 max-w-96 gap-4">
      <div className="flex flex-col gap-1">
        <Label>CURRENCY</Label>
        <Select
          value={currency}
          items={CURRENCY_OPTIONS}
          onValueChange={(curr) => {
            setCurrency(curr as (typeof CURRENCIES)[number]);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue className="text-xs" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency} value={currency} className="text-xs">
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>LANGUAGE</Label>
        <Select
          value={productLanguage}
          items={LANGUAGE_OPTIONS}
          onValueChange={(lang) => {
            setProductLanguage(lang as (typeof LANGUAGES)[number]);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue className="text-xs uppercase" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang} className="text-xs uppercase">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
