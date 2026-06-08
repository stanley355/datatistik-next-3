import { LANGUAGES } from "@/lib/types/languages";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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

  // 3. Setter function that updates both state and localStorage
  const setProductLanguage = (newLanguage: LanguageType) => {
    setProductLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("productLanguage", newLanguage);
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
