import { expect, test } from "bun:test";

import { formatIdr } from "./price-form-utils.ts";

test("formats IDR amounts consistently across server and browser locales", () => {
  expect(formatIdr(2500)).toBe("2.500");
  expect(formatIdr(1250000)).toBe("1.250.000");
});
