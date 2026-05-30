import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { Input } from "@/components/ui/input";

type TitleFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const TitleForm = ({ form }: TitleFormProps) => {
  return (
    <FieldGroup>
      <Controller
        name="title.cn"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="cn_title">Title (CN) </FieldLabel>
            <Input
              {...field}
              id="cn_title"
              aria-invalid={fieldState.invalid}
              placeholder="Chinese Title"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="title.en"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="en_title">Title (EN) </FieldLabel>
            <Input
              {...field}
              id="en_title"
              aria-invalid={fieldState.invalid}
              placeholder="English Title"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="title.id"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="id_title">Title (ID) </FieldLabel>
            <Input
              {...field}
              id="id_title"
              aria-invalid={fieldState.invalid}
              placeholder="Indonesian Title"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
