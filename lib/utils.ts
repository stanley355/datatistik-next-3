import { clsx, type ClassValue } from "clsx";
import { addHours } from "date-fns";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToAsiaJakartaTime = (date: string) => {
  const baseDate = new Date(date);
  const jakartaDate = addHours(baseDate, 7);

  return format(jakartaDate, "yyyy-MM-dd HH:mm");
};
