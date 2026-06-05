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
    <FieldGroup className="grid lg:grid-cols-3 gap-4">
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2 text-sm">
              <FieldLabel htmlFor="price" className="font-mono font-bold">
                RMB PRICE*
              </FieldLabel>
              <p className="font-serif">
                (IDR: Rp{rmbIdr}, TOTAL: Rp
                {(field.value * rmbIdr).toLocaleString()})
              </p>
            </div>
            <Input
              {...field}
              type="number"
              id="price"
              aria-invalid={fieldState.invalid}
              placeholder="RMB Price"
              min={1}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="source_url"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2 text-sm">
              <FieldLabel htmlFor="source_url" className="font-bold font-mono">
                LINK
              </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
            <Input
              {...field}
              id="source_url"
              aria-invalid={fieldState.invalid}
              placeholder="https://"
            />
          </Field>
        )}
      />
      <Controller
        name="is_available"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-4">
              <FieldLabel
                htmlFor="is_available"
                className="font-mono font-bold"
              >
                STATUS
              </FieldLabel>
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
    </FieldGroup>
  );
};
