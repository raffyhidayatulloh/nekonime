import { Anime } from "@/types/api";

export interface CarouselProps {
  api: Anime[];
  autoPlay?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export interface SlideProps {
  anime: Anime;
  isActive: boolean;
  priority: boolean;
}

export interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}

export interface TouchState {
  start: number | null;
  end: number | null;
}
