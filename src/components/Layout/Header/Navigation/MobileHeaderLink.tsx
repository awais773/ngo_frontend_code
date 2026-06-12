"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import {
  NavChevron,
  navLinkClass,
  navSubmenuLinkClass,
  navSubmenuPanelClass,
} from "./navigationStyles";

interface MobileHeaderLinkProps {
  item: HeaderItem;
  onNavigate?: () => void;
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  if (!item.submenu) {
    return (
      <Link href={item.href} onClick={onNavigate} className={navLinkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setSubmenuOpen(!submenuOpen)}
        className={navLinkClass}
        aria-expanded={submenuOpen}
      >
        <span>{item.label}</span>
        <NavChevron open={submenuOpen} />
      </button>
      {submenuOpen && (
        <div className={navSubmenuPanelClass}>
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={onNavigate}
              className={navSubmenuLinkClass}
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
