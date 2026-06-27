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
import { LuShoppingCart } from "react-icons/lu";

export const EmptyCart = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <LuShoppingCart className="text-9xl mb-4" />
        <CardTitle>Your shopping cart is empty</CardTitle>
        <CardDescription>Browse products to find more</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          See Products
        </Link>
      </CardContent>
    </Card>
  );
};
