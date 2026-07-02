import { helpdata } from "@/app/api/data";
import BrandEyebrow from "@/components/Common/BrandEyebrow";
import Image from "next/image";

const iconWrapOnly = ["brand-icon-wrap-navy", "brand-icon-wrap-blue", "brand-icon-wrap-green"] as const;
const cardTopOnly = ["brand-card-accent-navy", "brand-card-accent-blue", "brand-card-accent-green"] as const;

const Help = () => {
  return (
    <section className="pt-12 pb-8 lg:pt-16 lg:pb-10 bg-beige dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <BrandEyebrow center>Get Involved</BrandEyebrow>
          <h2 className="text-3xl mb-3 font-semibold text-darkprimary dark:text-white">
            How can you help us?
          </h2>
          <p className="text-dustGray dark:text-white/60 text-base max-w-2xl mx-auto">
            You can support us by donating, volunteering your time, or providing food supplies.
            <br className="lg:block hidden" /> Every effort makes a difference!
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-8">
            {helpdata.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 items-center xl:px-3 bg-white dark:bg-darkmode rounded-2xl p-8 border border-beige-dark dark:border-dark_border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${cardTopOnly[index % 3]}`}
              >
                <div className={iconWrapOnly[index % 3]}>
                  <Image src={item?.icon} alt="icon" width={60} height={60} />
                </div>
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-2xl font-medium text-darkprimary dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-dustGray dark:text-white/60 text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
