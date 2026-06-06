import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { LuPlus, LuSave, LuTrash } from "react-icons/lu";
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
    <div className="flex flex-col gap-4 p-4">
      <OptionLabel form={form} optionIndex={optionIndex} />

      <p className="font-mono font-semibold">Values</p>
      <div className="flex flex-col gap-8">
        {valueFields.map((_, index) => (
          <OptionValue
            key={`${optionIndex}_values_${index}`}
            form={form}
            optionIndex={optionIndex}
            valueIndex={index}
            onRemoveClick={() => removeValue(index)}
          />
        ))}
        <Button
          variant="outline"
          className="w-48"
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
      <p className="text-lg font-bold font-mono">OPTIONS</p>
      <div className="flex flex-col gap-8">
        {optionFields.map((_, index) => (
          <div
            key={`option_${index}`}
            className="border-2 border-secondary rounded"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-2 border-b">
              <p className="font-mono font-semibold ">{index + 1}. OPTION</p>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeOption(index)}
              >
                <LuTrash />
              </Button>
            </div>
            <OptionField form={form} optionIndex={index} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        className="w-48"
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
