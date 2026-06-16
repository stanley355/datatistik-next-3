import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrency } from "@/hooks/currency";
import { useLanguage } from "@/hooks/language";
import { Product } from "@/lib/types";
import { rmbToIdr } from "@/lib/utils";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
  onLinkClick: (title: string) => void;
};

export const ProductCard = ({ product, onLinkClick }: ProductCardProps) => {
  const { productLanguage } = useLanguage();
  const { currency } = useCurrency();
  const title = product.title[productLanguage];
  const coverImage = product.image_urls[product.image_cover_number];
  return (
    <Link
      title={title}
      href={`/products/${product.id}-${title.replaceAll(" ", "-")}`}
      onClick={() => onLinkClick(title)}
    >
      <Card>
        <CardContent>
          <img
            alt={title}
            src={[coverImage.endpoint, coverImage.bucket, coverImage.key].join(
              "/",
            )}
            width={400}
            height={400}
            className="object-center aspect-square"
          />
        </CardContent>
        <CardHeader>
          <p className="font-medium">{title}</p>
          <p className="text-primary font-bold text-lg">
            {currency === "RMB"
              ? `RMB${product.price / 100}`
              : rmbToIdr(product.price / 100)}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
};
