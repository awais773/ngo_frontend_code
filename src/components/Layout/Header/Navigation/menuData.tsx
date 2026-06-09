import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blogs", href: "/blog" },
  {
    label: "About",
    href: "#",
    submenu: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Board Members", href: "/board-members" },
    ],
  },
  {
    label: "What We Do",
    href: "#",
    submenu: [
      { label: "Projects", href: "/projects" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Media",
    href: "#",
    submenu: [
      { label: "Gallery", href: "/media?type=image" },
      { label: "Videos", href: "/media?type=video" },
    ],
  },
  {
    label: "Tools",
    href: "#",
    submenu: [
      { label: "Zakat Calculator", href: "/zakat-calculator" },
      { label: "Fitrana Calculator", href: "/fitrana-calculator" },
    ],
  },
  {
    label: "More",
    href: "#",
    submenu: [
      { label: "Compliance", href: "/compliance" },
      { label: "Reports", href: "/reports" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
