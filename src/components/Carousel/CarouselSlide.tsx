"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { SlideProps } from "@/types/carousel";
import { formatItems } from "@/utils/carousel";
import { slugify } from "@/libs/slugify";

const CarouselSlide = memo<SlideProps>(({ anime, isActive, priority }) => {
  const imageSrc = anime.bannerImage ?? anime.images.webp.image_url;
  const slug = slugify(anime.title);

  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      aria-hidden={!isActive}
    >
      <div className="relative w-full h-full overflow-hidden bg-gray-900">
        <Image
          src={imageSrc}
          alt={`${anime.title} banner`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/1200x600/111/fff?text=Image+Not+Available";
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Details button */}
      <Link
        href={`/anime/${anime.mal_id}/${slug}`}
        className="absolute top-2 right-2 lg:bottom-6 lg:top-auto lg:right-6 z-20 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-white/30 px-3 py-2 lg:px-4 lg:py-3 text-sm rounded-full hover:bg-black/95 transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        aria-label={`View details for ${anime.title}`}
      >
        <Info size={16} className="lg:size-5" />
        <span className="hidden lg:inline">Details</span>
      </Link>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 md:p-4 lg:p-6 z-10 pointer-events-none">
        <div className="flex flex-col items-center lg:w-2/3 xl:w-1/2 text-white">
          <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2 sm:mb-3 drop-shadow-lg line-clamp-1">
            {anime.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 lg:mb-4">
            {formatItems(anime.genres, 2) && (
              <span className="px-3 py-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm text-xs sm:text-sm">
                {formatItems(anime.genres, 2)}
              </span>
            )}
            {formatItems(anime.studios, 1) && (
              <span className="px-3 py-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm text-xs sm:text-sm">
                {formatItems(anime.studios, 1)}
              </span>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <div className="hidden md:block">
              <p className="text-justify text-sm lg:text-base md:line-clamp-2 lg:line-clamp-3 drop-shadow-md leading-relaxed">
                {anime.synopsis.replace(/\s*\[Written by MAL Rewrite\]$/, "")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

CarouselSlide.displayName = "CarouselSlide";

export default CarouselSlide;
