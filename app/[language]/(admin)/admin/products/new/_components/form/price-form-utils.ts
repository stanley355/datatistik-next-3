const idrNumberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

export function formatIdr(amount: number): string {
  return idrNumberFormatter.format(amount);
}
