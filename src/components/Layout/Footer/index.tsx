import Link from "next/link";
import Image from "next/image";
import Logo from "../Header/Logo";
import { brandTagline } from "@/config/brand";

const footerNav = [
  { link: "Our Work", href: "/our-work" },
  { link: "Projects", href: "/projects" },
  { link: "Events", href: "/events" },
  { link: "Photos", href: "/media/photos" },
  { link: "Videos", href: "/media/videos" },
  { link: "Blogs", href: "/blog" },
  { link: "Donate", href: "/donate" },
  { link: "Zakat Calculator", href: "/zakat-calculator" },
  { link: "About", href: "/about" },
  { link: "Contact", href: "/contact" },
  { link: "Compliance", href: "/compliance" },
  { link: "Reports", href: "/reports" },
];

const Footer = async () => {
  const email = "info@verifiedneedy.org";
  const phone = "+92 1234567890";
  const address = "Lahore, Pakistan";

  return (
    <footer className="bg-darkprimary text-white">
      <div className="brand-stripe" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          <div className="md:col-span-5">
            <Logo variant="footer" size="lg" />
            <p className="text-white/75 mt-5 mb-6 max-w-sm text-sm leading-relaxed">
              {brandTagline} — verified humanitarian support, education, healthcare, and community relief worldwide.
            </p>
            <Link href="/donate" className="btn-brand-primary text-base px-6 py-3 rounded-lg">
              Donate Now
            </Link>
          </div>
          <div className="md:col-span-4">
            <h5 className="text-lg font-semibold mb-5">Contact</h5>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex gap-3">
                <Image src="/images/icons/icon-pin.svg" alt="" width={20} height={20} className="brightness-0 invert shrink-0 mt-0.5" />
                <p>{address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <Image src="/images/icons/icon-phone.svg" alt="" width={20} height={20} className="brightness-0 invert shrink-0" />
                <Link href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-secondary">{phone}</Link>
              </div>
              <div className="flex gap-3 items-center">
                <Image src="/images/icons/icon-mail.svg" alt="" width={20} height={20} className="brightness-0 invert shrink-0" />
                <Link href={`mailto:${email}`} className="hover:text-secondary">{email}</Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 hover:text-secondary transition">
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto px-4 flex items-center justify-between py-5 flex-wrap gap-4">
          <p className="text-sm text-white/60" suppressHydrationWarning>
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Facebook" className="text-white/70 hover:text-secondary text-sm font-medium">Facebook</Link>
            <Link href="#" aria-label="Instagram" className="text-white/70 hover:text-secondary text-sm font-medium">Instagram</Link>
            <Link href="#" aria-label="LinkedIn" className="text-white/70 hover:text-secondary text-sm font-medium">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
