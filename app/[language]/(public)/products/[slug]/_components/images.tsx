import { S3Image } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useState } from "react";
type DynamicProductImagesProps = {
  images: S3Image[];
  coverIndex: number;
};

export const DynamicProductImages = ({
  images,
  coverIndex,
}: DynamicProductImagesProps) => {
  const [count, setCount] = useState(coverIndex - 1);
  return (
    <div className="flex flex-col gap-4">
      <Carousel className="w-full relative" opts={{ startIndex: count }}>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={`carousel_${index}`} className="lg:p-2">
              <img
                src={[img.endpoint, img.bucket, img.key].join("/")}
                alt="Product Image"
                width={400}
                height={400}
                className="w-full max-h-64 lg:max-h-96 object-cover aspect-square shadow rounded"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4  flex items-center gap-4  ">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="hidden lg:flex items-center gap-4">
        {images.map((img, index) => (
          <Button
            key={`carousel_btn_${index}`}
            variant="outline"
            size="icon-lg"
            onClick={() => setCount(index)}
          >
            <img
              src={[img.endpoint, img.bucket, img.key].join("/")}
              alt="Product Image"
              width={400}
              height={400}
              className=" object-cover aspect-square rounded"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};
