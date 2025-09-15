"use client";

import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavButtonProps } from "@/types/carousel";

const CarouselNavButton = memo<NavButtonProps>(
  ({ direction, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`hidden sm:group-hover:flex absolute top-1/2 -translate-y-1/2 ${
        direction === "prev" ? "left-4" : "right-4"
      } bg-black/60 backdrop-blur-sm text-white rounded-full p-2 z-20 hover:bg-black/80 transition-all duration-200 border border-white/30 items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 ${className}`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
      type="button"
    >
      {direction === "prev" ? (
        <ChevronLeft size={20} />
      ) : (
        <ChevronRight size={20} />
      )}
    </button>
  )
);

CarouselNavButton.displayName = "CarouselNavButton";

export default CarouselNavButton;