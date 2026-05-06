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
    <div className="container mx-auto flex items-center justify-center min-h-96 p-4">
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
