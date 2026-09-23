import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard3D from '@/components/3d/TiltCard3D';
import { events } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const statusColorMap: Record<string, { bg: string; text: string; dot: string }> = {
  'REGISTRATION OPEN': {
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  'UPCOMING': {
    bg: 'bg-impulse-blue/10 border-impulse-blue/30',
    text: 'text-impulse-blue-bright',
    dot: 'bg-impulse-blue-bright',
  },
  'SOON': {
    bg: 'bg-amber-500/10 border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  'TBA': {
    bg: 'bg-space-800/40 border-space-700',
    text: 'text-impulse-gray-light/60',
    dot: 'bg-impulse-gray-light/60',
  },
};

export default function Experiences() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      if (!wrapRef.current || !trackRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const getDistance = () => {
        return trackRef.current ? trackRef.current.scrollWidth - window.innerWidth + 80 : 0;
      };

      const distance = getDistance();

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(12, self.progress * 100)}%`;
            }
          },
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section
      ref={wrapRef}
      className="relative w-full bg-space-950 border-t border-space-800/80 overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" aria-hidden="true" />

      {/* Pinned Viewport Container */}
      <div className="h-screen w-full flex flex-col justify-between py-10 lg:py-16">
        {/* Section Header Row */}
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-label text-[11px] text-impulse-blue-bright/70 border border-space-700/80 bg-space-900/60 backdrop-blur-md px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-impulse-blue" />
              <span>EXPERIENCES // CALENDAR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-impulse-white tracking-tight leading-tight">
              Built under pressure. <span className="text-impulse-blue-bright">Shipped in public.</span>
            </h2>
          </div>

          {/* Progress Tracker & Links */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-28 sm:w-36 h-1 bg-space-800 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-impulse-blue to-impulse-blue-bright transition-all duration-75"
                  style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
                />
              </div>
              <span className="font-mono-label text-xs text-impulse-gray-light/60">
                {String(Math.min(events.length, Math.floor(scrollProgress * (events.length - 1)) + 1)).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
              </span>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 font-mono-label text-xs text-impulse-blue-bright hover:text-impulse-white transition-colors"
            >
              <span>ALL EVENTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pinned Horizontal Track that scrubs on vertical scroll */}
        <div className="relative w-full my-auto overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 px-6 lg:px-12 w-max"
          >
            {events.map((event, index) => {
              const statusConfig = statusColorMap[event.status] || statusColorMap['UPCOMING'];

              return (
                <div
                  key={event.id}
                  className="w-[330px] sm:w-[420px] lg:w-[480px] flex-shrink-0"
                >
                  <TiltCard3D maxTilt={8} className="h-full">
                    <div className="h-full relative flex flex-col justify-between p-8 bg-space-900/95 border border-space-800 hover:border-impulse-blue/40 transition-colors duration-300">
                      {/* Top Hairline Indicator */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-impulse-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Header metadata row */}
                        <div className="flex items-center justify-between gap-2 mb-6">
                          <span className="font-mono-label text-xs text-impulse-blue-bright/60">
                            {String(index + 1).padStart(2, '0')} // {event.type}
                          </span>

                          {/* Status Badge */}
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-0.5 border font-mono-label text-[10px] tracking-wider rounded-full ${statusConfig.bg} ${statusConfig.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
                            <span>{event.status}</span>
                          </div>
                        </div>

                        {/* Date & Location Pill */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-label text-impulse-gray-light/60 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-impulse-blue-bright" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-impulse-blue-bright/80" />
                            {event.location}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-sans font-semibold text-impulse-white tracking-tight mb-3">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-impulse-gray-light/70 leading-relaxed mb-6">
                          {event.description}
                        </p>

                        {/* Tags */}
                        {event.tags && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {event.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 text-[11px] font-mono-label text-impulse-gray-light/60 bg-space-800/60 border border-space-700/60"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-6 border-t border-space-800 flex items-center justify-between">
                        {event.highlight ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono-label text-impulse-blue-bright font-medium">
                            <Sparkles className="w-3.5 h-3.5" />
                            {event.highlight}
                          </span>
                        ) : (
                          <span className="text-xs font-mono-label text-impulse-gray-light/40">
                            {event.capacity || 'LIMITED SLOTS'}
                          </span>
                        )}

                        <Link
                          to="/join"
                          className="inline-flex items-center gap-2 font-mono-label text-xs text-impulse-white px-4 py-2 border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue transition-all duration-200"
                        >
                          RSVP
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard3D>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between text-xs font-mono-label text-impulse-gray-light/40">
          <span>← SCROLL VERTICALLY TO PAN EVENTS →</span>
          <span className="hidden sm:inline">CYCLE 01 // AUTONOMOUS SYSTEMS</span>
        </div>
      </div>
    </section>
  );
}
