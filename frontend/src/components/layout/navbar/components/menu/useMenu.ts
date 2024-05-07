import { OptionMenu } from "../../types";

export default function useMenu() {
  const optionsMenu: OptionMenu[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Courses",
      href: "/courses",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "FAQs",
      href: "/faqs",
    },
  ];

  return {
    optionsMenu,
  };
}
