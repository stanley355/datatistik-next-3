import { Account } from "./_components";
import { AuthPage } from "@/components/custom-ui/auth-page";

export default function Page() {
  return (
    <AuthPage>
      <div className="container mx-auto mt-16 p-4 min-h-screen">
        <Account />
      </div>
    </AuthPage>
  );
}
