"use client"

import Link from "next/link";

const Volunteer = () => {
    return (
        <section className="lg:py-28 py-16 bg-[url('/images/background/volunteer-bg.jpg')] bg-no-repeat bg-cover overflow-hidden">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-white mb-6">
                        Contact support
                    </h2>
                    <p className="text-base text-white lg:max-w-60% mx-auto mb-6">
                    Have questions or need help? Our support team is here to assist you with donations, programs, and general inquiries.
                    </p>
                    <div className="flex justify-center ">
                        <Link href="/contact" className="text-white text-base bg-error px-7 py-4 border font-semibold border-error hover:border-error hover:bg-transparent hover:text-error rounded-md cursor-pointer">
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Volunteer;