import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquare, Terminal, Sparkles, Globe } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

interface Slot {
  left: number;
  top: number;
  w: number;
  ratio: number;
  speed: number;
}

// 6-slot coordinate matrix reverse-engineered from 21st.dev/@sajad/components/scattered-about
// Flanking the protected center corridor (31% to 66%)
const SLOTS: Slot[] = [
  { left: 0, top: 10, w: 17, ratio: 4 / 5, speed: 60 },
  { left: 21, top: 0, w: 10, ratio: 3 / 4, speed: 120 },
  { left: 8, top: 70, w: 12, ratio: 1, speed: 30 },
  { left: 66, top: 12, w: 9, ratio: 1, speed: 110 },
  { left: 79, top: 0, w: 21, ratio: 4 / 5, speed: 50 },
  { left: 72, top: 72, w: 13, ratio: 4 / 3, speed: 90 },
];

const COMMUNITY_SHOTS = [
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    title: 'Hackathon Sprint Floor',
    tag: 'COLLABORATE',
  },
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    title: 'Late-Night Build Session',
    tag: 'CODE',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    title: 'Hardware & IoT Lab',
    tag: 'TINKER',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    title: 'Pair Programming & Review',
    tag: 'PEER REVIEW',
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    title: 'Demo Night Stage',
    tag: 'SHIP & PITCH',
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    title: 'Systems & Architecture Sync',
    tag: 'DESIGN',
  },
];

export default function ExploreCommunity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pillars = [
    {
      title: 'Weekly Build Sprints',
      desc: 'Ship code every single week with real-time peer reviews, demo nights, and direct feedback.',
      icon: Terminal,
      tag: 'ACTIVE CADENCE',
    },
    {
      title: 'Technical Guilds',
      desc: 'Deep-dive into specialized interest groups covering Artificial Intelligence, Systems, and Web3.',
      icon: Sparkles,
      tag: 'COLLABORATIVE',
    },
    {
      title: 'Open Ecosystem',
      desc: 'Build open-source tools, share deployment infrastructure, and find teammates for your next venture.',
      icon: Globe,
      tag: 'CROSS-DISCIPLINARY',
    },
  ];

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Only run differential parallax on desktop viewports
      mm.add('(min-width: 768px)', () => {
        photoRefs.current.forEach((el, index) => {
          if (!el) return;
          const slot = SLOTS[index];
          if (!slot) return;

          // Parallax float across scroll from start to end
          gsap.fromTo(
            el,
            { y: slot.speed },
            {
              y: -slot.speed,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section id="community" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-pink-600/10 to-indigo-600/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Scattered About Hero Showcase */}
        <div ref={containerRef} className="relative w-full mb-16 md:mb-24">
          {/* Desktop Scattered Grid (md+) */}
          <div className="relative mx-auto hidden aspect-[1312/620] w-full max-w-[1312px] md:block select-none">
            {/* The 6 Scattered Parallax Photos */}
            {COMMUNITY_SHOTS.map((item, idx) => {
              const slot = SLOTS[idx];
              return (
                <div
                  key={idx}
                  ref={(el) => (photoRefs.current[idx] = el)}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${slot.left}%`,
                    top: `${slot.top}%`,
                    width: `${slot.w}%`,
                    aspectRatio: slot.ratio,
                  }}
                >
                  <div className="group relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0E1626]/80 shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay & Tag */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
                    
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-mono-label text-[9px] tracking-wider text-pink-300 bg-black/60 border border-pink-500/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Protected Center Copy Corridor */}
            <div className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-auto">
              <SectionKicker label="03 // ECOSYSTEM" className="mb-4 inline-flex justify-center" />
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-sans text-white tracking-tight leading-[1.08] mb-4">
                BUILDER{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500">
                  COMMUNITY
                </span>
              </h2>
              <p className="mx-auto max-w-[42ch] text-sm md:text-base leading-relaxed text-gray-300 font-sans mb-7">
                A collective of curious creators who do not just talk about ideas: we build, test, and ship them.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button to="/community" variant="primary" size="md" className="group">
                  MEET THE COMMUNITY
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Stacked Layout (< md) */}
          <div className="md:hidden">
            <div className="text-center mb-8">
              <SectionKicker label="03 // ECOSYSTEM" className="mb-3 inline-flex justify-center" />
              <h2 className="text-3xl font-bold font-sans text-white tracking-tight mb-3">
                BUILDER{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500">
                  COMMUNITY
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
                A collective of curious creators who do not just talk about ideas: we build, test, and ship them.
              </p>
              <Button to="/community" variant="primary" size="sm" className="group mx-auto">
                MEET THE COMMUNITY
                <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Horizontal Swipe Rail on Mobile */}
            <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-none snap-x snap-mandatory">
              {COMMUNITY_SHOTS.map((item, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/5] w-[46vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0E1626] relative snap-center shadow-lg"
                >
                  <img src={item.url} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-mono-label text-[9px] tracking-wider text-pink-300 bg-black/60 border border-pink-500/30 px-1.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1626]/60 to-[#070B14]/80 p-8 flex flex-col justify-between hover:border-pink-500/40 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-label text-[11px] tracking-wider text-pink-400 font-bold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                      {pillar.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Card Bar */}
        <div className="relative rounded-2xl border border-pink-500/30 bg-gradient-to-r from-space-900/90 via-[#130E20]/90 to-space-900/90 p-8 md:p-10 overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold font-sans text-white mb-2">
                Connect with the Network
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                Join our builder discussions, participate in upcoming hackathons, and share what you are creating.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Button to="/community" variant="primary" size="md" className="group">
                MEET THE COMMUNITY
                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                href="https://discord.gg/impulse"
                external
                variant="secondary"
                size="md"
                className="group"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                DISCORD SERVER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
