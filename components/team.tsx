"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface GridImage {
  id: string;
  src: string;
  alt: string;
  label?: string;
}

interface ImageGridProps {
  title: string;
  images: GridImage[];
  backgroundImage?: string;
  isActive?: boolean;
}

export default function TeamGrid({
  title,
  images,
  backgroundImage,
  isActive = false,
}: ImageGridProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isActive) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="w-full bg-black rounded-xl shadow-xl p-8 transition-all duration-500"
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
        {title}
      </h1>

      <div
        className="grid gap-4 md:gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {images.map((img) => (
          <div key={img.id} className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square max-w-[300px] overflow-hidden rounded-2xl bg-gray-700 shadow-lg">
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-white text-lg text-center">
              {img.label ?? img.alt ?? img.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
