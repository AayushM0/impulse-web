import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  totalItems?: number;
}

export default function HorizontalScroll({
  children,
  className = '',
  totalItems = 5,
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);

    const currentProgress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, currentProgress)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Handle wheel horizontal translation
  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    // If scrolling mostly vertically, translate to horizontal
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (
        (e.deltaY > 0 && el.scrollLeft < maxScroll) ||
        (e.deltaY < 0 && el.scrollLeft > 0)
      ) {
        el.scrollLeft += e.deltaY * 0.9;
        e.preventDefault();
      }
    }
  };

  const scrollBy = (amount: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftPos - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header controls & Telemetry */}
      <div className="flex items-center justify-between mb-8 px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="w-32 sm:w-48 h-1 bg-space-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-impulse-blue via-impulse-indigo to-impulse-magenta transition-all duration-150"
              style={{ width: `${Math.max(15, progress)}%` }}
            />
          </div>
          <span className="font-mono-label text-[11px] text-impulse-blue-bright/60">
            {Math.round((progress / 100) * (totalItems - 1) + 1)} / {String(totalItems).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-420)}
            disabled={!canScrollLeft}
            aria-label="Previous events"
            className={`p-3 border transition-all duration-300 ${
              canScrollLeft
                ? 'border-impulse-blue/40 bg-space-900 text-impulse-white hover:bg-impulse-blue/20 hover:border-impulse-blue'
                : 'border-space-800 text-impulse-gray-light/20 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(420)}
            disabled={!canScrollRight}
            aria-label="Next events"
            className={`p-3 border transition-all duration-300 ${
              canScrollRight
                ? 'border-impulse-blue/40 bg-space-900 text-impulse-white hover:bg-impulse-blue/20 hover:border-impulse-blue'
                : 'border-space-800 text-impulse-gray-light/20 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`flex items-stretch gap-6 overflow-x-auto no-scrollbar px-6 lg:px-10 pb-8 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
