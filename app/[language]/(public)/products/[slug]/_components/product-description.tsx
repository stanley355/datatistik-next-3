import { useLanguage } from "@/hooks/language";
import { ProductLocalization } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductDescriptionProps = {
  description: ProductLocalization;
  className?: string;
};

export const ProductDescription = ({
  description,
  className,
}: ProductDescriptionProps) => {
  const { productLanguage } = useLanguage();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h3 className="border-b">Description</h3>
      <p className={"whitespace-pre-wrap"}>{description[productLanguage]}</p>
    </div>
  );
};
