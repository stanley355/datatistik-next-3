import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export default function Page() {
  return (
    <div className="container mx-auto flex items-start justify-center min-h-screen p-4 mt-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>FORGOT PASSWORD</CardTitle>
          <CardDescription>
            Please enter your email for verification
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
