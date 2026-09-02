"use client";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/lib/env";

import { formatIdr } from "./price-form-utils";
import { productFormSchema } from "./schema";

type PriceFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

export const PriceForm = ({ form }: PriceFormProps) => {
  const rmbIdr = env.NEXT_PUBLIC_RMB_IDR;

  return (
    <FieldGroup className="gap-6">
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-price">Base price</FieldLabel>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-mono text-sm font-semibold text-muted-foreground">
                ¥
              </span>
              <Input
                {...field}
                className="pl-8 font-mono tabular-nums"
                type="number"
                id="product-price"
                inputMode="numeric"
                aria-invalid={fieldState.invalid}
                placeholder="0"
                min={1}
                onChange={(event) => {
                  field.onChange(
                    event.target.value ? Number.parseInt(event.target.value) : 0,
                  );
                }}
              />
            </div>
            <FieldDescription className="font-serif tabular-nums">
              ¥1 = Rp{formatIdr(rmbIdr)} · Estimated total Rp
              {formatIdr(field.value * rmbIdr)}
            </FieldDescription>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        )}
      />

      <Controller
        name="source_url"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="product-source-url">Source link</FieldLabel>
            <Input
              {...field}
              id="product-source-url"
              type="url"
              inputMode="url"
              aria-invalid={fieldState.invalid}
              placeholder="https://supplier.example/product"
              autoComplete="url"
            />
            <FieldDescription>
              Optional internal reference to the supplier listing.
            </FieldDescription>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        )}
      />

      <Controller
        name="is_available"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="product-availability"
              className="w-full cursor-pointer rounded-lg border bg-muted/20 p-4 transition-colors hover:bg-muted/40 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 motion-reduce:transition-none"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id="product-availability"
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="space-y-1">
                  <span className="block font-medium">
                    {field.value ? "Available for order" : "Hidden from sale"}
                  </span>
                  <span className="block text-sm leading-relaxed font-normal text-muted-foreground">
                    {field.value
                      ? "Customers can find and add this product to their cart."
                      : "The product remains in the catalog but cannot be ordered."}
                  </span>
                </div>
              </div>
            </FieldLabel>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
