import { S3Image } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type DynamicProductImagesProps = {
  images: S3Image[];
};

export const DynamicProductImages = ({ images }: DynamicProductImagesProps) => {
  return (
    <Carousel className="w-full relative shadow">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-2">
              <img
                src={[img.endpoint, img.bucket, img.key].join("/")}
                alt="Product Image"
                width={400}
                height={400}
                className="w-full max-h-64 object-cover aspect-square"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 right-4  flex items-center gap-4  ">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
