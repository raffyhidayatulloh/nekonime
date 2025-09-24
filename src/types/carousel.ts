import { Anime } from "@/types/api";

export interface CarouselProps {
  api: Anime[];
  autoPlay?: boolean;
  className?: string;
}

export interface SlideProps {
  anime: Anime;
  isActive: boolean;
  priority: boolean;
}