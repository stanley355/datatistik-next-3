import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export function RegisterCard() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Register account</CardTitle>
        <CardDescription>
          Enter your credential below to create new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
