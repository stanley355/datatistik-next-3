import { Field, FieldGroup } from "@/components/ui/field";
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { LuImages, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";

type OptionImageFormProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  optionIndex: number;
  valueIndex: number;
};
export const OptionImageForm = ({
  form,
  optionIndex,
  valueIndex,
}: OptionImageFormProps) => {
  return (
    <FieldGroup>
      <Controller
        name={`options.${optionIndex}.values.${valueIndex}.image_url`}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="w-full flex flex-col size-96 border p-2 rounded gap-4">
              {field.value ? (
                <>
                  <img
                    src={field.value}
                    alt="image"
                    className="w-full h-80 object-cover aspect-square"
                  />
                  <Button variant="destructive" onClick={field.onChange}>
                    <LuTrash2 /> Remove Image
                  </Button>
                </>
              ) : (
                <>
                  <LuImages className="w-full flex-1" />
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="w-full"
                    onChange={async (e) => {
                      const fileList = e.target.files;
                      if (!fileList || fileList.length === 0) return;
                      const filesArray = Array.from(fileList);
                      const fileUrl = URL.createObjectURL(filesArray[0]);
                      field.onChange(fileUrl);
                    }}
                  />
                </>
              )}
            </div>
          </Field>
        )}
      />
    </FieldGroup>
  );
};
