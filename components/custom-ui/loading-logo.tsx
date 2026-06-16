import { cn } from "@/lib/utils";
import Image from "next/image";

type LoadingLogoProps = {
  className?: string;
};

export const LoadingLogo = ({ className }: LoadingLogoProps) => {
  return (
    <div
      className={cn(
        "w-full min-h-96 flex items-center justify-center",
        className,
      )}
    >
      <Image
        alt="Delifunds"
        src="/images/delifunds.png"
        width={165}
        height={165}
        className={cn("aspect-square animate-pulse")}
      />
    </div>
  );
};
