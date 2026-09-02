type ImageOrderResult = {
  images: string[];
  coverNumber: number;
};

type ImageRemovalResult = ImageOrderResult & {
  removedImage: string | undefined;
};

export function moveImage(
  images: string[],
  coverNumber: number,
  fromIndex: number,
  toIndex: number,
): ImageOrderResult {
  const coverImage = images[coverNumber - 1];
  const nextImages = [...images];
  const [movedImage] = nextImages.splice(fromIndex, 1);

  nextImages.splice(toIndex, 0, movedImage);

  return {
    images: nextImages,
    coverNumber: nextImages.indexOf(coverImage) + 1,
  };
}

export function removeImage(
  images: string[],
  coverNumber: number,
  removeIndex: number,
): ImageRemovalResult {
  const coverImage = images[coverNumber - 1];
  const nextImages = [...images];
  const [removedImage] = nextImages.splice(removeIndex, 1);

  if (nextImages.length === 0) {
    return { images: nextImages, coverNumber: 1, removedImage };
  }

  const coverIndex = nextImages.indexOf(coverImage);

  return {
    images: nextImages,
    coverNumber:
      coverIndex >= 0 ? coverIndex + 1 : Math.min(removeIndex + 1, nextImages.length),
    removedImage,
  };
}
