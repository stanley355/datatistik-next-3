import { clsx, type ClassValue } from "clsx";
import { addHours } from "date-fns";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { env } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToAsiaJakartaTime = (date: string) => {
  const baseDate = new Date(date);
  const jakartaDate = addHours(baseDate, 7);

  return format(jakartaDate, "yyyy-MM-dd HH:mm");
};

const rmbToIdr = (price: number) => {
  const idrPrice = price * env.NEXT_PUBLIC_RMB_IDR;
  return idrPrice.toLocaleString("id-ID");
};
