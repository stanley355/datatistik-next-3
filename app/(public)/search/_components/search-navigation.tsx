import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuSearch } from "react-icons/lu";

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

        <form className="contents">
          <Input
            type="text"
            placeholder="Search Delifunds"
            className="border-none focus-visible:ring-transparent"
          />

          <Button
            type="button"
            onClick={() => router.back()}
            size="icon"
            variant="link"
          >
            <LuSearch />
          </Button>
        </form>
      </div>
    </div>
  );
};
