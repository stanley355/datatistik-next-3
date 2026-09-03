import type { CURRENCIES } from "@/lib/types/currencies";

type Currency = (typeof CURRENCIES)[number];

type FormatProductPriceParams = {
  amountInMinorUnits: number;
  currency: Currency;
  localizedUnit?: string;
  formatIdr: (rmbAmount: number) => string;
};

export const normalizeCoverIndex = (
  coverNumber: number | undefined,
  imageCount: number,
) => {
  if (imageCount <= 0 || !coverNumber) return 0;

  return Math.min(Math.max(coverNumber - 1, 0), imageCount - 1);
};

export const formatProductPrice = ({
  amountInMinorUnits,
  currency,
  localizedUnit,
  formatIdr,
}: FormatProductPriceParams) => {
  const rmbAmount = amountInMinorUnits / 100;
  const formattedAmount =
    currency === "IDR"
      ? formatIdr(rmbAmount)
      : `RMB${rmbAmount.toLocaleString("zh-CN", {
          maximumFractionDigits: 2,
        })}`;
  const unit = localizedUnit?.trim();

  return unit ? `${formattedAmount} / ${unit}` : formattedAmount;
};
