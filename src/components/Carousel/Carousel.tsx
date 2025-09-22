"use client";

import { CarouselProps } from "@/types/carousel";
import { useCarousel } from "@/hooks/useCarousel";
import CarouselSlide from "./CarouselSlide";
import CarouselNavButton from "./CarouselNavButton";

export default function Carousel({
  api,
  autoPlay = true,
  showNavigation = true,
  className = "",
}: CarouselProps) {
  const slideCount = api.length;
  
  const {
    currentIndex,
    nextSlide,
    previousSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(slideCount, autoPlay);

  // Empty state
  if (slideCount === 0)  return null

  return (
    <div
      className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-100 overflow-hidden rounded-lg shadow-lg group ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Anime carousel"
      aria-live="polite"
    >
      {/* Slides */}
      {api.map((anime, index) => (
        <CarouselSlide
          key={anime.mal_id}
          anime={anime}
          isActive={index === currentIndex}
          priority={
            index === currentIndex || index === (currentIndex + 1) % slideCount
          }
        />
      ))}

      {/* Navigation */}
      {showNavigation && slideCount > 1 && (
        <>
          <CarouselNavButton direction="prev" onClick={previousSlide} />
          <CarouselNavButton direction="next" onClick={nextSlide} />
        </>
      )}
    </div>
  );
}