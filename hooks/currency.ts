import { CURRENCIES } from "@/lib/types/currencies";
import { useState } from "react";

type Currency = (typeof CURRENCIES)[number];

type UseCurrencyReturn = {
  currency: Currency;
  setCurrency: (newCurrency: Currency) => void;
};

export const useCurrency = (): UseCurrencyReturn => {
  // 2. Initialize state using a lazy initializer function.
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("currency") as Currency;
      if (storedCurrency && CURRENCIES.includes(storedCurrency)) {
        return storedCurrency;
      }
    }
    return "IDR";
  });

  // 3. Setter function that updates both state and localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", newCurrency);
    }
  };

  return {
    currency,
    setCurrency,
  };
};
