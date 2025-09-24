"use client";

import { CarouselProps } from "@/types/carousel";
import { useCarousel } from "@/hooks/useCarousel";
import CarouselSlide from "./CarouselSlide";
import CarouselSkeleton from "./CarouselSkeleton";

export default function Carousel({
  api,
  autoPlay = true,
  className = "",
}: CarouselProps) {
  const slideCount = api?.length ?? 0;

  const {
    currentIndex,
    handleTouchStart,
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
    elementRef,
  } = useCarousel(slideCount, autoPlay);

  if (!api) return null;

  if (slideCount === 0) <CarouselSkeleton />;

  const isVisibleSlide = (index: number) => {
    const prev = (currentIndex - 1 + slideCount) % slideCount;
    const next = (currentIndex + 1) % slideCount;
    return index === currentIndex || index === prev || index === next;
  };

  return (
    <div
      ref={elementRef}
      className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-100 overflow-hidden rounded-lg shadow-lg group select-none ${ isDragging ? "cursor-grabbing" : "cursor-grab" } ${className}`}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Anime carousel"
      aria-live="polite"
    >
      {api.map((anime, index) =>
        isVisibleSlide(index) ? (
          <CarouselSlide
            key={anime.mal_id}
            anime={anime}
            isActive={index === currentIndex}
            priority={
              index === currentIndex ||
              index === (currentIndex + 1) % slideCount
            }
          />
        ) : (
          <div
            key={anime.mal_id}
            className="absolute inset-0 w-full h-full bg-black"
          />
        )
      )}
    </div>
  );
}
