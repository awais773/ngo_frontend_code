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
      { label: "Photos", href: "/media/photos" },
      { label: "Videos", href: "/media/videos" },
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
  { label: "Contact", href: "/contact" },
];
