import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreHero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 lg:px-10 pt-24 pb-16 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.18)_0%,rgba(236,72,153,0.12)_35%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionKicker label="ORIGIN // CHAPTER ONE" className="mb-6" />

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-white select-none leading-[0.92] mb-4">
          IMPULSE
        </h1>

        <div className="text-lg sm:text-xl md:text-2xl font-mono-label font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#A855F7] to-[#EC4899] mb-6">
          IDEAS IN MOTION.
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-300/80 max-w-2xl leading-relaxed font-sans mb-10 px-4">
          A collective of student engineers, designers, and founders building live products, running high-impact hackathons, and fostering tech culture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            to="/events"
            variant="primary"
            size="lg"
            className="group shadow-[0_4px_24px_rgba(37,99,235,0.4)]"
          >
            EXPLORE EVENTS
            <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            to="/cohort"
            variant="secondary"
            size="lg"
            className="group hover:border-[#EC4899]/60"
          >
            BUILDER COHORT
            <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-xs font-mono-label text-gray-400/60 select-none">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown aria-hidden="true" className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
