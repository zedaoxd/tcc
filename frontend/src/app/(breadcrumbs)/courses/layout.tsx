import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
};

export default function CourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
