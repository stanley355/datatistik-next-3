import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authGetSessionOptions } from "@/hooks/auth";
import { authGetSession, isAuthError } from "@/lib/api";
import { createUserSearch } from "@/lib/api/user_search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import z from "zod";

const searchFormSchema = z.object({
  keyword: z.string().optional(),
});

export const SearchForm = () => {
  const session = useQuery(authGetSessionOptions());
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof searchFormSchema>) {
    try {
      if (data.keyword) {
        if (session.data && !isAuthError(session.data) && session?.data.user) {
          createUserSearch(data.keyword, session?.data.user.id);
        } else {
          createUserSearch(data.keyword);
        }
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
