import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import {
  authResetPassword,
  authSendVerificationEmail,
  isAuthError,
} from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ResetPasswordFormProps = {
  token: string;
};

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Minimum Password is 8 characters long"),
    repassword: z.string().min(8, "Minimum Password is 8 characters long"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ["repassword"], // This sets the error specifically to the repassword field
  });

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      repassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
    try {
      const signUp = await authResetPassword(data.password, token);
      if (!signUp) {
        toast.error("Something went wrong, please try again later");
        return;
      }
      if (isAuthError(signUp)) {
        toast.warning(signUp.message);
        return;
      }
      toast.success("Reset password successful, please login to continue.");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again later");
    }
  }

  return (
    <div className="w-full ">
      <form
        className="flex flex-col gap-4 max-w-96"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Controller
          name="repassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="repassword">
                Re-type Password (8 characters minimum)
              </FieldLabel>
              <Input
                {...field}
                id="repassword"
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
          <Button type="submit">Reset my Password</Button>
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to Login
          </Link>
        </Field>
      </form>
    </div>
  );
};
