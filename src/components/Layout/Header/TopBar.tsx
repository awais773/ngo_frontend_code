import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const phone = "+92 1234567890";
const email = "info@myprophetpbuh.org";

const socialLinks = [
  { href: "#", label: "Facebook", icon: "mdi:facebook" },
  { href: "#", label: "Instagram", icon: "mdi:instagram" },
  { href: "#", label: "X", icon: "mdi:twitter" },
  { href: "#", label: "YouTube", icon: "mdi:youtube" },
];

const TopBar = () => {
  return (
    <div className="bg-darkprimary text-white border-b border-white/10">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="flex items-center justify-between h-9 text-xs sm:text-sm">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
          >
            <Icon icon="mdi:headset" className="text-base" />
            Contact Support
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
            >
              <Icon icon="mdi:phone" className="text-base shrink-0" />
              <span>{phone}</span>
            </Link>

            <span className="text-white/25 hidden sm:inline">|</span>

            <Link
              href={`mailto:${email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
            >
              <Icon icon="mdi:email-outline" className="text-base shrink-0" />
              <span>{email}</span>
            </Link>

            <span className="text-white/25 hidden lg:inline">|</span>

            <div className="hidden lg:flex items-center gap-1.5">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25 text-white/90 hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon icon={item.icon} className="text-sm" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
