"use client"

import BrandEyebrow from "@/components/Common/BrandEyebrow";
import Link from "next/link";

const Volunteer = () => {
    return (
        <section className="py-12 lg:py-16 bg-[url('/images/background/volunteer-bg.jpg')] bg-no-repeat bg-cover overflow-hidden relative">
            <div className="absolute inset-0 brand-section-overlay" />
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 relative z-10">
                <div className="text-center">
                    <BrandEyebrow center>Support</BrandEyebrow>
                    <h2 className="text-3xl font-semibold text-white mb-6">
                        Contact support
                    </h2>
                    <p className="text-base text-white/90 lg:max-w-60% mx-auto mb-6">
                    Have questions or need help? Our support team is here to assist you with donations, programs, and general inquiries.
                    </p>
                    <div className="flex justify-center ">
                        <Link href="/contact" className="btn-brand-primary">
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Volunteer;
