import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { PriceForm } from "./price-form";
import { OptionForm } from "./option-form";
import { ImageForm } from "./image-form";

export const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_available: true,
      price: 0,
      options: [],
      image_cover_number: 1,
      image_urls: [],
    },
  });
  return (
    <form className="flex flex-col gap-8">
      <TitleForm form={form} />
      <DescriptionForm form={form} />
      <PriceForm form={form} />
      <ImageForm form={form} />

      {/*<OptionForm form={form} />*/}
    </form>
  );
};
