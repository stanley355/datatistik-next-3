import { ProductLocalization } from "@/lib/types";
import { LANGUAGES } from "@/lib/types/languages";
import { cn } from "@/lib/utils";

type ProductDescriptionProps = {
  description: ProductLocalization;
  productLanguage: (typeof LANGUAGES)[number];
  className?: string;
};

export const ProductDescription = ({
  description,
  productLanguage,
  className,
}: ProductDescriptionProps) => {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card px-5 py-7 sm:px-8 sm:py-10",
        className,
      )}
      aria-labelledby="product-notes-title"
    >
      <div className="grid gap-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
        <div>
          <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-primary uppercase">
            Product notes
          </p>
          <h2 id="product-notes-title" className="mt-2 text-xl font-semibold">
            Before you order
          </h2>
        </div>
        <p className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-muted-foreground sm:text-base">
          {description[productLanguage]}
        </p>
      </div>
    </section>
  );
};
