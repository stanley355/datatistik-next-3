"use client";

import { authGetSessionOptions } from "@/hooks/auth";
import { uploadImagesOptions } from "@/hooks/s3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductForm, productFormSchema } from "../../new/_components";
import {
  findProductByIdOptions,
  findProductOptions,
  updateProductOptions,
} from "@/hooks/products";
import z from "zod";
import { toast } from "sonner";
import { isAuthError } from "@/lib/api";
import { LoadingLogo } from "@/components/custom-ui/loading-logo";
import { S3Image } from "@/lib/types";

type EditProductProps = {
  id: number;
};

export const EditProduct = ({ id }: EditProductProps) => {
  const queryClient = useQueryClient();
  const session = useQuery(authGetSessionOptions());
  const product = useQuery(findProductByIdOptions(id));
  const uploadImage = useMutation(uploadImagesOptions());
  const updateProduct = useMutation(updateProductOptions());

  const handleSubmit = async (data: z.infer<typeof productFormSchema>) => {
    const toastId = toast.loading("Uploading images");
    try {
      if (!session.data || isAuthError(session.data)) {
        toast.error("Your session has expired, please refresh and login");
        return false;
      }

      const currentImages = product?.data?.data?.image_urls ?? [];
      const keptImagesUrls = data.image_urls.filter(
        (url) => !url.includes("blob:"),
      );
      const existingImages = currentImages
        .map((s3) => {
          const previousImageUrl = [s3.endpoint, s3.bucket, s3.key].join("/");
          if (keptImagesUrls.includes(previousImageUrl)) {
            return s3;
          } else {
            return undefined;
          }
        })
        .filter((img) => img !== undefined);

      const newImagesUrls = data.image_urls.filter((url) =>
        url.includes("blob:"),
      );
      let newImages: S3Image[] = [];

      if (newImagesUrls.length > 0) {
        const newImageFiles = await Promise.all(
          newImagesUrls.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const [_, imageType] = blob.type.split("/");
            return new File([blob], `${index}.${imageType}`, {
              type: blob.type,
            });
          }),
        );

        const uploadedImages = await uploadImage.mutateAsync(newImageFiles);
        if (uploadedImages?.data && uploadedImages?.data.length > 0) {
          newImages = uploadedImages.data;
        } else {
          toast.error("Fail to upload images, please contact support", {
            id: toastId,
          });
          return false;
        }
      }

      const productImages = [...existingImages, ...newImages];
      toast.loading("Uploading products", { id: toastId });

      const productParam: Parameters<typeof updateProduct.mutateAsync>[0] = {
        id,
        created_by_id: session.data.user.id,
        title: data.title,
        description: data.description,
        price: data.price,
        source_url: data.source_url,
        is_available: data.is_available,
        image_cover_number: data.image_cover_number,
        image_urls: productImages,
        options: data.options,
      };

      const updatedProduct = await updateProduct.mutateAsync(productParam);

      if (!updatedProduct?.data) {
        toast.error("Fail to create products, please contact support", {
          id: toastId,
        });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: findProductOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: findProductByIdOptions(id).queryKey,
      });
      toast.success("Product updated successfully", { id: toastId });
      return true;
    } catch (err) {
      toast.error("Something went wrong, please try again", { id: toastId });
      console.error(err);
      return false;
    }
  };

  if (product.isLoading) {
    return (
      <div className="container mx-auto p-4 lg:px-0">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:px-0">
      <ProductForm
        isLoading={uploadImage.isPending}
        product={product.data?.data}
        onSubmit={handleSubmit}
        resetAfterSuccess={false}
      />
    </div>
  );
};
