import { uploadImages } from "@/lib/api/s3";
import { mutationOptions, UseMutationOptions } from "@tanstack/react-query";

type UploadData = Awaited<ReturnType<typeof uploadImages>>;
type UploadVariables = Parameters<typeof uploadImages>[0];
export const uploadImagesOptions = (
  options?: Partial<UseMutationOptions<UploadData, unknown, UploadVariables>>,
) => {
  return mutationOptions({
    mutationKey: ["upload-images"],
    mutationFn: async (params: UploadVariables) => {
      return await uploadImages(params);
    },
    ...options,
  });
};
