"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/language";

export const DynamicProduct = () => {
  const { setAppLanguage } = useLanguage();
  return (
    <div>
      <Button onClick={() => setAppLanguage("en")}>hai</Button>
    </div>
  );
};
