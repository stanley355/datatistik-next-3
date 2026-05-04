import { Card, CardContent } from "@/components/ui/card";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export default function Page() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-96 p-4">
      <Card>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
