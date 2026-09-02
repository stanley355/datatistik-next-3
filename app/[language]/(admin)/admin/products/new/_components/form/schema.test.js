import { expect, test } from "bun:test";

import { productFormSchema } from "./schema.ts";

const validProduct = {
  title: { cn: "标题", en: "Title", id: "Judul" },
  description: { cn: "描述", en: "Description", id: "Deskripsi" },
  is_available: true,
  price: 10,
  image_urls: ["blob:product-image"],
  image_cover_number: 1,
  options: [],
  source_url: "",
};

test("accepts an entirely blank localized unit", () => {
  const result = productFormSchema.safeParse({
    ...validProduct,
    unit: { cn: "", en: "", id: "" },
  });

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data.unit).toEqual({ cn: "", en: "", id: "" });
  }
});

test("requires every unit locale after one locale is entered", () => {
  const result = productFormSchema.safeParse({
    ...validProduct,
    unit: { cn: "件", en: "", id: "" },
  });

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues.map((issue) => issue.path.join("."))).toEqual([
      "unit.en",
      "unit.id",
    ]);
  }
});

test("trims complete localized unit values", () => {
  const result = productFormSchema.safeParse({
    ...validProduct,
    unit: { cn: " 件 ", en: " piece ", id: " buah " },
  });

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data.unit).toEqual({ cn: "件", en: "piece", id: "buah" });
  }
});
