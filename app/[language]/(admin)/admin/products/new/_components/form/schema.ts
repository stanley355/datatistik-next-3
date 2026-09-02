import z from "zod";

const chineseLocalizationMissing = "Chinese localization is missing";
const englishLocalizationMissing = "English localization is missing";
const indoLocalizationMissing = "Indonesian localization is missing";

const localizationSchema = z.object({
  cn: z.string().min(1, chineseLocalizationMissing),
  en: z.string().min(1, englishLocalizationMissing),
  id: z.string().min(1, indoLocalizationMissing),
});

const unitLocalizationSchema = z
  .object({
    cn: z.string().trim(),
    en: z.string().trim(),
    id: z.string().trim(),
  })
  .superRefine((unit, context) => {
    if (!unit.cn && !unit.en && !unit.id) return;

    const languages = [
      { key: "cn", message: "Chinese unit is missing" },
      { key: "en", message: "English unit is missing" },
      { key: "id", message: "Indonesian unit is missing" },
    ] as const;

    languages.forEach((language) => {
      if (unit[language.key]) return;

      context.addIssue({
        code: "custom",
        message: language.message,
        path: [language.key],
      });
    });
  });

const optionValueSchema = z.object({
  cn: z.string().min(1, chineseLocalizationMissing),
  en: z.string().min(1, englishLocalizationMissing),
  id: z.string().min(1, indoLocalizationMissing),
  price_addition: z.number().min(0, "Additional Price can't be negative"),
  image_url: z.string().optional(),
});

const optionSchema = z.object({
  cn: z.string().min(1, chineseLocalizationMissing),
  en: z.string().min(1, englishLocalizationMissing),
  id: z.string().min(1, indoLocalizationMissing),
  values: z.array(optionValueSchema).min(1, "Option Value is missing"),
});

export const productFormSchema = z.object({
  title: localizationSchema,
  description: localizationSchema,
  unit: unitLocalizationSchema.optional(),
  is_available: z.boolean(),
  price: z.number().min(1),
  image_urls: z.array(z.string()).min(1, "Missing product image"),
  image_cover_number: z
    .number()
    .min(1, "Image cover number can't be less than 1"),
  options: z.array(optionSchema).optional(),
  source_url: z.string().optional(),
});
