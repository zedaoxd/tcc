import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid, List } from "lucide-react";
import SearchBar from "../search-bar";
import Link from "next/link";

type HeaderProps = {
  searchParams: { search?: string; listType?: "list" | "grid" };
};

export default function Header({ searchParams }: HeaderProps) {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-semibold leading-10 capitalize">
        All Courses
      </h1>

      <div className="flex items-center gap-0">
        <SearchBar searchParams={searchParams} />

        <Button variant="ghost" size="icon" asChild>
          <Link
            href={{
              pathname: "/courses",
              query: { ...searchParams, listType: "grid" },
            }}
          >
            <Grid
              className={cn(
                "h-6 w-6",
                searchParams?.listType === "grid"
                  ? "text-primary"
                  : "text-black"
              )}
            />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" asChild>
          <Link
            href={{
              pathname: "/courses",
              query: { ...searchParams, listType: "list" },
            }}
          >
            <List
              className={cn(
                "h-6 w-6",
                searchParams.listType === undefined ||
                  searchParams.listType === "list"
                  ? "text-primary"
                  : "text-black"
              )}
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}
