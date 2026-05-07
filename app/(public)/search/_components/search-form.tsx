import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createUserSearch } from "@/lib/api/user_search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import z from "zod";

const searchFormSchema = z.object({
  keyword: z.string().optional(),
});

export const SearchForm = () => {
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  function onSubmit(data: z.infer<typeof searchFormSchema>) {
    try {
      if (data.keyword) {
        createUserSearch(data.keyword);
      }
      return;
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="keyword"
        control={form.control}
        render={({ field }) => (
          <Input
            {...field}
            id="keyword"
            name="keyword"
            type="text"
            placeholder="Search Delifunds"
            className="border-none focus-visible:ring-transparent placeholder:text-sm px-0"
          />
        )}
      />

      <Button type="button" size="icon" variant="link">
        <LuSearch />
      </Button>
    </form>
  );
};
