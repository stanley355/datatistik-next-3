"use client";

import { useMutation } from "@tanstack/react-query";
import { formSchema, ProductForm } from "./form";
import { createProductOptions } from "@/hooks/products";
import { uploadImagesOptions } from "@/hooks/s3";
import z from "zod";
import { toast } from "sonner";

export const NewProduct = () => {
  const createProduct = useMutation(createProductOptions());
  const uploadImage = useMutation(uploadImagesOptions());

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const productToast = toast.loading("Uploading images");
      const imageFiles = await Promise.all(
        data.image_urls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const [_, imageType] = blob.type.split("/");
          return new File([blob], `${index}.${imageType}`, { type: blob.type });
        }),
      );
      const images_url = await uploadImage.mutateAsync(imageFiles);
      // console.log(images);

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-2 lg:px-0">
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};
