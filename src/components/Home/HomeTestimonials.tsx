import Image from "next/image";
import type { TestimonialItem } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface Props {
  testimonials: TestimonialItem[];
}

export default function HomeTestimonials({ testimonials }: Props) {
  return (
    <section className="lg:py-28 py-16 bg-grey dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <h2 className="text-3xl font-semibold mb-3 text-center">What our supporters say</h2>
        <p className="text-center text-dustGray dark:text-white/60 max-w-2xl mx-auto mb-14">
          Real stories from beneficiaries, donors, and volunteers worldwide.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white dark:bg-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={mediaUrl(item.image)}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
                <div>
                  <p className="font-bold text-midnight_text dark:text-white">{item.name}</p>
                  <p className="text-sm text-[#C9A227]">{item.role}</p>
                </div>
              </div>
              <p className="text-dustGray dark:text-white/70 text-sm leading-relaxed italic">&ldquo;{item.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
