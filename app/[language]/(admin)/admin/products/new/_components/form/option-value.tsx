"use client";

import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { LuX } from "react-icons/lu";
import type z from "zod";

import { Button } from "@/components/ui/button";
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

type OptionValueProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
  optionIndex: number;
  valueIndex: number;
  canRemove: boolean;
  onRemoveClick: () => void;
};

const languages = [
  { key: "cn", name: "Chinese", placeholder: "e.g. 蓝色" },
  { key: "en", name: "English", placeholder: "e.g. Blue" },
  { key: "id", name: "Indonesian", placeholder: "e.g. Biru" },
] as const;

export const OptionValue = ({
  form,
  optionIndex,
  valueIndex,
  canRemove,
  onRemoveClick,
}: OptionValueProps) => {
  const rmbIdr = env.NEXT_PUBLIC_RMB_IDR;

  return (
    <div className="rounded-xl border bg-muted/15 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
            Value {valueIndex + 1}
          </p>
          <p className="text-sm text-muted-foreground">
            Customer-facing label and price adjustment
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemoveClick}
          type="button"
          disabled={!canRemove}
          aria-label={`Remove value ${valueIndex + 1} from option ${optionIndex + 1}`}
          title={canRemove ? "Remove value" : "An option needs at least one value"}
        >
          <LuX />
        </Button>
      </div>

      <FieldGroup className="grid gap-4 md:grid-cols-3">
        {languages.map((language) => {
          const fieldId = `option-${optionIndex}-value-${valueIndex}-${language.key}`;

          return (
            <Controller
              key={language.key}
              name={`options.${optionIndex}.values.${valueIndex}.${language.key}`}
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

        <Controller
          name={`options.${optionIndex}.values.${valueIndex}.price_addition`}
          control={form.control}
          render={({ field, fieldState }) => {
            const fieldId = `option-${optionIndex}-value-${valueIndex}-price`;

            return (
              <Field data-invalid={fieldState.invalid} className="md:col-span-3">
                <FieldLabel htmlFor={fieldId}>Additional price</FieldLabel>
                <div className="relative max-w-sm">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-mono text-sm font-semibold text-muted-foreground">
                    ¥
                  </span>
                  <Input
                    {...field}
                    className="pl-8 font-mono tabular-nums"
                    type="number"
                    id={fieldId}
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    placeholder="0"
                    min={0}
                    onChange={(event) => {
                      field.onChange(
                        event.target.value
                          ? Number.parseInt(event.target.value)
                          : 0,
                      );
                    }}
                  />
                </div>
                <FieldDescription className="font-serif tabular-nums">
                  Adds Rp{formatIdr((field.value || 0) * rmbIdr)} to the base
                  price.
                </FieldDescription>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            );
          }}
        />
      </FieldGroup>
    </div>
  );
};
