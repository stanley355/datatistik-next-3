"use client";
import { SearchNavigation } from "./search-navigation";
import { SearchSuggestion } from "./search-suggestion";

export const Search = () => {
  return (
    <div className="flex flex-col gap-4 mt-16 p-4">
      <SearchNavigation />
      <SearchSuggestion />
    </div>
  );
};
