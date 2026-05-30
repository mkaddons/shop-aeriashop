"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "@/lib/paths";

type Props = { images: string[]; name: string };

export function ProductGallery({ images, name }: Props) {
  const slides =
    images.length > 0
      ? images.map((img) => assetPath(img))
      : [assetPath("/images/placeholder.svg")];
  const [index, setIndex] = useState(0);
  const current = slides[index] ?? slides[0];

  return (
    <div className="space-y-4">
      <div className="border-ink shadow-brutal relative aspect-square w-full overflow-hidden rounded-2xl border-2 bg-secondary">
        <Image
          src={current}
          alt={name}
          fill
          className="object-cover"
          unoptimized
          priority
        />
      </div>
      {slides.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className={`border-ink relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                i === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
