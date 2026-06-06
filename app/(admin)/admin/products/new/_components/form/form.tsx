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

export const ProductForm = () => {
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
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.image_cover_number > data.image_urls.length) {
      toast.error("Image cover number can't be bigger than total image count");
      return;
    }
    console.log(data);
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // })
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
        <Button className="flex-1 max-w-48" type="submit">
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
