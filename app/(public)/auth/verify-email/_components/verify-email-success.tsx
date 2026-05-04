import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const VerifyEmailSuccess = () => {
  return (
    <div className="w-full ">
      <h1 className="font-mono font-bold text-lg">
        EMAIL VERIFIED SUCCESSFULLY
      </h1>
      <p className="mb-4">Please login to continue</p>

      <Link
        href="/auth/login"
        className={cn(buttonVariants(), "w-full max-w-96")}
      >
        LOGIN
      </Link>
    </div>
  );
};
