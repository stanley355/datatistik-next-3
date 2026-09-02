import type { S3Image } from "@/lib/types";

export const orderProductImages = (
  orderedUrls: string[],
  currentImages: S3Image[],
  uploadedImages: S3Image[],
) => {
  const currentImagesByUrl = new Map(
    currentImages.map((image) => [
      [image.endpoint, image.bucket, image.key].join("/"),
      image,
    ]),
  );
  let uploadedImageIndex = 0;

  return orderedUrls.map((url) => {
    if (url.startsWith("blob:")) {
      const uploadedImage = uploadedImages[uploadedImageIndex];
      uploadedImageIndex += 1;

      if (!uploadedImage) {
        throw new Error(`Missing uploaded image for ${url}`);
      }

      return uploadedImage;
    }

    const currentImage = currentImagesByUrl.get(url);
    if (!currentImage) {
      throw new Error(`Missing existing image for ${url}`);
    }

    return currentImage;
  });
};
