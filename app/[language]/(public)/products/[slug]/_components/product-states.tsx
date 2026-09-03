import Link from "next/link";
import { LuPackageOpen, LuRefreshCw } from "react-icons/lu";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ProductStateMessageProps = {
  isRetrying?: boolean;
  kind: "error" | "not-found";
  onRetry?: () => void;
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-[90rem] px-4 pt-8 pb-24 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(22rem,2fr)] xl:gap-10">
        <div className="grid gap-4 lg:grid-cols-[5.5rem_minmax(0,1fr)]">
          <div className="hidden space-y-3 lg:block">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="aspect-square w-full rounded-2xl" />
        </div>
        <div className="space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-10 w-40" />
          <div className="space-y-3 border-t border-border pt-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-5/6" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};

export const ProductStateMessage = ({
  isRetrying = false,
  kind,
  onRetry,
}: ProductStateMessageProps) => {
  const isError = kind === "error";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-20">
      <section className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          {isError ? (
            <LuRefreshCw className="size-6" aria-hidden="true" />
          ) : (
            <LuPackageOpen className="size-6" aria-hidden="true" />
          )}
        </span>
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {isError ? "Catalog unavailable" : "Product not found"}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          {isError
            ? "We could not load this product."
            : "This catalog item is no longer available."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {isError
            ? "Try loading it again, or return to the catalog to keep browsing."
            : "Return to the catalog to find another item for your order."}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {isError ? (
            <Button
              type="button"
              variant="outline"
              disabled={isRetrying}
              className="h-11 px-5"
              onClick={onRetry}
            >
              <LuRefreshCw
                className={cn(isRetrying ? "animate-spin" : undefined)}
              />
              {isRetrying ? "Trying again…" : "Try again"}
            </Button>
          ) : null}
          <Link
            href="/products"
            className={cn(
              buttonVariants(),
              "h-11 bg-primary px-5 text-primary-foreground hover:bg-primary/90",
            )}
          >
            Browse catalog
          </Link>
        </div>
      </section>
    </div>
  );
};
