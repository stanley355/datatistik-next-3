// import { LoginForm } from "./_components";

import { VerifyEmail } from "./_components";

type PageParams = {
  searchParams: Promise<{ token: string }>;
};

export default async function Page({ searchParams }: PageParams) {
  const { token } = await searchParams;
  return (
    <div className="container mx-auto flex items-center justify-center min-h-96 p-4">
      <VerifyEmail token={token} />
    </div>
  );
}
