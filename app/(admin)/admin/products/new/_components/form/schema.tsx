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

const optionValueSchema = z.object({
  id: z.string().min(1, "EN localization is missing"),
  en: z.string().min(1, "ID localization is missing"),
  cn: z.string().min(1, "CN localization is missing"),
  price_addition: z.number().min(0, "Additional Price can't be negative"),
  image: z
    .instanceof(File, { message: "Please select an image file" })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    )
    .optional(),
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
  options: z.array(optionSchema).optional(),
});
