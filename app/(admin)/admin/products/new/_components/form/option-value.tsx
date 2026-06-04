import { Controller, UseFormReturn } from "react-hook-form";
import { formSchema } from "./schema";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";

type OptionValueProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  optionIndex: number;
  valueIndex: number;
};

export const OptionValue = ({
  form,
  optionIndex,
  valueIndex,
}: OptionValueProps) => {
  const rmbIdr = env.NEXT_PUBLIC_RMB_IDR;
  return (
    <div>
      <p className="font-semibold">Option Values {valueIndex + 1}</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <FieldGroup>
          <Controller
            name={`options.${optionIndex}.values.${valueIndex}.id`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <FieldLabel
                    htmlFor={`options.${optionIndex}.values.${valueIndex}.id`}
                  >
                    Value (ID)
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Input
                  {...field}
                  id={`options.${optionIndex}.values.${valueIndex}.id`}
                  aria-invalid={fieldState.invalid}
                  placeholder="Indonesian Value"
                  autoComplete="off"
                />
              </Field>
            )}
          />
          <Controller
            name={`options.${optionIndex}.values.${valueIndex}.en`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <FieldLabel
                    htmlFor={`options.${optionIndex}.values.${valueIndex}.en`}
                  >
                    Value (EN)
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Input
                  {...field}
                  id={`options.${optionIndex}.values.${valueIndex}.en`}
                  aria-invalid={fieldState.invalid}
                  placeholder="English Value"
                  autoComplete="off"
                />
              </Field>
            )}
          />

          <Controller
            name={`options.${optionIndex}.values.${valueIndex}.cn`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <FieldLabel
                    htmlFor={`options.${optionIndex}.values.${valueIndex}.cn`}
                  >
                    Value (CN)
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Input
                  {...field}
                  id={`options.${optionIndex}.values.${valueIndex}.cn`}
                  aria-invalid={fieldState.invalid}
                  placeholder="Chinese Value"
                  autoComplete="off"
                />
              </Field>
            )}
          />

          <Controller
            name={`options.${optionIndex}.values.${valueIndex}.price_addition`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="price">
                      RMB Additional Price{" "}
                    </FieldLabel>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <p>
                    (IDR: Rp{rmbIdr}, TOTAL: Rp
                    {field.value ? (field.value * rmbIdr).toLocaleString() : 0})
                  </p>
                </div>
                <Input
                  {...field}
                  type="number"
                  id="price_addition"
                  aria-invalid={fieldState.invalid}
                  placeholder="RMB Price Addition"
                  min={1}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </div>
    </div>
  );
};
