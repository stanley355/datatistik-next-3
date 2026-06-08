"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formSchema, ProductForm } from "./form";
import { createProductOptions, findProductOptions } from "@/hooks/products";
import { uploadImagesOptions } from "@/hooks/s3";
import z from "zod";
import { toast } from "sonner";
import { authGetSessionOptions } from "@/hooks/auth";
import { isAuthError } from "@/lib/api";

export const NewProduct = () => {
  const queryClient = useQueryClient();
  const session = useQuery(authGetSessionOptions());
  const createProduct = useMutation(createProductOptions());
  const uploadImage = useMutation(uploadImagesOptions());

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Uploading images");
    try {
      if (!session.data || isAuthError(session.data)) {
        toast.error("Your session has expired, please refresh and login");
        return false;
      }

      const imageFiles = await Promise.all(
        data.image_urls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const [_, imageType] = blob.type.split("/");
          return new File([blob], `${index}.${imageType}`, { type: blob.type });
        }),
      );

      const images = await uploadImage.mutateAsync(imageFiles);

      if (!images?.data) {
        toast.error("Fail to upload images, please contact support", {
          id: toastId,
        });
        return false;
      }

      toast.loading("Uploading products", { id: toastId });

      const productParam: Parameters<typeof createProduct.mutateAsync>[0] = {
        created_by_id: session.data.user.id,
        title: data.title,
        description: data.description,
        price: data.price,
        source_url: data.source_url,
        is_available: data.is_available,
        image_cover_number: data.image_cover_number,
        image_urls: images.data,
        options: data.options,
      };

      const product = await createProduct.mutateAsync(productParam);

      if (!product?.data) {
        toast.error("Fail to create products, please contact support", {
          id: toastId,
        });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: findProductOptions().queryKey,
      });
      toast.success("Product created successfully", { id: toastId });
      return true;
    } catch (err) {
      toast.error("Something went wrong, please try again", { id: toastId });
      console.error(err);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4 lg:px-0">
      <ProductForm
        isLoading={createProduct.isPending || uploadImage.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
