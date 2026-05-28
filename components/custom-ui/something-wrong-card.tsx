import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const SomethingWrongCard = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-96">
      <Image
        alt="Delifunds"
        src="/images/delifunds.png"
        width={165}
        height={165}
      />

      <p className="text-muted-foreground font-mono">Something went wrong</p>
      <p className="text-xl font-bold font-sans">Sorry for the inconvenience</p>

      <Link className={cn(buttonVariants(), "mx-auto")} href="/">
        Back Home
      </Link>
    </div>
  );
};
