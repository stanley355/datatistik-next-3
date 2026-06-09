import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const VerifyEmailSuccess = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>EMAIL VERIFIED SUCCESSFULLY</CardTitle>
        <CardDescription>Please login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href="/auth/login"
          className={cn(buttonVariants(), "w-full max-w-48")}
        >
          LOGIN
        </Link>
      </CardContent>
    </Card>
  );
};
