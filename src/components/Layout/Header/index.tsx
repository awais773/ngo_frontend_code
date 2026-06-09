"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
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
  const { theme, setTheme } = useTheme();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const donationInfo = useContext(DonationFormContext);
  const authDialog = useContext(AuthDialogContext);

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
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        sticky
          ? "bg-white/98 dark:bg-[#00180f]/98 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-white/5"
          : "bg-white dark:bg-[#00180f] border-b border-gray-100 dark:border-white/5"
      }`}
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="flex items-center justify-between h-[70px] gap-4">
          <Logo showText={false} />

          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ClientOnly
              fallback={
                <span className="hidden sm:block h-9 w-9" aria-hidden="true" />
              }
            >
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
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
              <span className={`block w-5 h-0.5 bg-[#0a3d2e] dark:bg-white transition-all duration-300 ${navbarOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0a3d2e] dark:bg-white transition-opacity duration-300 ${navbarOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0a3d2e] dark:bg-white transition-all duration-300 ${navbarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {navbarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 xl:hidden" onClick={() => setNavbarOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-[#00180f] shadow-2xl z-50 xl:hidden overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between p-5 border-b dark:border-white/10 bg-gradient-to-r from-white to-gray-50 dark:from-[#0a2219] dark:to-[#00180f]">
              <Logo />
              <button type="button" onClick={() => setNavbarOpen(false)} aria-label="Close" className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                <Icon icon="mdi:close" className="text-2xl" />
              </button>
            </div>
            <nav className="p-5 flex flex-col gap-1.5">
              {headerData.map((item, index) => (
                <MobileHeaderLink key={index} item={item} />
              ))}
            </nav>
            <div className="p-5 border-t dark:border-white/10 space-y-3 bg-gradient-to-t from-gray-50 to-transparent dark:from-[#0a2219]/30 dark:to-transparent">
              <Link href="/contact" onClick={() => setNavbarOpen(false)} className="block text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2.5 hover:text-[#0a3d2e] dark:hover:text-[#C9A227] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </>
      )}

      {donationInfo?.isDonationOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="relative mx-auto w-full max-w-md rounded-xl bg-white px-8 py-14 dark:bg-[#00180f]">
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
