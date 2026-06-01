import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";
import { Checkbox } from "@/components/ui/checkbox";

type PriceFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const PriceForm = ({ form }: PriceFormProps) => {
  const rmbIdr = env.NEXT_PUBLIC_RMB_IDR;
  return (
    <FieldGroup>
      <Controller
        name="is_available"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-4">
              <FieldLabel htmlFor="is_available">Availability</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="is_available"
                name={field.name}
                aria-invalid={fieldState.invalid}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="is_available" className="font-normal">
                {field.value ? "AVAILABLE" : "NOT AVAILABLE"}
              </FieldLabel>
            </div>
          </Field>
        )}
      />
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="price">RMB Price </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
            <p>
              (IDR: Rp{rmbIdr}, TOTAL: Rp
              {(field.value * rmbIdr).toLocaleString()})
            </p>
            <Input
              {...field}
              type="number"
              id="price"
              aria-invalid={fieldState.invalid}
              placeholder="RMB Price"
              min={1}
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};
