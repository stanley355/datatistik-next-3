import { useForm } from "react-hook-form";
import z from "zod";
import { productFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TitleForm } from "../../title-form";
import { DescriptionForm } from "./description-form";
import { PriceForm } from "./price-form";
import { OptionForm } from "./option-form";
import { ImageForm } from "./image-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuChevronLeft, LuSave } from "react-icons/lu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Product } from "@/lib/types";

type ProductForm = {
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof productFormSchema>) => Promise<boolean>;
  resetAfterSuccess: boolean;
  product?: Product | null;
};

export const ProductForm = (props: ProductForm) => {
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
      price: props.product?.price ?? 0,
      source_url: props.product?.source_url ?? "",
      is_available: props.product?.is_available ?? true,
      options: props.product?.options ?? [],
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

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
        >
          <LuChevronLeft />
        </Link>
        <Button
          className="flex-1 max-w-48"
          type="submit"
          disabled={props.isLoading}
        >
          <LuSave /> SAVE
        </Button>
      </div>
      <TitleForm form={form} />
      <DescriptionForm form={form} />
      <PriceForm form={form} />
      <ImageForm form={form} />
      <OptionForm form={form} />
    </form>
  );
};
