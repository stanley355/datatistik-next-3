import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const VerifyEmailLoading = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>DELIFUNDS</CardTitle>
        <CardDescription>Verifying your email...</CardDescription>
      </CardHeader>
    </Card>
  );
};
