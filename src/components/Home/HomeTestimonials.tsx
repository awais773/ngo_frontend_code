import Image from "next/image";
import BrandEyebrow from "@/components/Common/BrandEyebrow";
import type { TestimonialItem } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface Props {
  testimonials: TestimonialItem[];
}

export default function HomeTestimonials({ testimonials }: Props) {
  return (
    <section className="py-12 lg:py-16 bg-beige dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <BrandEyebrow center>Testimonials</BrandEyebrow>
        <h2 className="text-3xl font-semibold mb-3 text-center text-darkprimary dark:text-white">What our supporters say</h2>
        <p className="text-center text-dustGray dark:text-white/60 max-w-2xl mx-auto mb-14">
          Real stories from beneficiaries, donors, and volunteers worldwide.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white dark:bg-dark p-8 rounded-2xl shadow-sm border border-beige-dark dark:border-dark_border border-l-4 border-l-secondary">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={mediaUrl(item.image)}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14 ring-2 ring-secondary/40"
                />
                <div>
                  <p className="font-bold text-midnight_text dark:text-white">{item.name}</p>
                  <p className="text-sm text-secondary">{item.role}</p>
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
