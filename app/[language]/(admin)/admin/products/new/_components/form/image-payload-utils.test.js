import { expect, test } from "bun:test";

import { orderProductImages } from "./image-payload-utils.ts";

const existingFirst = {
  endpoint: "https://images.example",
  bucket: "products",
  key: "first.jpg",
};
const existingSecond = {
  endpoint: "https://images.example",
  bucket: "products",
  key: "second.jpg",
};
const uploadedImage = {
  endpoint: "https://images.example",
  bucket: "products",
  key: "new.jpg",
};

test("serializes existing and uploaded images in the form's exact order", () => {
  expect(
    orderProductImages(
      [
        "https://images.example/products/second.jpg",
        "blob:new-image",
        "https://images.example/products/first.jpg",
      ],
      [existingFirst, existingSecond],
      [uploadedImage],
    ),
  ).toEqual([existingSecond, uploadedImage, existingFirst]);
});

test("omits existing images removed from the form", () => {
  expect(
    orderProductImages(
      ["https://images.example/products/second.jpg"],
      [existingFirst, existingSecond],
      [],
    ),
  ).toEqual([existingSecond]);
});
