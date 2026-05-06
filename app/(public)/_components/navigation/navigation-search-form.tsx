import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";

export const NavigationSearchForm = () => {
  return (
    <form className="hidden sm:flex bg-background rounded flex-1 border">
      <Input
        type="text"
        placeholder="Search Delifunds"
        className="border-none focus-visible:ring-transparent placeholder:text-sm"
      />
      <Button type="submit" size="icon" variant="ghost">
        <LuSearch />
      </Button>
    </form>
  );
};
