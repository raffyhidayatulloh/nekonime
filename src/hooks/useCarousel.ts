import { useState, useEffect, useCallback, useRef } from "react";

export function useCarousel(slideCount: number, autoPlay: boolean = false) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(
    () => setCurrentIndex((i) => (i + 1) % slideCount),
    [slideCount]
  );

  const previousSlide = useCallback(
    () => setCurrentIndex((i) => (i - 1 + slideCount) % slideCount),
    [slideCount]
  );

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (autoPlay && slideCount > 1 && !autoPlayRef.current) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
  }, [autoPlay, slideCount, nextSlide]);

  // Autoplay visibility
  useEffect(() => {
    if (autoPlay && slideCount > 1) startAutoPlay();

    const handleVisibility = () =>
      document.visibilityState === "hidden" ? stopAutoPlay() : startAutoPlay();

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopAutoPlay();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [autoPlay, slideCount, startAutoPlay, stopAutoPlay]);

  // Helper: grab
  const handleDragEnd = useCallback(
    (deltaX: number, deltaY: number) => {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        deltaX > 0 ? previousSlide() : nextSlide();
      }
      isDraggingRef.current = false;
      setIsDragging(false);
      setTimeout(startAutoPlay, 100);
    },
    [nextSlide, previousSlide, startAutoPlay]
  );

  // Touch
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const { clientX, clientY } = e.touches[0];
      if (Math.abs(clientX - startPosRef.current.x) >
          Math.abs(clientY - startPosRef.current.y)) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const { clientX, clientY } = e.changedTouches[0];
      handleDragEnd(clientX - startPosRef.current.x, clientY - startPosRef.current.y);
    };

    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleDragEnd]);

  // Drag
  const startDrag = useCallback(
    (x: number, y: number) => {
      stopAutoPlay();
      startPosRef.current = { x, y };
      isDraggingRef.current = true;
      setIsDragging(true);
    },
    [stopAutoPlay]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    },
    [startDrag]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    },
    [startDrag]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingRef.current) e.preventDefault();
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isDraggingRef.current) {
        handleDragEnd(e.clientX - startPosRef.current.x, e.clientY - startPosRef.current.y);
      }
    },
    [handleDragEnd]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setTimeout(startAutoPlay, 100);
    }
  }, [startAutoPlay]);

  // Keyboard nav
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoPlay();
        e.key === "ArrowLeft" ? previousSlide() : nextSlide();
        setTimeout(startAutoPlay, 100);
      }
    },
    [nextSlide, previousSlide, stopAutoPlay, startAutoPlay]
  );

  return {
    currentIndex,
    nextSlide,
    previousSlide,
    handleTouchStart,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleKeyDown,
    isDragging,
    elementRef,
  };
}
