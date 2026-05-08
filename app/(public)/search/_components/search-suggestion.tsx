import { CATEGORIES } from "@/lib/constant/categories";
import Link from "next/link";

export const SearchSuggestion = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <h3 className="font-bold font-mono text-sm ">Search Suggestions</h3>

      <div className="flex flex-col">
        {CATEGORIES.map((cat) => (
          <Link href="/products" key={cat.label} className="border-b py-2">
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
