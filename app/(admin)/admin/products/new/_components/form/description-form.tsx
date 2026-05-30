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
    <FieldGroup>
      <Controller
        name="description.cn"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="cn_title">Description (CN) </FieldLabel>
            <Textarea
              {...field}
              id="cn_description"
              aria-invalid={fieldState.invalid}
              placeholder="Chinese Description"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description.en"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="en_description">Description (EN) </FieldLabel>
            <Textarea
              {...field}
              id="en_description"
              aria-invalid={fieldState.invalid}
              placeholder="English Description"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description.id"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="id_description">Description (ID) </FieldLabel>
            <Textarea
              {...field}
              id="id_description"
              aria-invalid={fieldState.invalid}
              placeholder="Indonesian Description"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
