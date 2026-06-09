import React from "react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <>
      <section className="dark:bg-dark pt-8 pb-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="pt-12 pb-16">
            <iframe
              src="https://maps.google.com/maps?q=M1-19%2C%20Mega%20Tower%2C%20Gulberg%202%2C%20Lahore%2C%2054000&output=embed"
              width="1114"
              height="477"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg w-full"
            />
          </div>
        </div>
        <div className="border-b border-solid border-border dark:border-dark_border"></div>
      </section>
    </>
  );
};

export default ContactInfo;
