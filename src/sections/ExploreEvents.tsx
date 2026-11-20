import { ArrowRight, Calendar, MapPin, Trophy } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreEvents() {
  return (
    <section id="events" className="relative pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionKicker label="01 // COMPETITIONS" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight">
              EVENTS & HACKATHONS
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base font-sans leading-relaxed">
            From 36-hour high-stakes hackathons to technical workshops and demo days.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div className="relative rounded-2xl border border-impulse-blue/30 bg-gradient-to-b from-[#0E1626]/90 to-[#070B14]/90 p-8 md:p-12 shadow-[0_8px_32px_rgba(37,99,235,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono-label text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FLAGSHIP COMPETITION
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-white mb-4">
                SharkHack 2027
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Our signature 36-hour offline hackathon bringing together the sharpest student engineers, designers, and innovators to build and pitch production-ready software.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono-label text-gray-400 mb-8">
                <span className="inline-flex items-center gap-1.5 bg-space-900/80 px-3 py-1.5 rounded-md border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> 36-Hour Hackathon
                </span>
                <span className="inline-flex items-center gap-1.5 bg-space-900/80 px-3 py-1.5 rounded-md border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" /> Offline / In-Person
                </span>
                <span className="inline-flex items-center gap-1.5 bg-space-900/80 px-3 py-1.5 rounded-md border border-white/10">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" /> Cash Pool & Grants
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button to="/events" variant="primary" size="md" className="group">
                  VIEW ALL EVENTS
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button to="/shark-hack" variant="secondary" size="md" className="group">
                  EXPLORE SHARKHACK
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Quick Tracks Grid */}
            <div className="grid grid-cols-2 gap-3 min-w-[260px] lg:max-w-xs w-full">
              {['AI & Intelligence', 'Web3 & Security', 'Developer Tools', 'Open Innovation'].map((track) => (
                <div
                  key={track}
                  className="p-4 rounded-xl border border-white/10 bg-space-900/40 text-center font-mono-label text-xs text-gray-300"
                >
                  {track}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
