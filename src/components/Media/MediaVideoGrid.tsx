"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/api";
import { getCaption } from "./MediaPhotoGrid";

interface LazyVideoEmbedProps {
  url: string;
  title: string;
}

function LazyVideoEmbed({ url, title }: LazyVideoEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="aspect-video bg-gray-900">
      {visible ? (
        <iframe
          src={url}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-darkprimary/90 text-white/70 text-sm">
          Loading video…
        </div>
      )}
    </div>
  );
}

interface MediaVideoGridProps {
  items: MediaItem[];
}

export default function MediaVideoGrid({ items }: MediaVideoGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
      {items.map((item) => {
        const caption = getCaption(item);
        return (
          <article
            key={item.id}
            className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-white/10"
          >
            <LazyVideoEmbed url={item.url} title={item.title} />
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
