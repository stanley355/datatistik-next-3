"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuArrowLeft, LuLoaderCircle, LuPackagePlus, LuSave } from "react-icons/lu";
import { toast } from "sonner";
import type z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

import { FormSection } from "./form-section";
import { ImageForm } from "./image-form";
import { LocalizationForm } from "./localization-form";
import { OptionForm } from "./option-form";
import { PriceForm } from "./price-form";
import { productFormSchema } from "./schema";
import { getUnitFormValue } from "./unit-form-utils";

type ProductFormProps = {
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof productFormSchema>) => Promise<boolean>;
  resetAfterSuccess: boolean;
  product?: Product | null;
};

export const ProductForm = (props: ProductFormProps) => {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: {
        cn: props.product?.title.cn ?? "",
        en: props.product?.title.en ?? "",
        id: props.product?.title.id ?? "",
      },
      description: {
        cn: props.product?.description.cn ?? "",
        en: props.product?.description.en ?? "",
        id: props?.product?.description.id ?? "",
      },
      unit: getUnitFormValue(props.product?.unit),
      price: props.product?.price ? props.product.price / 100 : 0,
      source_url: props.product?.source_url ?? "",
      is_available: props.product?.is_available ?? true,
      options: props.product?.options
        ? props.product.options.map((opt) => ({
            ...opt,
            values: opt.values.map((val) => ({
              ...val,
              price_addition: val.price_addition / 100,
            })),
          }))
        : [],
      image_cover_number: props.product?.image_cover_number ?? 1,
      image_urls:
        props.product && props.product?.image_urls?.length > 0
          ? props.product.image_urls.map((url) =>
              [url.endpoint, url.bucket, url.key].join("/"),
            )
          : [],
    },
  });

  async function onSubmit(data: z.infer<typeof productFormSchema>) {
    if (data.image_cover_number > data.image_urls.length) {
      toast.error("Image cover number can't be bigger than total image count");
      return;
    }
    const product = await props.onSubmit(data);
    if (product && props.resetAfterSuccess) {
      form.reset();
    }
  }

  const isEditing = Boolean(props.product);
  const isBusy = props.isLoading || form.formState.isSubmitting;

  return (
    <form
      className="space-y-6 pb-10"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <div className="sticky top-0 z-20 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin/products"
              aria-label="Back to products"
              className={cn(
                buttonVariants({ size: "icon", variant: "outline" }),
                "shrink-0",
              )}
            >
              <LuArrowLeft />
            </Link>
            <div className="min-w-0">
              <p className="truncate font-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-primary uppercase">
                Product catalog
              </p>
              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {isEditing ? "Edit product" : "Create product"}
              </h1>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isBusy}>
            {isBusy ? (
              <LuLoaderCircle className="animate-spin motion-reduce:animate-none" />
            ) : isEditing ? (
              <LuSave />
            ) : (
              <LuPackagePlus />
            )}
            <span className="hidden sm:inline">
              {isBusy
                ? isEditing
                  ? "Saving changes"
                  : "Creating product"
                : isEditing
                  ? "Save changes"
                  : "Create product"}
            </span>
            <span className="sm:hidden">
              {isBusy ? "Saving" : isEditing ? "Save" : "Create"}
            </span>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.8fr)]">
        <div className="space-y-6">
          <FormSection
            eyebrow="Storefront copy"
            title="Translations"
            description="Write the product title and description in every storefront language. Keep details consistent across all three versions."
          >
            <LocalizationForm form={form} />
          </FormSection>

          <FormSection
            eyebrow="Variants"
            title="Product options"
            description="Add only the choices customers need, such as size or color. Each option value can adjust the base price."
          >
            <OptionForm form={form} />
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection
            eyebrow="Commercial"
            title="Price and availability"
            description="Set the RMB price, source reference, and whether customers can order this product."
          >
            <PriceForm form={form} />
          </FormSection>

          <FormSection
            eyebrow="Media"
            title="Product images"
            description="Upload images in storefront order, then choose the cover customers see first."
          >
            <ImageForm form={form} />
          </FormSection>
        </div>
      </div>
    </form>
  );
};
