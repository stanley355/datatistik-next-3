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
import { Button } from "@/components/ui/button";
import { LuImages, LuTrash2, LuX } from "react-icons/lu";
import { useRef } from "react";

type OptionValueProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgUrl = form.watch(
    `options.${optionIndex}.values.${valueIndex}.image_url`,
  );
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
      </FieldGroup>
      <div className="grid lg:grid-cols-2 gap-4">
        <FieldGroup className="flex flex-col gap-4">
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
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </Field>
            )}
          />

          <Controller
            name={`options.${optionIndex}.values.${valueIndex}.image_url`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2 text-sm">
                  <FieldLabel
                    htmlFor={`options.${optionIndex}.values.${valueIndex}.image_url`}
                    className="font-mono font-bold"
                  >
                    OPTION IMAGE
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  aria-invalid={fieldState.invalid}
                  type="file"
                  id={`options.${optionIndex}.values.${valueIndex}.image_url`}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => {
                    const fileList = e.target.files;
                    if (!fileList || fileList.length === 0) return;
                    const filesArray = Array.from(fileList);
                    const fileUrls = filesArray.map((f) =>
                      URL.createObjectURL(f),
                    );
                    field.onChange(fileUrls);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                />
              </Field>
            )}
          />
        </FieldGroup>

        <div className="border rounded">
          {imgUrl ? (
            <div className="relative">
              <img
                src={imgUrl}
                alt="image"
                className="w-full h-80 object-cover aspect-square rounded"
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  form.setValue(
                    `options.${optionIndex}.values.${valueIndex}.image_url`,
                    undefined,
                  );
                }}
              >
                <LuTrash2 />
              </Button>
            </div>
          ) : (
            <LuImages className="w-full h-80 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};
