import { LANGUAGES } from "@/lib/types/languages";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type LanguageType = (typeof LANGUAGES)[number];

type UseLanguageReturn = {
  language: LanguageType;
  setLanguage: (newLanguage: LanguageType) => void;
  productLanguage: LanguageType;
  setProductLanguage: (newLanguage: LanguageType) => void;
};

export const useLanguage = (): UseLanguageReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const [_, languagePath] = pathname.split("/");
  const currentLanguage = languagePath as LanguageType;

  // 1. Determine the base/fallback language from the URL
  const defaultLanguage: LanguageType = LANGUAGES.includes(currentLanguage)
    ? currentLanguage
    : "id";

  // 2. Initialize state using a lazy initializer function.
  const [productLanguage, setProductLanguageState] = useState<LanguageType>(
    () => {
      if (typeof window !== "undefined") {
        const storedLanguage = localStorage.getItem(
          "productLanguage",
        ) as LanguageType;
        if (storedLanguage && LANGUAGES.includes(storedLanguage)) {
          return storedLanguage;
        }
      }
      return defaultLanguage;
    },
  );

  // 3. Sync localStorage changes (cross-tab and same-page)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      let newValue: string | null = null;

      // Handle standard cross-tab storage event
      if (event instanceof StorageEvent) {
        if (event.key !== "productLanguage") return;
        newValue = event.newValue;
      }
      // Handle same-tab custom event
      else {
        newValue = event.detail;
      }

      if (newValue && LANGUAGES.includes(newValue as LanguageType)) {
        setProductLanguageState(newValue as LanguageType);
      }
    };

    // Listen to cross-tab updates
    window.addEventListener("storage", handleStorageChange);
    // Listen to same-tab updates
    window.addEventListener(
      "local-storage-productLanguage",
      handleStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "local-storage-productLanguage",
        handleStorageChange as EventListener,
      );
    };
  }, []);

  // 4. Setter function that updates state, localStorage, and dispatches the custom event
  const setProductLanguage = (newLanguage: LanguageType) => {
    setProductLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("productLanguage", newLanguage);

      // Dispatch custom event so other components on the SAME page update instantly
      const event = new CustomEvent("local-storage-productLanguage", {
        detail: newLanguage,
      });
      window.dispatchEvent(event);
    }
  };

  const setLanguage = (newLanguage: LanguageType) => {
    const newPathname = pathname.split("/");
    if (LANGUAGES.includes(currentLanguage)) {
      newPathname.splice(1, 1, newLanguage);
      router.push(newPathname.join("/"));
      return;
    }
    newPathname.splice(1, 1, "id");
    router.push(newPathname.join("/"));
    return;
  };

  return {
    language: defaultLanguage,
    setLanguage,
    productLanguage,
    setProductLanguage,
  };
};
