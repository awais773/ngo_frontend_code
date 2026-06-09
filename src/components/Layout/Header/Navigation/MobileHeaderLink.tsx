import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const path = usePathname();

  let navString

  const counterLetter = item.label.slice(-1);
  if (counterLetter === "s") {
    navString = item.label.toLowerCase().substring(item.label.length - 1, - 1);
  } else {
    navString = item.label.toLowerCase();
  }

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={item.submenu ? handleToggle : undefined}
        className={`flex items-center justify-between w-full py-2.5 px-4 text-black rounded-lg dark:text-white/70 focus:outline-hidden font-medium transition-all duration-150  ${path.startsWith(`/${navString}`) ? "bg-[#0a3d2e] text-white dark:text-white" : null} ${path === item.href ? "bg-[#0a3d2e] text-white dark:text-white" : "hover:bg-gray-100 dark:hover:bg-white/10"
          }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={`transition-transform duration-300 ${submenuOpen ? "rotate-180" : ""}`}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-gray-50 dark:bg-[#0a2219]/50 p-2 w-full rounded-lg mt-1 border border-gray-200 dark:border-white/10">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-150 ${path === subItem.href ? "bg-[#0a3d2e] text-white dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-[#0a3d2e] dark:hover:text-[#C9A227] hover:bg-white dark:hover:bg-white/10"}`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
