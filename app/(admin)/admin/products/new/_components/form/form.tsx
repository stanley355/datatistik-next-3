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

export const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_available: true,
      price: 0,
    },
  });
  return (
    <form>
      <Accordion className="gap-4">
        <AccordionItem
          value="title"
          className="border border-primary rounded-lg"
        >
          <AccordionTrigger className="border border-primary p-4 rounded-lg">
            TITLE
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <TitleForm form={form} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="description"
          className="border border-primary rounded-lg"
        >
          <AccordionTrigger className="border border-primary p-4 rounded-lg">
            DESCRIPTION
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <DescriptionForm form={form} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="price"
          className="border border-primary rounded-lg"
        >
          <AccordionTrigger className="border border-primary p-4 rounded-lg">
            PRICE
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <PriceForm form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};
