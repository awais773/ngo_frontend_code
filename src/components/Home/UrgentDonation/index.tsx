"use client";

import DonationFormContext from "@/app/context/donationContext";
import Link from "next/link";
import { useContext } from "react";

interface Props {
  totalRaised?: number;
}

const UrgentDonation = ({ totalRaised = 0 }: Props) => {
  const donationInfo = useContext(DonationFormContext);

  return (
    <section className="bg-[url('/images/background/donate-banner.jpg')] bg-cover bg-center py-12 sm:py-16 bg-no-repeat relative">
      <div className="absolute inset-0 bg-darkprimary/75" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 relative z-10">
        <div className="bg-white dark:bg-darkmode max-w-xl w-full px-10 py-12 rounded-2xl text-center mx-auto shadow-2xl border border-beige-dark dark:border-dark_border">
          <p className="text-accent font-bold text-sm uppercase tracking-wide mb-2">Together we&apos;ve raised</p>
          <p className="text-4xl font-bold text-darkprimary dark:text-white mb-4">
            ${Number(totalRaised).toLocaleString()}
          </p>
          <h3 className="text-xl font-semibold mb-4 text-darkprimary dark:text-white">
            Your donation saves lives today
          </h3>
          <p className="text-dustGray dark:text-white/60 text-sm mb-7">
            Every contribution provides food, medicine, and shelter to families in crisis. Give now — 100% goes to programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => donationInfo?.setIsDonationOpen(true)}
              className="bg-accent text-darkprimary px-8 py-3.5 rounded-lg font-bold hover:bg-gold-light cursor-pointer transition"
            >
              Donate Now
            </button>
            <Link href="/zakat-calculator" className="border-2 border-darkprimary text-darkprimary dark:border-accent dark:text-accent px-8 py-3.5 rounded-lg font-semibold hover:bg-darkprimary hover:text-white dark:hover:bg-accent dark:hover:text-darkprimary transition">
              Calculate Zakat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentDonation;
