import Image from "next/image";
import type { MediaItem } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

function getCaption(item: MediaItem): string | undefined {
  return item.caption?.trim() || item.description?.trim() || undefined;
}

interface MediaPhotoGridProps {
  items: MediaItem[];
}

export default function MediaPhotoGrid({ items }: MediaPhotoGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const caption = getCaption(item);
        return (
          <article
            key={item.id}
            className="group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-900">
              <Image
                src={mediaUrl(item.url)}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 3 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-bold text-midnight_text dark:text-white">{item.title}</h3>
              {caption && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 italic">
                  {caption}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export { getCaption };
