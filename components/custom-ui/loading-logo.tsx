import { cn } from "@/lib/utils";
import Image from "next/image";

type LoadingLogoProps = {
  className?: string;
};

export const LoadingLogo = ({ className }: LoadingLogoProps) => {
  return (
    <Image
      alt="Delifunds"
      src="/images/delifunds.png"
      width={165}
      height={165}
      className={cn("aspect-square animate-pulse", className)}
    />
  );
};
