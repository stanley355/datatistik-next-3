import z from "zod";

const localizationSchema = z.object({
  id: z.string().min(1, "EN localization is missing"),
  en: z.string().min(1, "ID localization is missing"),
  cn: z.string().min(1, "CN localization is missing"),
});

export const formSchema = z.object({
  title: localizationSchema,
  description: localizationSchema,
  is_available: z.boolean(),
  price: z.number().min(1)
});
