import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { productFormSchema } from "./schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuTrash2 } from "react-icons/lu";
import { useRef } from "react";

type ImageFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

export const ImageForm = ({ form }: ImageFormProps) => {
  const images = form.watch("image_urls");
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <p className="text-lg mb-4 font-bold font-mono">IMAGES*</p>
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <Controller
          name="image_urls"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2 text-sm">
                <FieldLabel
                  htmlFor="image_urls"
                  className="font-mono font-bold"
                >
                  UPLOAD IMAGES
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Input
                multiple
                ref={fileInputRef}
                aria-invalid={fieldState.invalid}
                type="file"
                id="image_urls"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (!fileList || fileList.length === 0) return;
                  const filesArray = Array.from(fileList);
                  const fileUrls = filesArray.map((f) =>
                    URL.createObjectURL(f),
                  );
                  if (field.value.length > 0) {
                    const newFileUrls = [...field.value, ...fileUrls];
                    field.onChange(newFileUrls);
                  } else {
                    field.onChange(fileUrls);
                  }
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              />
            </Field>
          )}
        />
        <Controller
          name="image_cover_number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2 text-sm">
                <FieldLabel
                  htmlFor="image_cover_number"
                  className="font-mono font-bold"
                >
                  Image Cover Number
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
              <Input
                {...field}
                type="number"
                id="image_cover_number"
                aria-invalid={fieldState.invalid}
                placeholder="Image Cover Number"
                min={1}
                disabled={images && images?.length === 0}
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(parseInt(e.target.value));
                  }
                }}
              />
            </Field>
          )}
        />
      </div>

      {images.length > 0 && (
        <div className="flex flex-col gap-4 ">
          <p className="font-bold text-sm font-mono">IMAGE PREVIEWS</p>
          <div className="flex flex-wrap gap-4 ">
            {images?.map((img, imgIndex) => (
              <div key={img} className="flex flex-col gap-4 relative">
                <img
                  src={img}
                  alt={img}
                  className="size-80 rounded object-cover aspect-square border"
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    const newImages = [...images];
                    newImages.splice(imgIndex, 1);
                    form.setValue("image_urls", newImages);
                  }}
                >
                  <LuTrash2 />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
