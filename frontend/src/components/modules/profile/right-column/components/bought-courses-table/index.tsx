"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getBoughtCourses } from "../../../services";
import { columns } from "./columns";
import { Table } from "@/components/shared/table";

export const BoughtCourseTable = () => {
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["boughtCourses"],
    queryFn: () => getBoughtCourses(session.data?.token as string),
    initialData: [],
  });

  return <Table columns={columns} data={data} />;
};
