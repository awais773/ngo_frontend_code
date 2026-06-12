"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import {
  NavChevron,
  navLinkBaseClass,
  navLinkClass,
  navSubmenuLinkClass,
  navSubmenuPanelClass,
} from "./navigationStyles";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  if (!item.submenu) {
    return (
      <Link href={item.href} className={navLinkBaseClass}>
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
      <button type="button" className={`${navLinkClass} group`}>
        <span>{item.label}</span>
        <NavChevron open={submenuOpen} />
      </button>
      {submenuOpen && (
        <div className="absolute left-0 top-full z-50 w-56 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={navSubmenuPanelClass}>
            {item.submenu.map((subItem, index) => (
              <Link key={index} href={subItem.href} className={navSubmenuLinkClass}>
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
