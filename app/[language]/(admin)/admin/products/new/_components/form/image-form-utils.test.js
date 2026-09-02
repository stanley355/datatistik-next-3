import { describe, expect, test } from "bun:test";

import { moveImage, removeImage } from "./image-form-utils.ts";

describe("image cover ordering", () => {
  test("moving the cover image keeps the same image selected", () => {
    expect(moveImage(["first", "cover", "last"], 2, 1, 0)).toEqual({
      images: ["cover", "first", "last"],
      coverNumber: 1,
    });
  });

  test("moving an image around the cover updates the cover position", () => {
    expect(moveImage(["first", "cover", "last"], 2, 0, 2)).toEqual({
      images: ["cover", "last", "first"],
      coverNumber: 1,
    });
  });

  test("removing an image before the cover decrements the cover position", () => {
    expect(removeImage(["first", "middle", "cover"], 3, 0)).toEqual({
      images: ["middle", "cover"],
      coverNumber: 2,
      removedImage: "first",
    });
  });

  test("removing the cover selects the image that takes its place", () => {
    expect(removeImage(["first", "cover", "last"], 2, 1)).toEqual({
      images: ["first", "last"],
      coverNumber: 2,
      removedImage: "cover",
    });
  });

  test("removing the final cover falls back to the previous image", () => {
    expect(removeImage(["first", "middle", "cover"], 3, 2)).toEqual({
      images: ["first", "middle"],
      coverNumber: 2,
      removedImage: "cover",
    });
  });

  test("removing the only image restores the schema-compatible cover default", () => {
    expect(removeImage(["only"], 1, 0)).toEqual({
      images: [],
      coverNumber: 1,
      removedImage: "only",
    });
  });
});
