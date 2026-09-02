"use client";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { productFormSchema } from "./schema";

type OptionLabelProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  optionIndex: number;
};

const languages = [
  { key: "cn", name: "Chinese", placeholder: "e.g. 颜色" },
  { key: "en", name: "English", placeholder: "e.g. Color" },
  { key: "id", name: "Indonesian", placeholder: "e.g. Warna" },
] as const;

export const OptionLabel = ({ form, optionIndex }: OptionLabelProps) => {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-medium">Option name</h4>
        <p className="text-sm text-muted-foreground">
          Name this customer choice in every storefront language.
        </p>
      </div>

      <FieldGroup className="grid gap-4 md:grid-cols-3">
        {languages.map((language) => {
          const fieldId = `option-${optionIndex}-${language.key}`;

          return (
            <Controller
              key={language.key}
              name={`options.${optionIndex}.${language.key}`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={fieldId}>{language.name}</FieldLabel>
                  <Input
                    {...field}
                    id={fieldId}
                    aria-invalid={fieldState.invalid}
                    placeholder={language.placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              )}
            />
          );
        })}
      </FieldGroup>
    </div>
  );
};
