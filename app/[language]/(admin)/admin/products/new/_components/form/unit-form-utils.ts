import type { ProductLocalization } from "@/lib/types";

export const getUnitFormValue = (
  localization: ProductLocalization | undefined,
): ProductLocalization => ({
  cn: localization?.cn ?? "",
  en: localization?.en ?? "",
  id: localization?.id ?? "",
});

export const normalizeOptionalLocalization = (
  localization: ProductLocalization | undefined,
): ProductLocalization | undefined => {
  if (!localization) return undefined;

  const normalized = {
    cn: localization.cn.trim(),
    en: localization.en.trim(),
    id: localization.id.trim(),
  };
  const values = Object.values(normalized);

  if (values.every((value) => !value)) return undefined;

  if (values.some((value) => !value)) {
    throw new Error("Unit requires Chinese, English, and Indonesian values");
  }

  return normalized;
};
