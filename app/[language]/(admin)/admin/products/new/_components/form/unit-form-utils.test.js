import { expect, test } from "bun:test";

import {
  getUnitFormValue,
  normalizeOptionalLocalization,
} from "./unit-form-utils.ts";

test("provides blank create defaults and preserves edit unit values", () => {
  expect(getUnitFormValue(undefined)).toEqual({ cn: "", en: "", id: "" });
  expect(getUnitFormValue({ cn: "件", en: "piece", id: "buah" })).toEqual({
    cn: "件",
    en: "piece",
    id: "buah",
  });
});

test("omits an entirely blank localized unit", () => {
  expect(
    normalizeOptionalLocalization({ cn: "  ", en: "", id: "   " }),
  ).toBeUndefined();
  expect(normalizeOptionalLocalization(undefined)).toBeUndefined();
});

test("returns trimmed complete localized units", () => {
  expect(
    normalizeOptionalLocalization({
      cn: " 件 ",
      en: " piece ",
      id: " buah ",
    }),
  ).toEqual({ cn: "件", en: "piece", id: "buah" });
});

test("rejects partial localized units at the payload boundary", () => {
  expect(() =>
    normalizeOptionalLocalization({ cn: "件", en: "", id: "buah" }),
  ).toThrow("Unit requires Chinese, English, and Indonesian values");
});
