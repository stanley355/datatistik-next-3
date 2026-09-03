import { DynamicProduct } from "./_components";
import { Barlow_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
import styles from "./product-detail.module.css";

const productDisplay = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-product-display",
  weight: ["600", "700"],
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const [productId] = slug.split("-");
  return (
    <div
      className={cn(
        styles.sampleSurface,
        productDisplay.variable,
        "mt-12",
      )}
    >
      <DynamicProduct id={parseInt(productId)} />
    </div>
  );
}
