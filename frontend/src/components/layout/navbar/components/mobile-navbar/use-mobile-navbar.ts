import { useState } from "react";
import { OptionMenu } from "../../types";

type MobileSidebar = {
  isOpen: boolean;
  onToggle: () => void;
  optionsMenu: OptionMenu[];
};

export default function useMobileNavbar(): MobileSidebar {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

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
    isOpen,
    onToggle,
    optionsMenu,
  };
}
