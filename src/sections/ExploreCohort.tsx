import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Code2, Rocket, Users, Activity, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreCohort() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardSlotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const slot = cardSlotRef.current;
    const leftCol = leftColRef.current;
    const card1 = card1Ref.current;
    const card3 = card3Ref.current;
    const cta = ctaRef.current;

    if (!container || !card || !slot) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || isMobile) {
      // Reset transforms for reduced motion or mobile fallback
      card.style.transform = 'none';
      card.style.borderRadius = '24px';
      if (leftCol) { leftCol.style.opacity = '1'; leftCol.style.transform = 'none'; }
      if (card1) { card1.style.opacity = '1'; card1.style.transform = 'none'; }
      if (card3) { card3.style.opacity = '1'; card3.style.transform = 'none'; }
      if (cta) { cta.style.opacity = '1'; cta.style.transform = 'none'; }
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const totalScroll = container.offsetHeight - viewportH;
        if (totalScroll <= 0) return;

        // Progress 0 = top of container enters top of viewport
        // Progress 1 = bottom of container reaches bottom of viewport
        const rawProgress = -containerRect.top / totalScroll;
        const progress = Math.min(1, Math.max(0, rawProgress));

        // Morph phases:
        // 0.00 -> 0.10: Hold full screen
        // 0.10 -> 0.70: Smooth morph & translate to slot
        // 0.70 -> 1.00: Fully settled & docked
        const morphStart = 0.08;
        const morphEnd = 0.68;
        const rawT = (progress - morphStart) / (morphEnd - morphStart);
        const t = Math.min(1, Math.max(0, rawT));

        // Smooth cubic ease-in-out
        const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // Calculate card morph geometry relative to slot
        const slotRect = slot.getBoundingClientRect();
        const viewportW = window.innerWidth;

        // Full screen scale ratios
        const scaleXAtZero = viewportW / Math.max(slotRect.width, 1);
        const scaleYAtZero = viewportH / Math.max(slotRect.height, 1);

        // Calculate translation delta to center of screen when t = 0
        const slotCenterX = slotRect.left + slotRect.width / 2;
        const slotCenterY = slotRect.top + slotRect.height / 2;
        const screenCenterX = viewportW / 2;
        const screenCenterY = viewportH / 2;

        const deltaXAtZero = screenCenterX - slotCenterX;
        const deltaYAtZero = screenCenterY - slotCenterY;

        // Interpolate transforms
        const currentScaleX = 1 + (scaleXAtZero - 1) * (1 - easeT);
        const currentScaleY = 1 + (scaleYAtZero - 1) * (1 - easeT);
        const currentDeltaX = deltaXAtZero * (1 - easeT);
        const currentDeltaY = deltaYAtZero * (1 - easeT);
        const currentRadius = 24 * easeT;

        card.style.transform = `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0) scale(${currentScaleX}, ${currentScaleY})`;
        card.style.borderRadius = `${currentRadius}px`;

        // Secondary elements emerge as card shrinks (p: 0.25 -> 0.70)
        const secondaryProgress = Math.min(1, Math.max(0, (progress - 0.2) / 0.48));
        const secondaryEase = secondaryProgress * secondaryProgress * (3 - 2 * secondaryProgress); // smoothstep

        if (leftCol) {
          leftCol.style.opacity = `${secondaryEase}`;
          leftCol.style.transform = `translate3d(${(1 - secondaryEase) * -40}px, 0, 0)`;
        }

        if (card1) {
          card1.style.opacity = `${secondaryEase}`;
          card1.style.transform = `translate3d(0, ${(1 - secondaryEase) * -30}px, 0)`;
        }

        if (card3) {
          card3.style.opacity = `${secondaryEase}`;
          card3.style.transform = `translate3d(0, ${(1 - secondaryEase) * 30}px, 0)`;
        }

        if (cta) {
          cta.style.opacity = `${secondaryEase}`;
          cta.style.transform = `translate3d(0, ${(1 - secondaryEase) * 20}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      id="cohort"
      className="relative w-full border-t border-[#2563EB]/30 overflow-visible"
      style={{ minHeight: isMobile ? 'auto' : '260vh' }}
    >
      {/* Sticky Frame: pins during the scroll-morph */}
      <div
        ref={stickyRef}
        className={
          isMobile
            ? 'relative w-full py-16 px-6'
            : 'sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center px-6 lg:px-12'
        }
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Kicker, Story, & CTA */}
            <div ref={leftColRef} className="lg:col-span-5 will-change-transform z-10">
              <SectionKicker label="02 // INCUBATOR" className="mb-4" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-sans text-white tracking-tight leading-[1.08] mb-4">
                BUILDER{' '}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#EC4899] bg-clip-text text-transparent">
                  COHORT
                </span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base font-sans leading-relaxed mb-6 max-w-lg">
                A high-intensity, 5-month cohort turning builders into venture product teams.
                From rigorous problem validation to live production deployment with real users.
              </p>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-label text-xs tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                CYCLE 1 ACTIVE · 5 PRODUCT TEAMS SHIPPING
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/cohort" variant="primary" size="md" className="group">
                  EXPLORE THE COHORT
                  <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Link
                  to="/cohort#projects"
                  className="inline-flex items-center gap-2 text-xs font-mono-label tracking-wider text-gray-400 hover:text-white transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
                  VIEW PRODUCTS & STACKS
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Cohort Phases (With Phase 02 as the morphing hero) */}
            <div className="lg:col-span-7 flex flex-col gap-4 relative z-20">
              
              {/* Phase 01: Problem & Validation (Completed / Predecessor) */}
              <div
                ref={card1Ref}
                className="will-change-transform rounded-2xl border border-white/10 bg-[#0E1626]/70 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-[#2563EB]/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono-label text-[11px] tracking-wider text-[#60A5FA] font-bold">
                        PHASE // 01
                      </span>
                      <span className="text-[10px] font-mono-label px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        OCTOBER · COMPLETED
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                      Problem & User Validation
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-sans mt-0.5 max-w-md line-clamp-1 sm:line-clamp-none">
                      Form teams, interview 30+ actual users, and stress-test assumptions before code.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-label text-emerald-400/90 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validated</span>
                </div>
              </div>

              {/* Phase 02 Slot (The Docking Target Anchor) */}
              <div
                ref={cardSlotRef}
                className="relative min-h-[220px] sm:min-h-[240px] w-full"
              >
                {/* The Morphing Hero Card */}
                <div
                  ref={cardRef}
                  className="absolute inset-0 will-change-transform overflow-hidden border border-[#2563EB]/60 bg-gradient-to-br from-[#0B132B]/95 via-[#070B14]/95 to-[#0E1626]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(37,99,235,0.25)] flex flex-col justify-between p-6 sm:p-8 transform-gpu"
                  style={{ transformOrigin: 'center center' }}
                >
                  {/* Card Glowing Accents & Scanline */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#2563EB]/25 via-[#EC4899]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                  {/* Top Bar: Status Beacon & Phase Tag */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#EC4899] p-[1px] shrink-0">
                        <div className="w-full h-full rounded-[11px] bg-[#070B14] flex items-center justify-center text-white">
                          <Code2 className="w-4 h-4 text-[#60A5FA]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-label text-xs tracking-wider text-pink-400 font-bold">
                            PHASE // 02
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono-label px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            CURRENTLY ONGOING
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight">
                          Sprint & MVP Build
                        </h3>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end">
                      <span className="font-mono-label text-[10px] text-gray-400 uppercase tracking-widest">Sprint Velocity</span>
                      <span className="font-mono text-sm font-semibold text-emerald-400">94.2% Ship Rate</span>
                    </div>
                  </div>

                  {/* Middle Content: Telemetry & Narrative */}
                  <div className="relative z-10 my-4 sm:my-5">
                    <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed mb-4 max-w-xl">
                      Weekly architecture sprints, automated test pipelines, and security reviews.
                      Product teams ship functional V1s with live telemetry.
                    </p>

                    {/* Live Sprint Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] font-mono-label text-gray-400 mb-0.5">TIMELINE</span>
                        <span className="block text-xs font-mono font-bold text-white">Day 42 / 150</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] font-mono-label text-gray-400 mb-0.5">TEAMS</span>
                        <span className="block text-xs font-mono font-bold text-[#60A5FA]">5 Active Teams</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] font-mono-label text-gray-400 mb-0.5">CADENCE</span>
                        <span className="block text-xs font-mono font-bold text-pink-400">Weekly Sprints</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] font-mono-label text-gray-400 mb-0.5">MILESTONE</span>
                        <span className="block text-xs font-mono font-bold text-emerald-400">V1 Code Freeze</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer: Tech Stacks & Milestone Progress */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-400 font-mono-label text-[11px]">
                      <Activity className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <span>Sprint Focus: Architecture & Core API</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-400">Target:</span>
                      <span className="text-[11px] font-mono-label px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Delhi Demo Day 2027
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 03: Launch & Demo Day (Upcoming Finale) */}
              <div
                ref={card3Ref}
                className="will-change-transform rounded-2xl border border-white/10 bg-[#0E1626]/70 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-pink-500/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono-label text-[11px] tracking-wider text-pink-400 font-bold">
                        PHASE // 03
                      </span>
                      <span className="text-[10px] font-mono-label px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                        FEBRUARY · UPCOMING
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                      Ship, Showcase & Demo Day
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-sans mt-0.5 max-w-md line-clamp-1 sm:line-clamp-none">
                      Launch production products, acquire real users, and pitch to venture scouts and founders.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-label text-pink-400/90 shrink-0">
                  <Sparkles className="w-4 h-4" />
                  <span>Grand Finale</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
