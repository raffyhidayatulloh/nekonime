"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Anime } from "@/types/jikan";
import React from "react";

interface CarouselProps {
  api: Anime[];
}

const Carousel = ({ api }: CarouselProps) => {
  console.log("🚀 ~ Carousel ~ api:", api);
  const [index, setIndex] = useState(0);

  const goToSlide = (i: number) => {
    setIndex((i + api.length) % api.length);
  };

  useEffect(() => {
    if (api.length === 0) return;
    const timer = setInterval(() => goToSlide(index + 1), 5000);
    return () => clearInterval(timer);
  }, [index, api.length]);

  if (api.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No anime available
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out will-change-transform"
        style={{
          width: `${api.length * 100}%`, // 👈 wrapper width = total slide
          transform: `translateX(-${index * (100 / api.length)}%)`,
        }}
      >
        {api.map((anime, i) => (
          <div key={anime.mal_id} className="min-w-full relative flex-shrink-0">
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              width={800}
              height={400}
              priority={i === 0}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
              {anime.title}
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {api.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => goToSlide(index - 1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => goToSlide(index + 1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
