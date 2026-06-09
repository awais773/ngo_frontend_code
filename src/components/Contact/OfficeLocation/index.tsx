import React from "react";
import Link from "next/link";

const Location = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <section className="bg-primary lg:py-24 py-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="">
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white/50 pb-11">
              <div className="col-span-3">
                <h2 className="text-white text-[34px] leading-tight font-semibold">Lahore office</h2>
              </div>
              <div className="col-span-3">
                <p className="text-lg text-white font-normal max-w-72">M1-19, Mega Tower, Gulberg 2, Lahore, 54000</p>
              </div>
              <div className="col-span-3">
                <Link href="mailto:office@charity.org" className="text-lg text-white hover:text-black font-semibold">office@charity.org</Link>
                <Link href="tel:+923074914979" className="text-lg font-semibold text-white hover:text-black flex items-center gap-2 w-fit"><span className="text-white">Call:</span>+92 307 4914979</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
