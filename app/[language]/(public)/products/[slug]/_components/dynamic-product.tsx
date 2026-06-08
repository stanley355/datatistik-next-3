"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/language";

export const DynamicProduct = () => {
  const { setLanguage } = useLanguage();
  return (
    <div>
      <Button onClick={() => setLanguage("id")}>hai</Button>
    </div>
  );
};
