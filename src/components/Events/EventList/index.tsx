import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { EventItem } from "@/lib/api";
import { api, mediaUrl } from "@/lib/api";

const EventList = async () => {
  let events: EventItem[] = [];
  try {
    const res = await api.events();
    events = res.data || [];
  } catch {
    events = [];
  }

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events scheduled yet.</p>
        ) : (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {events.map((item) => (
              <Link key={item.id} href={`/events/${item.slug}`} className="group">
                <div className="relative overflow-hidden rounded-xl mb-5 h-[240px]">
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
                <h4 className="text-lg font-semibold mb-2 group-hover:text-[#0a3d2e]">{item.title}</h4>
                <p className="text-muted dark:text-white/60 text-sm line-clamp-2">{item.description}</p>
                {item.location && <p className="text-xs text-[#C9A227] mt-2">{item.location}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;
