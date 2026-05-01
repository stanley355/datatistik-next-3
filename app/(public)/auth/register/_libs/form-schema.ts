import * as z from "zod";

export const registrationFormSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.email().min(1, "Email can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
});
