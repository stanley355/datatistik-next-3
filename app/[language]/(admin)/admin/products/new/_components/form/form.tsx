import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { PriceForm } from "./price-form";
import { OptionForm } from "./option-form";
import { ImageForm } from "./image-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuChevronLeft, LuSave } from "react-icons/lu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ProductForm = {
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<boolean>;
};

export const ProductForm = (props: ProductForm) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: {
        cn: "",
        en: "",
        id: "",
      },
      description: {
        cn: "",
        en: "",
        id: "",
      },
      price: 0,
      source_url: "",
      is_available: true,
      options: [],
      image_cover_number: 1,
      image_urls: [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.image_cover_number > data.image_urls.length) {
      toast.error("Image cover number can't be bigger than total image count");
      return;
    }
    const product = await props.onSubmit(data);
    if (product) {
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
