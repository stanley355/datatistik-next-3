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
import { EmptyCart } from "./empty";

export const Carts = () => {
  return (
    <div className="container mx-auto min-h-screen flex items-start justify-center mt-16 p-4">
      <EmptyCart />
    </div>
  );
};
