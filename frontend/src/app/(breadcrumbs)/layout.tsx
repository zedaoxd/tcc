import Breadcrumbs from "@/components/layout/bread-crumbs";

export default function BreadcrumbsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  );
}
