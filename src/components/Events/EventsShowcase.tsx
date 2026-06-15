import DynamicContent from "@/components/Common/DynamicContent";
import EventImageSlider from "@/components/Events/EventImageSlider";
import {
  formatEventDateLine,
  getEventImageUrls,
  stripImagesFromHtml,
} from "@/components/Events/eventUtils";
import type { EventItem } from "@/lib/api";
import { api } from "@/lib/api";

export default async function EventsShowcase() {
  let events: EventItem[] = [];
  try {
    const res = await api.events();
    events = res.data || [];
  } catch {
    events = [];
  }

  if (events.length === 0) {
    return (
      <section className="py-20 dark:bg-dark">
        <div className="container mx-auto max-w-(--breakpoint-xl) px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No events scheduled yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="dark:bg-dark">
      {events.map((event, index) => {
        const images = getEventImageUrls(event);
        const dateLine = formatEventDateLine(event);

        return (
          <article
            key={event.id}
            className={`py-14 sm:py-16 ${
              index < events.length - 1 ? "border-b border-gray-200 dark:border-white/10" : ""
            }`}
          >
            <div className="container mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-2xl font-bold text-midnight_text sm:text-3xl dark:text-white">
                {event.title}
              </h2>

              {dateLine && (
                <p className="mt-3 text-base text-gray-600 sm:text-lg dark:text-gray-300">
                  {dateLine}
                </p>
              )}

              {images.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <EventImageSlider images={images} title={event.title} />
                </div>
              )}

              {event.description && (
                <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
              )}

              {event.content && (
                <div className="prose prose-neutral mx-auto mt-8 max-w-2xl text-left dark:prose-invert">
                  <DynamicContent
                    html={
                      images.length > 0 ? stripImagesFromHtml(event.content) : event.content
                    }
                  />
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
