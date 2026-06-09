import { CURRENCIES } from "@/lib/types/currencies";
import { useState, useEffect } from "react";

type Currency = (typeof CURRENCIES)[number];

type UseCurrencyReturn = {
  currency: Currency;
  setCurrency: (newCurrency: Currency) => void;
};

export const useCurrency = (): UseCurrencyReturn => {
  // 1. Initialize state safely with lazy initializer
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("currency") as Currency;
      if (storedCurrency && CURRENCIES.includes(storedCurrency)) {
        return storedCurrency;
      }
    }
    return "IDR";
  });

  // 2. Listen for changes from other tabs AND the current tab
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      let newValue: string | null = null;

      // Handle standard cross-tab storage event
      if (event instanceof StorageEvent) {
        if (event.key !== "currency") return;
        newValue = event.newValue;
      }
      // Handle same-tab custom event
      else {
        newValue = event.detail;
      }

      if (newValue && CURRENCIES.includes(newValue as Currency)) {
        setCurrencyState(newValue as Currency);
      }
    };

    // Listen to cross-tab updates
    window.addEventListener("storage", handleStorageChange);
    // Listen to same-tab updates
    window.addEventListener(
      "local-storage-currency",
      handleStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "local-storage-currency",
        handleStorageChange as EventListener,
      );
    };
  }, []);

  // 3. Updated setter that alerts the rest of the app
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", newCurrency);

      // Dispatch custom event so other components on the SAME page update instantly
      const event = new CustomEvent("local-storage-currency", {
        detail: newCurrency,
      });
      window.dispatchEvent(event);
    }
  };

  return {
    currency,
    setCurrency,
  };
};
