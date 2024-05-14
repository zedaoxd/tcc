"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  search: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type SearchBarProps = {
  searchParams: { search?: string };
};

export default function SearchBar({ searchParams }: SearchBarProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams?.search ?? "",
    },
  });

  function onSubmit(values: FormValues) {
    const { search } = values;

    const params = new URLSearchParams({ ...searchParams, search });

    router.replace(`/courses?${params.toString()}`);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2 border-b border-black overflow-hidden text-black">
                    <Input
                      {...field}
                      placeholder="Search for courses"
                      className="outline-none focus-visible:ring-transparent border-none rounded-none py-0"
                    />
                    <Search />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
