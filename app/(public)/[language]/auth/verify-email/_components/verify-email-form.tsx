import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { authSendVerificationEmail, isAuthError } from "@/lib/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const verifyEmailFormSchema = z.object({
  email: z.email().min(1, "Email can't be empty"),
});
export const VerifyEmailForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof verifyEmailFormSchema>>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof verifyEmailFormSchema>) {
    try {
      const signUp = await authSendVerificationEmail(data.email);
      if (!signUp) {
        toast.error("Something went wrong, please try again later");
        return;
      }
      if (isAuthError(signUp)) {
        toast.warning(signUp.message);
        return;
      }

      toast.success("Email verification sent, please check your inbox/spam.");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again later");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>EMAIL VERIFICATION EXPIRED</CardTitle>
        <CardDescription>
          Please enter your email for another verification
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Send Verification Email</Button>
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to Login
            </Link>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
