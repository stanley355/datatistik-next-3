"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import { productFormSchema } from "./schema";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type OptionLabelProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  optionIndex: number;
};

export const OptionLabel = ({ form, optionIndex }: OptionLabelProps) => {
  return (
    <>
      <p className="font-mono font-semibold">Labels</p>
      <FieldGroup className="grid md:grid-cols-3 gap-4">
        <Controller
          name={`options.${optionIndex}.cn`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor={`options.${optionIndex}.cn`}>
                  CHINESE
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Input
                {...field}
                id={`options.${optionIndex}.cn`}
                aria-invalid={fieldState.invalid}
                placeholder="Chinese Label"
                autoComplete="off"
              />
            </Field>
          )}
        />
        <Controller
          name={`options.${optionIndex}.en`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor={`options.${optionIndex}.en`}>
                  ENGLISH
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Input
                {...field}
                id={`options.${optionIndex}.en`}
                aria-invalid={fieldState.invalid}
                placeholder="English Label"
                autoComplete="off"
              />
            </Field>
          )}
        />

        <Controller
          name={`options.${optionIndex}.id`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor={`options.${optionIndex}.id`}>
                  INDONESIAN
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Input
                {...field}
                id={`options.${optionIndex}.cn`}
                aria-invalid={fieldState.invalid}
                placeholder="Indonesian Label"
                autoComplete="off"
              />
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
};
