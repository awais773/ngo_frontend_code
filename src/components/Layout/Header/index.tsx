"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import TopBar from "./TopBar";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import DonationFormContext from "@/app/context/donationContext";
import { Donation } from "@/components/Home/Hero/Donation";
import { SuccessfullLogin } from "@/components/Auth/AuthDialog/SuccessfulLogin";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { FailedLogin } from "@/components/Auth/AuthDialog/FailedLogin";
import { UserRegistered } from "@/components/Auth/AuthDialog/UserRegistered";
import ClientOnly from "@/components/Common/ClientOnly";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const donationInfo = useContext(DonationFormContext);
  const authDialog = useContext(AuthDialogContext);

  useEffect(() => {
    setNavbarOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setSticky(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navbarOpen]);

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300">
      <TopBar />
      <div
        className={`w-full ${
        sticky
          ? "bg-white/98 dark:bg-dark/98 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-white/5"
          : "bg-white dark:bg-dark border-b border-gray-100 dark:border-white/5"
      }`}
      >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="flex items-center justify-between h-[70px] gap-4">
          <Logo size="sm" />

          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center rounded-lg bg-darkprimary px-4 py-2 text-sm font-semibold text-white hover:bg-primary transition-colors"
            >
              Become Member
            </Link>

            <ClientOnly
              fallback={
                <span className="hidden sm:block h-9 w-9" aria-hidden="true" />
              }
            >
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <Icon icon={theme === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"} className="text-xl" />
              </button>
            </ClientOnly>

            <button
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="xl:hidden flex flex-col gap-1.5 p-2.5 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/15 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-darkprimary dark:bg-white transition-all duration-300 ${navbarOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-darkprimary dark:bg-white transition-opacity duration-300 ${navbarOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-darkprimary dark:bg-white transition-all duration-300 ${navbarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>
      </div>

      {navbarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 xl:hidden" onClick={() => setNavbarOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-dark xl:hidden animate-in slide-in-from-right duration-300"
          >
            <div className="flex h-[70px] items-center justify-between border-b border-gray-100 px-4 dark:border-white/10">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setNavbarOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              >
                <Icon icon="mdi:close" className="text-2xl" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {headerData.map((item, index) => (
                <MobileHeaderLink key={index} item={item} onNavigate={() => setNavbarOpen(false)} />
              ))}
            </nav>
            <div className="space-y-2 border-t border-gray-100 p-4 dark:border-white/10">
              <Link
                href="/"
                onClick={() => setNavbarOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-darkprimary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
              >
                Become Member
              </Link>
              <ClientOnly>
                <button
                  type="button"
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hidden w-full items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-[14px] font-semibold text-gray-700 transition-all duration-200 hover:bg-darkprimary/8 hover:text-darkprimary dark:text-gray-300 dark:hover:bg-accent/10 dark:hover:text-accent"
                >
                  <Icon icon={theme === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"} className="text-lg" />
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </ClientOnly>
            </div>
          </div>
        </>
      )}

      {donationInfo?.isDonationOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="relative mx-auto w-full max-w-md rounded-xl bg-white px-8 py-14 dark:bg-dark">
            <button
              type="button"
              onClick={() => donationInfo?.setIsDonationOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <Icon icon="ic:round-close" className="text-2xl" />
            </button>
            <Donation />
          </div>
        </div>
      )}

      <ClientOnly>
        {authDialog?.isSuccessDialogOpen && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70]">
            <SuccessfullLogin />
          </div>
        )}
        {authDialog?.isFailedDialogOpen && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70]">
            <FailedLogin />
          </div>
        )}
        {authDialog?.isUserRegistered && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70]">
            <UserRegistered />
          </div>
        )}
      </ClientOnly>
    </header>
  );
};

export default Header;
