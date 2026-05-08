import { Card, CardContent } from "@/components/ui/card";
import { VerifyEmail } from "./_components";

type PageParams = {
  searchParams: Promise<{ token: string }>;
};

export default async function Page({ searchParams }: PageParams) {
  const { token } = await searchParams;
  return (
    <div className="container mx-auto flex items-start justify-center min-h-screen p-4 mt-16">
      <VerifyEmail token={token} />
    </div>
  );
}
