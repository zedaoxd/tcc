import FooterArea, { Links } from "../footer-area";

export default function Programs() {
  const links: Links = [
    {
      label: "Art & Design",
      href: "/course?type=art-design",
    },
    {
      label: "Business",
      href: "/course?type=business",
    },
    {
      label: "IT & Software",
      href: "/course?type=it-software",
    },
    {
      label: "Languages",
      href: "/course?type=languages",
    },
    {
      label: "Marketing",
      href: "/course?type=marketing",
    },
  ];

  return <FooterArea title="Programs" links={links} />;
}
