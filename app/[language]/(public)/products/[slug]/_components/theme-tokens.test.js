import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test("product details use the app theme instead of a private color palette", () => {
  const routeDirectory = join(import.meta.dir, "..");
  const sourceFiles = [
    ...new Bun.Glob("**/*.tsx").scanSync({ cwd: routeDirectory }),
    ...new Bun.Glob("**/*.css").scanSync({ cwd: routeDirectory }),
  ];
  const violations = sourceFiles.filter((file) => {
    const source = readFileSync(join(routeDirectory, file), "utf8");

    return (
      source.includes("--sample-") ||
      /#[\da-f]{3,8}/i.test(source) ||
      /rgba?\(/i.test(source)
    );
  });

  expect(violations).toEqual([]);
});
