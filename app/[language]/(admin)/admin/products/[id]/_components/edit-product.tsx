"use client";

import { authGetSessionOptions } from "@/hooks/auth";
import { uploadImagesOptions } from "@/hooks/s3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductForm } from "../../new/_components";
import { findProductByIdOptions } from "@/hooks/products";

type EditProductProps = {
  id: number;
};

export const EditProduct = ({ id }: EditProductProps) => {
  const queryClient = useQueryClient();

  const session = useQuery(authGetSessionOptions());
  const product = useQuery(findProductByIdOptions(id));
  // const createProduct = useMutation(createProductOptions());
  const uploadImage = useMutation(uploadImagesOptions());

  return (
    <div className="container mx-auto p-4 lg:px-0">
      <ProductForm
        isLoading={uploadImage.isPending}
        product={product.data?.data}
        onSubmit={async (data) => {
          console.log(data);
          return false;
        }}
      />
    </div>
  );
};
