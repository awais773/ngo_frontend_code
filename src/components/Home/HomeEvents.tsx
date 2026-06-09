import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { EventItem } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface Props {
  events: EventItem[];
}

export default function HomeEvents({ events }: Props) {
  const list = events.slice(0, 3);

  return (
    <section className="lg:py-28 py-16 dark:bg-dark" data-aos="fade-up" data-aos-duration="1200">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-3">Upcoming Events</h2>
          <p className="text-dustGray dark:text-white/60 max-w-2xl mx-auto">
            Join us at local and international events to support our mission.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {list.map((item, index) => (
            <Link
            key={item.id}
            href={`/events/${item.slug}`}
            className="group"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
              <div className="relative overflow-hidden rounded-xl mb-5 h-[220px] transition-transform duration-300 group-hover:-translate-y-1">
                <Image
                  src={mediaUrl(item.featured_image)}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                {item.starts_at && (
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-lg text-sm font-semibold text-[#0a3d2e]">
                    {format(new Date(item.starts_at), "MMM dd, yyyy")}
                  </div>
                )}
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-[#0a3d2e] dark:group-hover:text-[#C9A227]">{item.title}</h4>
              <p className="text-sm text-dustGray dark:text-white/60 line-clamp-2">{item.description}</p>
              {item.location && <p className="text-xs text-[#C9A227] mt-2">{item.location}</p>}
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/events" className="inline-block border-2 border-[#0a3d2e] text-[#0a3d2e] dark:text-white dark:border-[#C9A227] px-8 py-3 rounded-lg font-semibold hover:bg-[#0a3d2e] hover:text-white transition">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
