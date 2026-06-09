import { Reviews } from "@/app/api/data";
import Image from "next/image";

const Testimonial = () => {
  return (
    <section className="lg:py-28 py-16 bg-grey dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <h2 className="text-3xl font-medium mb-3 text-center">
          What our supporters say
        </h2>
        <p className="text-base text-center text-dustGray dark:text-white/60 max-w-2xl mx-auto">
          Discover heartfelt stories from donors helping us make a difference worldwide.
        </p>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {Reviews.slice(0, 4).map((item, index) => (
            <div key={index} className="bg-white dark:bg-dark p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.clientImg}
                  alt={item.clientName}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-midnight_text dark:text-white">{item.clientName}</p>
                  <p className="text-sm text-dustGray">{item.post}</p>
                </div>
              </div>
              <p className="text-dustGray dark:text-white/70 text-sm leading-relaxed">{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
