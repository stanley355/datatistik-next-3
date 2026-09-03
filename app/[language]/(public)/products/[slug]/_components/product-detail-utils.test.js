import { describe, expect, test } from "bun:test";

import {
  formatProductPrice,
  normalizeCoverIndex,
} from "./product-detail-utils.ts";

describe("product gallery cover index", () => {
  test("converts a one-based cover number to a zero-based index", () => {
    expect(normalizeCoverIndex(2, 4)).toBe(1);
  });

  test("clamps cover numbers outside the available image range", () => {
    expect(normalizeCoverIndex(0, 4)).toBe(0);
    expect(normalizeCoverIndex(8, 4)).toBe(3);
  });

  test("uses the first slot when there are no images or no cover number", () => {
    expect(normalizeCoverIndex(undefined, 3)).toBe(0);
    expect(normalizeCoverIndex(1, 0)).toBe(0);
  });
});

describe("product price labels", () => {
  const formatIdr = (rmbAmount) => `Rp${(rmbAmount * 2_500).toLocaleString("id-ID")}`;

  test("formats RMB minor units instead of displaying raw cents", () => {
    expect(
      formatProductPrice({
        amountInMinorUnits: 12_345,
        currency: "RMB",
        formatIdr,
      }),
    ).toBe("RMB123.45");
  });

  test("formats IDR through the existing RMB conversion boundary", () => {
    expect(
      formatProductPrice({
        amountInMinorUnits: 12_345,
        currency: "IDR",
        formatIdr,
      }),
    ).toBe("Rp308.625");
  });

  test("appends a localized unit only when it contains text", () => {
    expect(
      formatProductPrice({
        amountInMinorUnits: 10_000,
        currency: "RMB",
        localizedUnit: " carton ",
        formatIdr,
      }),
    ).toBe("RMB100 / carton");

    expect(
      formatProductPrice({
        amountInMinorUnits: 10_000,
        currency: "RMB",
        localizedUnit: "   ",
        formatIdr,
      }),
    ).toBe("RMB100");
  });

  test("includes selected option additions in the formatted total", () => {
    expect(
      formatProductPrice({
        amountInMinorUnits: 10_000 + 750 + 250,
        currency: "RMB",
        formatIdr,
      }),
    ).toBe("RMB110");
  });
});
