import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { S3Image } from "@/lib/types";
import { cn } from "@/lib/utils";

import styles from "../product-detail.module.css";

type DynamicProductImagesProps = {
  images: S3Image[];
  initialCoverIndex: number;
  productTitle: string;
};

const imageUrl = (image: S3Image) =>
  [image.endpoint, image.bucket, image.key].join("/");

const sampleNumber = (index: number) => String(index + 1).padStart(2, "0");

export const DynamicProductImages = ({
  images,
  initialCoverIndex,
  productTitle,
}: DynamicProductImagesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(initialCoverIndex);

  const syncActiveIndex = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(initialCoverIndex, true);
    api.on("select", syncActiveIndex);
    api.on("reInit", syncActiveIndex);

    return () => {
      api.off("select", syncActiveIndex);
      api.off("reInit", syncActiveIndex);
    };
  }, [api, initialCoverIndex, syncActiveIndex]);

  const selectImage = (index: number) => {
    api?.scrollTo(index);
  };

  if (images.length === 0) {
    return (
      <section
        className={cn(
          styles.galleryEntrance,
          "grid aspect-square place-items-center rounded-2xl border border-[var(--sample-rule)] bg-[var(--sample-sheet)]",
        )}
        aria-label="Product gallery"
      >
        <div className="px-8 text-center">
          <Image
            src="/images/delifunds.png"
            alt="Delifunds"
            width={132}
            height={132}
            className="mx-auto opacity-60 grayscale"
          />
          <p className="mt-4 font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Product image unavailable
          </p>
        </div>
      </section>
    );
  }

  const thumbnail = (image: S3Image, index: number) => {
    const isActive = activeIndex === index;

    return (
      <Button
        key={`${image.key}-${index}`}
        type="button"
        variant="outline"
        aria-label={`View product image ${index + 1} of ${images.length}`}
        aria-pressed={isActive}
        onClick={() => selectImage(index)}
        className={cn(
          "group relative size-18 shrink-0 overflow-hidden rounded-xl border-2 bg-[var(--sample-sheet)] p-1 shadow-none transition-[border-color,transform] hover:-translate-y-0.5 hover:bg-[var(--sample-sheet)] focus-visible:ring-[var(--sample-indigo)] sm:size-20 lg:size-full lg:max-h-24 motion-reduce:transform-none motion-reduce:transition-none",
          isActive
            ? "border-[var(--sample-indigo)]"
            : "border-[var(--sample-rule)]",
        )}
      >
        {/* Product image hosts are dynamic, so they cannot be allowlisted for next/image. */}
        <img
          src={imageUrl(image)}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          className="size-full rounded-md object-cover"
        />
        <span
          className={cn(
            "absolute right-1 bottom-1 min-w-6 rounded bg-[var(--sample-sheet)] px-1 py-0.5 font-mono text-[0.5625rem] font-bold leading-none shadow-sm",
            isActive
              ? "text-[var(--sample-indigo)]"
              : "text-muted-foreground",
          )}
        >
          {sampleNumber(index)}
        </span>
        {isActive ? (
          <span
            className="absolute top-0 left-0 h-5 w-1.5 bg-[var(--sample-mandarin)]"
            aria-hidden="true"
          />
        ) : null}
      </Button>
    );
  };

  return (
    <section
      className={cn(styles.galleryEntrance, "min-w-0")}
      aria-label="Product gallery"
    >
      <div className="grid gap-4 lg:grid-cols-[5.5rem_minmax(0,1fr)]">
        <div
          className="hidden content-start gap-3 lg:grid"
          aria-label="Choose a product image"
        >
          {images.map(thumbnail)}
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--sample-rule)] bg-[var(--sample-sheet)] shadow-[0_18px_50px_rgba(22,26,43,0.08)]">
          <Carousel
            setApi={setApi}
            opts={{ startIndex: initialCoverIndex }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {images.map((image, index) => (
                <CarouselItem key={`${image.key}-${index}`} className="pl-0">
                  <div className="aspect-square overflow-hidden bg-[var(--sample-paper)]">
                    {/* Product image hosts are dynamic, so they cannot be allowlisted for next/image. */}
                    <img
                      src={imageUrl(image)}
                      alt={`${productTitle}, product image ${index + 1} of ${images.length}`}
                      width={900}
                      height={900}
                      loading={index === initialCoverIndex ? "eager" : "lazy"}
                      className="size-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
              <span className="rounded-lg bg-[var(--sample-ink)] px-3 py-2 font-mono text-[0.625rem] font-semibold tracking-[0.14em] text-[var(--sample-paper)] shadow-sm">
                SAMPLE {sampleNumber(activeIndex)} / {sampleNumber(images.length - 1)}
              </span>
              <div className="pointer-events-auto flex gap-2">
                <CarouselPrevious className="static border-0 bg-[var(--sample-sheet)] text-[var(--sample-ink)] shadow-md hover:bg-[var(--sample-paper)]" />
                <CarouselNext className="static border-0 bg-[var(--sample-sheet)] text-[var(--sample-ink)] shadow-md hover:bg-[var(--sample-paper)]" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <div
        className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 lg:hidden"
        aria-label="Choose a product image"
      >
        {images.map(thumbnail)}
      </div>
    </section>
  );
};
