import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";

type DescriptionFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const DescriptionForm = ({ form }: DescriptionFormProps) => {
  return (
    <div>
      <p className="text-lg mb-4 font-bold font-mono">DESCRIPTION*</p>
      <FieldGroup className="grid lg:grid-cols-3 gap-4">
        <Controller
          name="description.cn"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="cn_title">CHINESE</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Textarea
                {...field}
                id="cn_description"
                aria-invalid={fieldState.invalid}
                placeholder="Chinese Description"
                autoComplete="off"
              />
            </Field>
          )}
        />
        <Controller
          name="description.en"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="en_description">ENGLISH</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Textarea
                {...field}
                id="en_description"
                aria-invalid={fieldState.invalid}
                placeholder="English Description"
                autoComplete="off"
              />
            </Field>
          )}
        />
        <Controller
          name="description.id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="id_description">INDONESIAN</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Textarea
                {...field}
                id="id_description"
                aria-invalid={fieldState.invalid}
                placeholder="Indonesian Description"
                autoComplete="off"
              />
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
};
