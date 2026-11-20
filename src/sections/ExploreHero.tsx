import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';
import HalftoneNebula from '@/components/ui/halftone-nebula';

export default function ExploreHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = Math.max(window.innerHeight * 0.65, 400);
        const progress = Math.min(1, Math.max(0, y / maxScroll));
        el.style.transform = `translate3d(0, ${-progress * 70}px, 0)`;
        el.style.opacity = `${Math.max(0, 1 - progress * 1.15)}`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full h-full overflow-hidden bg-space-950">
      <HalftoneNebula
        height="100%"
        preset="impulse"
        className="w-full h-full min-h-[640px]"
        params={{
          // Refined star & planet balance for Impulse brand
          planet: true,
          planetX: 0.78,
          planetY: 0.24,
          planetRadius: 0.075,
          speed: 0.85,
          pixel: 6,
          levels: 7,
          sparkles: 9,
          density: 0.52,
          haze: 0.8,
        }}
      >
        {/* Top vignette under navbar */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-space-950/85 via-space-950/45 to-transparent z-[2]"
          aria-hidden="true"
        />

        {/* Deep contrast backdrop behind center typography for pristine legibility over halftone dots */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_65%_at_50%_48%,rgba(7,11,20,0.85)_0%,rgba(7,11,20,0.55)_50%,transparent_85%)] z-[2]"
          aria-hidden="true"
        />

        {/* Hero Interactive & Typography Layer */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center flex-1 h-full px-6 lg:px-10 pt-20 pb-28 text-center will-change-transform"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <SectionKicker label="ORIGIN // CHAPTER ONE" className="mb-6 pointer-events-auto" />

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold sm:font-black font-sans tracking-tight text-white select-none leading-[0.92] mb-4 [text-shadow:_0_4px_32px_rgba(0,0,0,0.95),_0_2px_10px_rgba(7,11,20,0.9)]">
              IMPULSE
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-[0.22em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#C084FC] to-[#F472B6] mb-6 select-none drop-shadow-[0_2px_12px_rgba(7,11,20,0.95)]">
              IDEAS IN MOTION.
            </div>

            <p className="text-base sm:text-lg md:text-xl font-medium sm:font-semibold text-gray-100 max-w-2xl leading-relaxed font-sans mb-10 px-4 [text-shadow:_0_2px_12px_rgba(7,11,20,0.95)]">
              A collective of student engineers, designers, and founders building live products, running high-impact hackathons, and fostering tech culture.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <Link
                to="/events"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-space-950 hover:bg-[#F2F6FF] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.25),0_2px_10px_rgba(7,11,20,0.8)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 select-none pointer-events-auto"
              >
                <span>EXPLORE EVENTS</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
              </Link>

              <Button
                to="/cohort"
                variant="secondary"
                size="lg"
                className="group font-bold tracking-wider hover:border-[#EC4899]/60 pointer-events-auto bg-space-900/90 backdrop-blur-md shadow-[0_4px_20px_rgba(7,11,20,0.7)]"
              >
                BUILDER COHORT
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </HalftoneNebula>
    </section>
  );
}
