"use client";

import { usePathname } from "next/navigation";
import BreadcrumbsLink from "./components/breadcrumbs-link";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs: Breadcrumbs[] = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Faqs", path: "/faqs" },
    { name: "Authentication", path: "/auth" },
  ];

  const breadcrumbsinPathname = breadcrumbs.filter((breadcrumb) =>
    pathname.includes(breadcrumb.path)
  );

  return (
    <div className="w-full h-16 bg-gray-100">
      <div className="container h-full flex items-center mb-10">
        <ol className="flex gap-2">
          {breadcrumbsinPathname.map((breadcrumb, index) => (
            <BreadcrumbsLink
              key={index}
              {...breadcrumb}
              showArrow={breadcrumbsinPathname.length - 1 !== index}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
