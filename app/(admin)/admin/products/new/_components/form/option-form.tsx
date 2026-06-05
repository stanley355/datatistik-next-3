import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { LuPlus, LuTrash } from "react-icons/lu";
import { formSchema } from "./schema";
import z from "zod";
import { OptionValue } from "./option-value";
import { OptionLabel } from "./option-label";

type OptionFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

type OptionFieldProps = Pick<OptionFormProps, "form"> & { optionIndex: number };
const OptionField = ({ form, optionIndex }: OptionFieldProps) => {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control: form.control,
    name: `options.${optionIndex}.values`,
  });
  return (
    <div className="flex flex-col gap-4">
      <OptionLabel form={form} optionIndex={optionIndex} />

      <div className="flex flex-col gap-4">
        <Accordion className="gap-4">
          {valueFields.map((_, index) => (
            <AccordionItem
              value={`option_value_${index}`}
              key={`option_value_${index}`}
              className="border border-border rounded"
            >
              <div className="flex items-center justify-between gap-4 pr-4 border-b rounded-b">
                <AccordionTrigger
                  showArrow={false}
                  headerClassName="w-full flex-1 pl-4"
                >
                  Option Value {index + 1}
                </AccordionTrigger>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    removeValue(index);
                  }}
                >
                  <LuTrash />
                </Button>
              </div>
              <AccordionContent className="p-4">
                <OptionValue
                  form={form}
                  optionIndex={optionIndex}
                  valueIndex={index}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          variant="outline"
          className="ml-auto w-fit"
          onClick={() =>
            appendValue({
              id: "",
              en: "",
              cn: "",
              price_addition: 0,
              image_url: undefined,
            })
          }
        >
          <LuPlus /> Add Option Value
        </Button>
      </div>
    </div>
  );
};

export const OptionForm = ({ form }: OptionFormProps) => {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });
  return (
    <div className="flex flex-col gap-4">
      <Accordion className="gap-4">
        {optionFields.map((_, index) => (
          <AccordionItem
            value={`option_${index}`}
            key={`option_${index}`}
            className="border border-primary rounded"
          >
            <div className="flex items-center justify-between gap-4 pr-4 border-b rounded-b">
              <AccordionTrigger
                showArrow={false}
                headerClassName="w-full flex-1 pl-4"
              >
                Option {index + 1}:
              </AccordionTrigger>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  removeOption(index);
                }}
              >
                <LuTrash />
              </Button>
            </div>
            <AccordionContent className="p-4">
              <OptionField form={form} optionIndex={index} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        variant="outline"
        className="ml-auto w-fit"
        onClick={() =>
          appendOption({
            id: "",
            en: "",
            cn: "",
            values: [
              {
                id: "",
                en: "",
                cn: "",
                price_addition: 0,
                image_url: undefined,
              },
            ],
          })
        }
      >
        <LuPlus /> Add Option
      </Button>
    </div>
  );
};
