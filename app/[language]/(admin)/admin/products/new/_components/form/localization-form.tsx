"use client";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { productFormSchema } from "./schema";

type LocalizationFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

const languages = [
  {
    key: "cn",
    code: "CN",
    name: "Chinese",
    titlePlaceholder: "e.g. 羊毛披肩式外套",
    descriptionPlaceholder: "Describe the product in Chinese.",
  },
  {
    key: "en",
    code: "EN",
    name: "English",
    titlePlaceholder: "e.g. Wool cape coat",
    descriptionPlaceholder: "Describe the material, fit, and key details.",
  },
  {
    key: "id",
    code: "ID",
    name: "Indonesian",
    titlePlaceholder: "e.g. Mantel cape wol",
    descriptionPlaceholder: "Jelaskan bahan, ukuran, dan detail utama.",
  },
] as const;

export const LocalizationForm = ({ form }: LocalizationFormProps) => {
  return (
    <FieldSet>
      <FieldLegend className="sr-only">Product translations</FieldLegend>
      <div className="grid gap-4 xl:grid-cols-3">
        {languages.map((language) => (
          <div
            key={language.key}
            className="rounded-xl border bg-muted/20 p-4 transition-colors focus-within:border-primary/40 focus-within:bg-card motion-reduce:transition-none"
          >
            <div className="mb-5 flex items-center gap-3 border-b pb-3">
              <span className="grid size-8 place-items-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
                {language.code}
              </span>
              <div>
                <h3 className="font-medium">{language.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Required storefront copy
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Controller
                name={`title.${language.key}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`product-title-${language.key}`}>
                      Product title
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`product-title-${language.key}`}
                      aria-invalid={fieldState.invalid}
                      placeholder={language.titlePlaceholder}
                      autoComplete="off"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name={`description.${language.key}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={`product-description-${language.key}`}
                    >
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id={`product-description-${language.key}`}
                      className="min-h-32 resize-y"
                      aria-invalid={fieldState.invalid}
                      placeholder={language.descriptionPlaceholder}
                      autoComplete="off"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </FieldSet>
  );
};
