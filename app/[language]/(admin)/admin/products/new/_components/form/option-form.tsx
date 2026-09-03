"use client";

import { useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { LuLayers3, LuPlus, LuTrash2 } from "react-icons/lu";
import type z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { OptionLabel } from "./option-label";
import { getFirstErroredOptionIndex } from "./option-form-utils";
import { OptionValue } from "./option-value";
import { productFormSchema } from "./schema";

type OptionFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

type OptionFieldProps = Pick<OptionFormProps, "form"> & {
  optionIndex: number;
  onRemoveOption: () => void;
};

type OptionItemProps = Pick<OptionFormProps, "form"> & {
  optionIndex: number;
  optionFieldId: string;
  shouldFocusError: boolean;
  onRemoveOption: () => void;
};

const emptyValue = {
  id: "",
  en: "",
  cn: "",
  price_addition: 0,
  image_url: undefined,
};

const OptionField = ({
  form,
  optionIndex,
  onRemoveOption,
}: OptionFieldProps) => {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control: form.control,
    name: `options.${optionIndex}.values`,
  });

  return (
    <div className="space-y-6">
      <OptionLabel form={form} optionIndex={optionIndex} />

      <div className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h4 className="font-medium">Option values</h4>
            <p className="text-sm text-muted-foreground">
              Add the choices customers can select for this option.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemoveOption}
          >
            <LuTrash2 /> Delete option
          </Button>
        </div>

        <div className="space-y-3">
          {valueFields.map((valueField, valueIndex) => (
            <OptionValue
              key={valueField.id}
              form={form}
              optionIndex={optionIndex}
              valueIndex={valueIndex}
              canRemove={valueFields.length > 1}
              onRemoveClick={() => removeValue(valueIndex)}
            />
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendValue(emptyValue)}
        >
          <LuPlus /> Add value
        </Button>
      </div>
    </div>
  );
};

const OptionItem = ({
  form,
  optionIndex,
  optionFieldId,
  shouldFocusError,
  onRemoveOption,
}: OptionItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const optionRef = useRef<HTMLDivElement>(null);
  const optionHasError = Boolean(
    form.formState.errors.options?.[optionIndex],
  );

  useEffect(() => {
    if (!optionHasError || !shouldFocusError) return;

    const frame = requestAnimationFrame(() => {
      optionRef.current
        ?.querySelector<HTMLElement>(
          '[data-slot="accordion-content"] [aria-invalid="true"]',
        )
        ?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [optionHasError, shouldFocusError]);

  return (
    <div ref={optionRef}>
      <Accordion
        value={isOpen || optionHasError ? [optionFieldId] : []}
        onValueChange={(value) => setIsOpen(value.includes(optionFieldId))}
      >
        <AccordionItem
          value={optionFieldId}
          className="rounded-xl border bg-card px-4 shadow-xs"
        >
          <AccordionTrigger
            className="hover:no-underline"
            aria-invalid={optionHasError}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary">
                {optionIndex + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-medium">
                  Option {optionIndex + 1}
                </span>
                <span
                  className={
                    optionHasError
                      ? "block text-xs font-medium text-destructive"
                      : "block text-xs font-normal text-muted-foreground"
                  }
                >
                  {optionHasError
                    ? "Needs attention"
                    : "Localized customer choice"}
                </span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t pt-5">
            <OptionField
              form={form}
              optionIndex={optionIndex}
              onRemoveOption={onRemoveOption}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
  const optionErrors = form.formState.errors.options;
  const firstErroredOptionIndex = getFirstErroredOptionIndex(
    Array.isArray(optionErrors) ? optionErrors : undefined,
  );

  return (
    <div className="space-y-4">
      {optionFields.length > 0 ? (
        <div className="space-y-3">
          {optionFields.map((optionField, optionIndex) => (
            <OptionItem
              key={optionField.id}
              form={form}
              optionIndex={optionIndex}
              optionFieldId={optionField.id}
              shouldFocusError={optionIndex === firstErroredOptionIndex}
              onRemoveOption={() => removeOption(optionIndex)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed bg-muted/20 px-5 py-10 text-center">
          <LuLayers3 className="mx-auto mb-3 size-8 text-muted-foreground" />
          <h3 className="font-medium">This product has no options</h3>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
            Add an option when customers need to choose a size, color, or
            another variant before ordering.
          </p>
        </div>
      )}

      <Button
        type="button"
        variant={optionFields.length > 0 ? "outline" : "secondary"}
        onClick={() =>
          appendOption({
            id: "",
            en: "",
            cn: "",
            values: [emptyValue],
          })
        }
      >
        <LuPlus /> Add option
      </Button>
    </div>
  );
};
