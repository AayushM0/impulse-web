import { ArrowRight, Terminal } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';
import CohortActiveCard from '@/components/CohortActiveCard';

export default function ExploreCohort() {
  return (
    <section id="cohort" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-pink-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionKicker label="02 // INCUBATOR" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight">
              BUILDER COHORT
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base font-sans leading-relaxed">
            A high-intensity, 5-month cohort turning builders into venture product teams from problem validation to live production deployment.
          </p>
        </div>

        {/* Featured Centerpiece: The Active Cohort Terminal Card */}
        <div className="mb-12">
          <CohortActiveCard />
        </div>

        {/* Bottom Action Strip */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1626]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-bold font-sans text-white mb-1">
              Want to build in Chapter One?
            </div>
            <div className="text-sm text-gray-400 font-sans">
              Learn about our track structure, mentors, and the 5 live projects currently shipping.
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Button to="/cohort" variant="primary" size="md" className="group">
              EXPLORE THE COHORT
              <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
