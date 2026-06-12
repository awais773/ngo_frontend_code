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
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 min-h-9 py-1.5 text-xs sm:text-sm">
          <Link
            href="/contact"
            aria-label="Contact Support"
            className="inline-flex shrink-0 items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
          >
            <Icon icon="mdi:headset" className="text-base shrink-0" />
            <span className="hidden sm:inline">Contact Support</span>
            <span className="sm:hidden">Support</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto shrink-0">
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              aria-label={`Call ${phone}`}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
            >
              <Icon icon="mdi:phone" className="text-base shrink-0" />
              <span className="hidden min-[420px]:inline">{phone}</span>
            </Link>

            <span className="text-white/25 hidden sm:inline" aria-hidden="true">
              |
            </span>

            <Link
              href={`mailto:${email}`}
              aria-label={`Email ${email}`}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
            >
              <Icon icon="mdi:email-outline" className="text-base shrink-0" />
              <span className="hidden lg:inline">{email}</span>
            </Link>

            <span className="text-white/25 hidden sm:inline" aria-hidden="true">
              |
            </span>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/90 hover:border-accent hover:text-accent transition-colors"
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
