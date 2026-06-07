import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { SearchForm } from "./search-form";

export const SearchNavigation = () => {
  const router = useRouter();
  return (
    <div className="shadow bg-background fixed top-0 left-0 w-full p-2 z-10">
      <div className="flex items-center gap-2 border rounded">
        <Button
          type="button"
          onClick={() => router.back()}
          size="icon"
          variant="link"
        >
          <LuArrowLeft />
        </Button>

        <SearchForm />
      </div>
    </div>
  );
};
