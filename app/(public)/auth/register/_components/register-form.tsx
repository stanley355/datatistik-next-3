"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { registrationFormSchema } from "../_libs/form-schema";
import { authSignUpEmail, isAuthError } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof registrationFormSchema>) {
    try {
      const signUp = await authSignUpEmail(data);
      if (!signUp) {
        toast.error("Something went wrong, please try again later");
        return;
      }
      if (isAuthError(signUp)) {
        toast.warning(signUp.message);
        return;
      }

      toast.success(
        "Registration successful, please check your email for verification.",
      );
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again later");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="John Doe"
                required
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="email@email.com"
                required
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">
                Password (8 characters minimum)
              </FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                required
                aria-invalid={fieldState.invalid}
                placeholder="********"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Register</Button>
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Have an Account? Login
          </Link>
        </Field>
      </FieldGroup>
    </form>
  );
}
