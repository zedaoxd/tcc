"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GetBoughtCourse } from "../../../services";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columnHelper = createColumnHelper<GetBoughtCourse>();

export const columns: ColumnDef<GetBoughtCourse, any>[] = [
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ getValue, row }) => (
      <Link href={`/courses/watch/${row.original.id}`}>{getValue()}</Link>
    ),
  }),

  columnHelper.accessor("author", {
    header: "Author",
    cell: ({ getValue }) => `${getValue().firstName} ${getValue().lastName}`,
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ getValue }) => getValue().name,
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="none">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link href={`/courses/watch/${course.id}`}>Watch</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Share</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              Refound
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
