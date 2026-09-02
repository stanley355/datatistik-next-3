import { expect, test } from "bun:test";

import { getFirstErroredOptionIndex } from "./option-form-utils.ts";

test("selects only the first invalid option when several collapsed options fail", () => {
  expect(
    getFirstErroredOptionIndex([
      { cn: { message: "Required" } },
      { values: [{ en: { message: "Required" } }] },
    ]),
  ).toBe(0);
});

test("skips valid option slots before the first invalid option", () => {
  expect(
    getFirstErroredOptionIndex([
      undefined,
      undefined,
      { id: { message: "Required" } },
    ]),
  ).toBe(2);
});

test("returns no focus target when options are valid", () => {
  expect(getFirstErroredOptionIndex(undefined)).toBe(-1);
  expect(getFirstErroredOptionIndex([])).toBe(-1);
});
