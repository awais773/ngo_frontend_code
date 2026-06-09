"use client"

import Link from "next/link";

const Volunteer = () => {
    return (
        <section className="py-12 lg:py-16 bg-[url('/images/background/volunteer-bg.jpg')] bg-no-repeat bg-cover overflow-hidden relative">
            <div className="absolute inset-0 bg-darkprimary/80" />
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 relative z-10">
                <div className="text-center">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">Support</p>
                    <h2 className="text-3xl font-semibold text-white mb-6">
                        Contact support
                    </h2>
                    <p className="text-base text-white/90 lg:max-w-60% mx-auto mb-6">
                    Have questions or need help? Our support team is here to assist you with donations, programs, and general inquiries.
                    </p>
                    <div className="flex justify-center ">
                        <Link href="/contact" className="text-darkprimary text-base bg-accent px-7 py-4 border font-semibold border-accent hover:border-white hover:bg-transparent hover:text-white rounded-lg cursor-pointer transition">
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Volunteer;
