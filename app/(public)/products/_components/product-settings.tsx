"use client";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useProducts } from "../_hooks/use-products";

export const ProductSettings = () => {
  const { setCurrency, setLanguage } = useProducts();
  return (
    <div className="grid grid-cols-2 max-w-96 gap-4">
      <NativeSelect
        defaultValue="EN"
        onChange={(e) => setLanguage(e.target.value as "CN" | "EN")}
        className="w-full"
      >
        <NativeSelectOption value="CN">Language: CN</NativeSelectOption>
        <NativeSelectOption value="EN">Language: EN</NativeSelectOption>
      </NativeSelect>
      <NativeSelect
        defaultValue="RMB"
        onChange={(e) => setCurrency(e.target.value as "RMB" | "IDR")}
        className="w-full"
      >
        <NativeSelectOption value="RMB">Currency: RMB</NativeSelectOption>
        <NativeSelectOption value="IDR">Currency: IDR</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
