"use client";
import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { authRequestPasswordReset, isAuthError } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";

const verifyEmailFormSchema = z.object({
  email: z.email().min(1, "Email can't be empty"),
});
export const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof verifyEmailFormSchema>>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof verifyEmailFormSchema>) {
    try {
      const signUp = await authRequestPasswordReset(data.email);
      if (!signUp) {
        toast.error("Something went wrong, please try again later");
        return;
      }
      if (isAuthError(signUp)) {
        toast.warning(signUp.message);
        return;
      }

      toast.success(
        "Password Reset Request received, please check your email for verification.",
      );
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again later");
    }
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-96"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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

      <Field>
        <Button type="submit">Send Reset Password Link</Button>
        <Link
          href="/auth/login"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back to Login
        </Link>
      </Field>
    </form>
  );
};
