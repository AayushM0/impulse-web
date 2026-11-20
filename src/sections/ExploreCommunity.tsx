import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquare, Terminal, Sparkles, Globe } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

interface CommunityCard {
  tag: string;
  title: string;
  desc: string;
  icon: typeof Terminal;
  accent: 'pink' | 'blue';
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

interface CardSlot {
  left: number;  // % from container left
  top: number;   // % from container top
  width: number; // % width of container
  speed: number; // parallax travel distance (px)
}

// 4 scattered card positions flanking the center corridor (31% to 69%)
const CARD_SLOTS: CardSlot[] = [
  // Top Left
  { left: 0, top: 4, width: 28, speed: 60 },
  // Bottom Left
  { left: 2, top: 54, width: 28, speed: 30 },
  // Top Right
  { left: 72, top: 6, width: 28, speed: 75 },
  // Bottom Right
  { left: 70, top: 56, width: 28, speed: 40 },
];

const COMMUNITY_CARDS: CommunityCard[] = [
  {
    tag: 'ACTIVE CADENCE',
    title: 'Weekly Build Sprints',
    desc: 'Ship code every single week with real-time peer reviews, demo nights, and direct feedback.',
    icon: Terminal,
    accent: 'pink',
  },
  {
    tag: 'COLLABORATIVE',
    title: 'Technical Guilds',
    desc: 'Deep-dive into specialized interest groups covering Artificial Intelligence, Systems, and Web3.',
    icon: Sparkles,
    accent: 'blue',
  },
  {
    tag: 'CROSS-DISCIPLINARY',
    title: 'Open Ecosystem',
    desc: 'Build open-source tools, share deployment infrastructure, and find teammates for your next venture.',
    icon: Globe,
    accent: 'blue',
  },
  {
    tag: 'COMMUNITY CHAT',
    title: 'Connect with the Network',
    desc: 'Join builder discussions, participate in upcoming hackathons, and share what you are creating.',
    icon: MessageSquare,
    accent: 'pink',
    cta: {
      label: 'JOIN DISCORD',
      href: 'https://discord.gg/impulse',
      external: true,
    },
  },
];

export default function ExploreCommunity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Differential parallax on desktop screens (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        cardRefs.current.forEach((el, index) => {
          if (!el) return;
          const slot = CARD_SLOTS[index];
          if (!slot) return;

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
    <section id="community" className="relative py-20 md:py-28 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-blue-600/10 via-pink-600/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Desktop Scattered Cards Layout (>= 1024px) */}
        <div ref={containerRef} className="relative hidden lg:block w-full min-h-[640px] aspect-[1280/640]">
          {/* The 4 Scattered Community Cards */}
          {COMMUNITY_CARDS.map((card, idx) => {
            const slot = CARD_SLOTS[idx];
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="absolute pointer-events-auto"
                style={{
                  left: `${slot.left}%`,
                  top: `${slot.top}%`,
                  width: `${slot.width}%`,
                }}
              >
                <div
                  className={`group relative rounded-2xl border p-6 xl:p-7 flex flex-col justify-between transition-all duration-500 backdrop-blur-md shadow-[0_16px_36px_rgba(0,0,0,0.65)] ${
                    card.accent === 'pink'
                      ? 'border-white/10 bg-gradient-to-b from-[#140E1E]/90 via-[#0E1626]/80 to-[#070B14]/95 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]'
                      : 'border-white/10 bg-gradient-to-b from-[#0B1528]/90 via-[#0E1626]/80 to-[#070B14]/95 hover:border-blue-500/50 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-mono-label text-[10px] tracking-wider font-bold px-2 py-0.5 rounded border ${
                          card.accent === 'pink'
                            ? 'text-pink-400 bg-pink-500/10 border-pink-500/20'
                            : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                        }`}
                      >
                        {card.tag}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                          card.accent === 'pink'
                            ? 'bg-pink-500/10 border-pink-500/20 text-pink-400'
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg xl:text-xl font-bold font-sans text-white mb-2.5 tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-gray-300/80 text-xs xl:text-sm leading-relaxed font-sans">
                      {card.desc}
                    </p>
                  </div>

                  {card.cta && (
                    <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between">
                      <a
                        href={card.cta.href}
                        target={card.cta.external ? '_blank' : undefined}
                        rel={card.cta.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-xs font-mono-label text-indigo-300 hover:text-white transition-colors"
                      >
                        {card.cta.label}
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Protected Center Corridor with Heading & CTA */}
          <div className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-auto">
            <SectionKicker label="03 // ECOSYSTEM" className="mb-4 inline-flex justify-center" />
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-sans text-white tracking-tight leading-[1.08] mb-4">
              BUILDER{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500">
                COMMUNITY
              </span>
            </h2>
            <p className="mx-auto max-w-[40ch] text-sm md:text-base leading-relaxed text-gray-300 font-sans mb-7">
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

        {/* Tablet & Mobile Stacked Layout (< 1024px) */}
        <div className="lg:hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <SectionKicker label="03 // ECOSYSTEM" className="mb-3 inline-flex justify-center" />
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight mb-3">
              BUILDER{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500">
                COMMUNITY
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-6">
              A collective of curious creators who do not just talk about ideas: we build, test, and ship them.
            </p>
            <Button to="/community" variant="primary" size="sm" className="group mx-auto">
              MEET THE COMMUNITY
              <ArrowRight aria-hidden="true" className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Community Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMUNITY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`rounded-2xl border p-6 flex flex-col justify-between ${
                    card.accent === 'pink'
                      ? 'border-white/10 bg-gradient-to-b from-[#140E1E]/90 to-[#070B14]/95'
                      : 'border-white/10 bg-gradient-to-b from-[#0B1528]/90 to-[#070B14]/95'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-mono-label text-[10px] tracking-wider font-bold px-2 py-0.5 rounded border ${
                          card.accent === 'pink'
                            ? 'text-pink-400 bg-pink-500/10 border-pink-500/20'
                            : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                        }`}
                      >
                        {card.tag}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                          card.accent === 'pink'
                            ? 'bg-pink-500/10 border-pink-500/20 text-pink-400'
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-sans text-white mb-2">
                      {card.title}
                    </h3>

                    <p className="text-gray-300/80 text-sm leading-relaxed font-sans">
                      {card.desc}
                    </p>
                  </div>

                  {card.cta && (
                    <div className="mt-5 pt-3.5 border-t border-white/5">
                      <a
                        href={card.cta.href}
                        target={card.cta.external ? '_blank' : undefined}
                        rel={card.cta.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-xs font-mono-label text-indigo-300 hover:text-white transition-colors"
                      >
                        {card.cta.label}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
