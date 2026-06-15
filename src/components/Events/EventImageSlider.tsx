"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface EventImageSliderProps {
  images: string[];
  title: string;
}

export default function EventImageSlider({ images, title }: EventImageSliderProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-900">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-900">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`${title} - image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => setActive((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-darkprimary shadow-md transition hover:bg-white"
          aria-label="Previous image"
        >
          <Icon icon="mdi:chevron-left" className="text-2xl" />
        </button>
        <button
          type="button"
          onClick={() => setActive((prev) => (prev + 1) % images.length)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-darkprimary shadow-md transition hover:bg-white"
          aria-label="Next image"
        >
          <Icon icon="mdi:chevron-right" className="text-2xl" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all ${
              index === active ? "w-8 bg-darkprimary" : "w-2 bg-gray-300 dark:bg-white/30"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
