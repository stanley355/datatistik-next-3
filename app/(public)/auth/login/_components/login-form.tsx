"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authGetSessionOptions } from "@/hooks/auth";
import { authGetSession, authSignIn, isAuthError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
  email: z.email().min(1, "Email can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
});

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      const signUp = await authSignIn(data.email, data.password);
      if (!signUp) {
        toast.error("Something went wrong, please try again later");
        return;
      }
      if (isAuthError(signUp)) {
        toast.warning(signUp.message);
        return;
      }

      toast.success("Login Successful");
      queryClient.invalidateQueries({
        queryKey: authGetSessionOptions().queryKey,
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again later");
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
          <Button type="submit">Login</Button>
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Register New Account
          </Link>
        </Field>
      </FieldGroup>
    </form>
  );
}
