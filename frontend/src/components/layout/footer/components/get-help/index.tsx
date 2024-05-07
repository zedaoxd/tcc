import FooterArea, { Links } from "../footer-area";

export default function GetHelp() {
  const links: Links = [
    {
      label: "Contact Us",
      href: "/contect-us",
    },
    {
      label: "Latest Articles",
      href: "/articles",
    },
    {
      label: "FAQs",
      href: "/faqs",
    },
  ];

  return <FooterArea title="Get Help" links={links} />;
}
