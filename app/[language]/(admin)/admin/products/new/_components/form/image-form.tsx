"use client";

import { useEffect, useRef } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import {
  LuChevronLeft,
  LuChevronRight,
  LuImagePlus,
  LuStar,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import type z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { moveImage, removeImage } from "./image-form-utils";
import { productFormSchema } from "./schema";

type ImageFormProps = {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
};

export const ImageForm = ({ form }: ImageFormProps) => {
  const images = useWatch({
    control: form.control,
    name: "image_urls",
  });
  const coverNumber = useWatch({
    control: form.control,
    name: "image_cover_number",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef(new Set<string>());

  useEffect(() => {
    const activeImages = new Set(images);

    objectUrlsRef.current.forEach((url) => {
      if (!activeImages.has(url)) {
        URL.revokeObjectURL(url);
        objectUrlsRef.current.delete(url);
      }
    });
  }, [images]);

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, []);

  const updateImageState = (nextImages: string[], nextCoverNumber: number) => {
    form.setValue("image_urls", nextImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("image_cover_number", nextCoverNumber, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const nextState = moveImage(images, coverNumber, fromIndex, toIndex);
    updateImageState(nextState.images, nextState.coverNumber);
  };

  const handleRemove = (removeIndex: number) => {
    const nextState = removeImage(images, coverNumber, removeIndex);

    if (
      nextState.removedImage?.startsWith("blob:") &&
      objectUrlsRef.current.has(nextState.removedImage)
    ) {
      URL.revokeObjectURL(nextState.removedImage);
      objectUrlsRef.current.delete(nextState.removedImage);
    }

    updateImageState(nextState.images, nextState.coverNumber);
  };

  return (
    <div className="space-y-5">
      <Controller
        name="image_urls"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="product-images"
              className="group w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-5 text-center transition-colors hover:border-primary/50 hover:bg-primary/5 focus-within:border-primary focus-within:ring-3 focus-within:ring-ring/30 motion-reduce:transition-none"
            >
              <span className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none">
                <LuUpload className="size-5" />
              </span>
              <span className="block font-medium">Choose product images</span>
              <span className="mt-1 block text-xs leading-relaxed font-normal text-muted-foreground">
                PNG, JPG, or WebP. Select several files at once.
              </span>
              <input
                ref={(node) => {
                  fileInputRef.current = node;
                  field.ref(node);
                }}
                className="absolute size-px overflow-hidden whitespace-nowrap opacity-0"
                multiple
                name={field.name}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                type="file"
                id="product-images"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(event) => {
                  const selectedFiles = Array.from(event.target.files ?? []);

                  if (selectedFiles.length === 0) return;

                  const nextUrls = selectedFiles.map((file) => {
                    const url = URL.createObjectURL(file);
                    objectUrlsRef.current.add(url);
                    return url;
                  });

                  field.onChange([...field.value, ...nextUrls]);
                  form.setValue("image_cover_number", coverNumber || 1, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              />
            </FieldLabel>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
            {form.formState.errors.image_cover_number ? (
              <FieldError
                errors={[form.formState.errors.image_cover_number]}
              />
            ) : null}
          </Field>
        )}
      />

      {images.length > 0 ? (
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-mono text-xs font-semibold tracking-wider uppercase">
              Image order
            </p>
            <p className="text-xs text-muted-foreground">
              {images.length} {images.length === 1 ? "image" : "images"}
            </p>
          </div>

          <ol
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2"
            aria-label="Product image order"
          >
            {images.map((image, index) => {
              const isCover = coverNumber === index + 1;

              return (
                <li
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-xl border bg-card shadow-xs"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {/* Dynamic blob and API URLs cannot use next/image safely. */}
                    <img
                      src={image}
                      alt={`Product image ${index + 1}${isCover ? ", selected as cover" : ""}`}
                      className="size-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <span className="absolute top-2 left-2 grid min-w-6 place-items-center rounded-md bg-background/90 px-1.5 py-1 font-mono text-[0.625rem] font-bold shadow-sm backdrop-blur">
                      {index + 1}
                    </span>
                    {isCover ? (
                      <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[0.625rem] font-semibold text-primary-foreground shadow-sm">
                        <LuStar className="size-3" /> Cover
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2 p-2">
                    <Button
                      type="button"
                      variant={isCover ? "secondary" : "outline"}
                      size="sm"
                      className="w-full"
                      aria-pressed={isCover}
                      onClick={() =>
                        form.setValue("image_cover_number", index + 1, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    >
                      <LuStar /> {isCover ? "Cover selected" : "Set as cover"}
                    </Button>

                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === 0}
                          aria-label={`Move image ${index + 1} left`}
                          onClick={() => handleMove(index, index - 1)}
                        >
                          <LuChevronLeft />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === images.length - 1}
                          aria-label={`Move image ${index + 1} right`}
                          onClick={() => handleMove(index, index + 1)}
                        >
                          <LuChevronRight />
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        aria-label={`Remove image ${index + 1}`}
                        onClick={() => handleRemove(index)}
                      >
                        <LuTrash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/20 px-4 py-8 text-center">
          <LuImagePlus className="mx-auto mb-3 size-7 text-muted-foreground" />
          <p className="font-medium">No product images yet</p>
          <FieldDescription className="mt-1 text-center">
            Add at least one image to create the product.
          </FieldDescription>
        </div>
      )}
    </div>
  );
};
