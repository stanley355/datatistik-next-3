import z from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const localizationSchema = z.object({
  id: z.string().min(1, "EN localization is missing"),
  en: z.string().min(1, "ID localization is missing"),
  cn: z.string().min(1, "CN localization is missing"),
});

// const imageSchema = z.object({
//   endpoint: z.string().min(1, "Image is missing"),
//   bucket: z.string().min(1, "Image is missing"),
//   key: z.string().min(1, "Image is missing"),
// });

const optionValueSchema = z.object({
  id: z.string().min(1, "EN localization is missing"),
  en: z.string().min(1, "ID localization is missing"),
  cn: z.string().min(1, "CN localization is missing"),
  price_addition: z.number().min(0, "Additional Price can't be negative"),
  image_url: z.string().optional(),
});

const optionSchema = z.object({
  id: z.string().min(1, "EN localization is missing"),
  en: z.string().min(1, "ID localization is missing"),
  cn: z.string().min(1, "CN localization is missing"),
  values: z.array(optionValueSchema).min(1, "Option Value is missing"),
});

export const formSchema = z.object({
  title: localizationSchema,
  description: localizationSchema,
  is_available: z.boolean(),
  price: z.number().min(1),
  image_urls: z.array(z.string()).min(1, "Missing product image"),
  image_cover_number: z
    .number()
    .min(1, "Image cover number can't be less than 1"),
  options: z.array(optionSchema).optional(),
  source_url: z.string().optional(),
});
