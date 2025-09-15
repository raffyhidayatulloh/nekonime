import { useState, useEffect, useRef, useCallback } from "react";
import { TouchState } from "@/types/carousel";
import { CAROUSEL_CONFIG } from "@/constants/carousel";
import { normalizeIndex } from "@/utils/carousel";

export const useCarousel = (slideCount: number, autoPlay: boolean = true) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchRef = useRef<TouchState>({ start: null, end: null });

  // Navigation methods
  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = normalizeIndex(index, slideCount);
      setCurrentIndex(newIndex);
      setIsUserInteracting(true);
    },
    [slideCount]
  );

  const nextSlide = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide]
  );

  const previousSlide = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide]
  );

  // Auto-play management
  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoPlay && !isUserInteracting) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slideCount);
      }, CAROUSEL_CONFIG.SLIDE_DURATION);
    }
  }, [autoPlay, isUserInteracting, slideCount]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current.end = null;
    touchRef.current.start = e.targetTouches[0].clientX;
    setIsUserInteracting(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchRef.current.end = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const { start, end } = touchRef.current;
    if (!start || !end) return;

    const distance = start - end;
    const isSwipe = Math.abs(distance) > CAROUSEL_CONFIG.MIN_SWIPE_DISTANCE;

    if (isSwipe) {
      distance > 0 ? nextSlide() : previousSlide();
    }

    setTimeout(
      () => setIsUserInteracting(false),
      CAROUSEL_CONFIG.USER_INTERACTION_TIMEOUT
    );
  }, [nextSlide, previousSlide]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keyActions = {
        ArrowLeft: previousSlide,
        ArrowRight: nextSlide,
        Home: () => goToSlide(0),
        End: () => goToSlide(slideCount - 1),
      };

      const action = keyActions[e.key as keyof typeof keyActions];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [nextSlide, previousSlide, goToSlide, slideCount]
  );

  // Effects
  useEffect(() => {
    if (slideCount === 0) return;
    resetAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoPlay, slideCount]);

  useEffect(() => {
    resetAutoPlay();
  }, [isUserInteracting, resetAutoPlay]);

  return {
    currentIndex,
    nextSlide,
    previousSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  };
};