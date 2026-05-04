import * as z from "zod";

export const registrationFormSchema = z
  .object({
    name: z.string().min(1, "Name can't be empty"),
    email: z.email().min(1, "Email can't be empty"),
    password: z.string().min(8, "Minimum Password is 8 characters long"),
    repassword: z.string().min(8, "Minimum Password is 8 characters long"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"], // This sets the error specifically to the repassword field
  });
