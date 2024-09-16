"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCreatedCourses } from "../../../services";
import { columns } from "./columns";
import { Table } from "@/components/shared/table";

export const CreatedCourseTable = () => {
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["createdCourses"],
    queryFn: () => getCreatedCourses(session.data?.token as string),
    initialData: [],
  });

  return <Table columns={columns} data={data} />;
};
