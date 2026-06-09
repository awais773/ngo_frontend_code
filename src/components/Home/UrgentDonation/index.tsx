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
    <section className="bg-[url('/images/background/donate-banner.jpg')] bg-cover bg-center sm:py-32 py-16 bg-no-repeat relative">
      <div className="absolute inset-0 bg-[#0a3d2e]/70" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 relative z-10">
        <div className="bg-white dark:bg-[#0a2219] max-w-xl w-full px-10 py-12 rounded-2xl text-center mx-auto shadow-2xl">
          <p className="text-[#C9A227] font-bold text-sm uppercase tracking-wide mb-2">Together we&apos;ve raised</p>
          <p className="text-4xl font-bold text-[#0a3d2e] dark:text-white mb-4">
            ${Number(totalRaised).toLocaleString()}
          </p>
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Your donation saves lives today
          </h3>
          <p className="text-dustGray dark:text-white/60 text-sm mb-7">
            Every contribution provides food, medicine, and shelter to families in crisis. Give now — 100% goes to programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => donationInfo?.setIsDonationOpen(true)}
              className="bg-[#C9A227] text-[#0a3d2e] px-8 py-3.5 rounded-lg font-bold hover:bg-[#e0b83d] cursor-pointer"
            >
              Donate Now
            </button>
            <Link href="/zakat-calculator" className="border-2 border-[#0a3d2e] text-[#0a3d2e] dark:border-[#C9A227] dark:text-[#C9A227] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#0a3d2e] hover:text-white transition">
              Calculate Zakat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentDonation;
