"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const linkClass =
  "relative text-[14px] font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-darkprimary dark:hover:text-accent";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  if (!item.submenu) {
    return (
      <Link href={item.href} className={`${linkClass} hover:bg-darkprimary/8 dark:hover:bg-accent/10`}>
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <button type="button" className={`${linkClass} flex items-center gap-1.5 hover:bg-darkprimary/8 dark:hover:bg-accent/10 group`}>
        {item.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`transition-transform duration-300 group-hover:text-darkprimary dark:group-hover:text-accent ${submenuOpen ? "rotate-180" : ""}`}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="m6 9l6 6l6-6"
          />
        </svg>
      </button>
      {submenuOpen && (
        <div className="absolute left-0 top-full pt-3 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-darkmode rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 py-3 overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className="block px-4 py-2.5 text-sm font-medium transition-all duration-150 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-darkprimary/10 hover:to-accent/10 hover:text-darkprimary dark:hover:text-accent hover:pl-5 border-l-2 border-transparent hover:border-l-accent"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
