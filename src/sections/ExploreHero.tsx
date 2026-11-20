import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';
import HalftoneNebula from '@/components/ui/halftone-nebula';

export default function ExploreHero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-space-950">
      <HalftoneNebula
        height="100svh"
        preset="impulse"
        className="w-full min-h-[640px]"
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
        {/* Subtle top vignette under navbar */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-space-950/80 via-space-950/40 to-transparent z-[2]"
          aria-hidden="true"
        />

        {/* Ambient radial shadow behind center typography for clean contrast */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_60%_50%_at_50%_48%,rgba(7,11,20,0.75)_0%,rgba(7,11,20,0.35)_55%,transparent_80%)] z-[2]"
          aria-hidden="true"
        />

        {/* Seamless bottom feather into Section 02 (ExploreEvents - space-950 / #070B14) */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-space-950 via-space-950/80 to-transparent z-[5]"
          aria-hidden="true"
        />

        {/* Hero Interactive & Typography Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 h-full px-6 lg:px-10 pt-24 pb-16 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <SectionKicker label="ORIGIN // CHAPTER ONE" className="mb-6 pointer-events-auto" />

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight text-white select-none leading-[0.92] mb-4 drop-shadow-[0_4px_32px_rgba(7,11,20,0.9)]">
              IMPULSE
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl font-mono-label font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#A855F7] to-[#EC4899] mb-6 select-none">
              IDEAS IN MOTION.
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-300/85 max-w-2xl leading-relaxed font-sans mb-10 px-4">
              A collective of student engineers, designers, and founders building live products, running high-impact hackathons, and fostering tech culture.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <Button
                to="/events"
                variant="primary"
                size="lg"
                className="group shadow-[0_4px_24px_rgba(37,99,235,0.4)] pointer-events-auto"
              >
                EXPLORE EVENTS
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                to="/cohort"
                variant="secondary"
                size="lg"
                className="group hover:border-[#EC4899]/60 pointer-events-auto"
              >
                BUILDER COHORT
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-xs font-mono-label text-gray-400/70 select-none">
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown aria-hidden="true" className="w-3.5 h-3.5 animate-bounce text-impulse-blue-bright" />
            </div>
          </div>
        </div>
      </HalftoneNebula>
    </section>
  );
}
