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
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { LuX } from "react-icons/lu";

type OptionValueProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  optionIndex: number;
  valueIndex: number;
  onRemoveClick: () => void;
};

export const OptionValue = ({
  form,
  optionIndex,
  valueIndex,
  onRemoveClick,
}: OptionValueProps) => {
  const rmbIdr = env.NEXT_PUBLIC_RMB_IDR;
  return (
    <div className="flex flex-col gap-8 pb-4 border-b">
      <div className="border-y p-2 flex items-center justify-between">
        <p className="font-semibold font-mono">
          {valueIndex + 1}. VALUE - {optionIndex + 1}. OPTION
        </p>
        <Button variant="destructive" onClick={onRemoveClick} type="button">
          <LuX />
        </Button>
      </div>
      <FieldGroup className="grid lg:grid-cols-3 gap-4">
        <Controller
          name={`options.${optionIndex}.values.${valueIndex}.cn`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel
                  htmlFor={`options.${optionIndex}.values.${valueIndex}.cn`}
                >
                  CHINESE
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
          name={`options.${optionIndex}.values.${valueIndex}.en`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel
                  htmlFor={`options.${optionIndex}.values.${valueIndex}.en`}
                >
                  ENGLISH
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
          name={`options.${optionIndex}.values.${valueIndex}.id`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel
                  htmlFor={`options.${optionIndex}.values.${valueIndex}.id`}
                >
                  INDONESIAN
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
          name={`options.${optionIndex}.values.${valueIndex}.price_addition`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2 text-sm">
                <FieldLabel htmlFor="price" className="font-mono font-bold">
                  RMB ADDITONAL PRICE*
                </FieldLabel>
                <p className="font-serif">
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
                min={0}
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(parseInt(e.target.value));
                  } else {
                    field.onChange(0);
                  }
                }}
              />
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
};
