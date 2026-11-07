import { useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const ThreeHeroLogoScene = lazy(() => import('@/components/3d/ThreeHeroLogoScene'));

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const actionGroupRef = useRef<HTMLDivElement>(null);
  const initialCueRef = useRef<HTMLDivElement>(null);
  const settledCueRef = useRef<HTMLDivElement>(null);
  const topSealRef = useRef<HTMLDivElement>(null);
  const wordmarkWrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      if (wordmarkWrapperRef.current) {
        wordmarkWrapperRef.current.style.transform = `translate3d(${x * -12}px, ${y * -12}px, 30px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        scrollProgressRef.current = 1;
        if (wordmarkRef.current) gsap.set(wordmarkRef.current, { opacity: 1, scale: 1 });
        if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        if (actionGroupRef.current) gsap.set(actionGroupRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Timeline pinned for 1600px of scroll travel on desktop or 800px on mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=800' : '+=1600'),
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // 1. Initial cue fades out immediately
      tl.to(initialCueRef.current, { opacity: 0, duration: 0.2 }, 0);

      // 2. Top seal illuminates
      tl.to(topSealRef.current, { opacity: 1, duration: 0.4 }, 0.1);

      // 3. "IMPULSE" wordmark scales up and emerges
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1.0, ease: 'power2.out', duration: 0.55 },
        0.12
      );

      // 4. Subtitle reveals directly underneath
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35 },
        0.45
      );

      // 5. Direct Action Group reveals
      tl.fromTo(
        actionGroupRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35 },
        0.6
      );

      // 6. Settled prompt indicates user can continue scrolling down
      tl.fromTo(
        settledCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
        0.75
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-space-950 overflow-hidden flex flex-col justify-between items-center px-6 py-8 select-none"
    >
      {/* Fullscreen Background 3D Canvas */}
      <Suspense fallback={null}>
        <ThreeHeroLogoScene
          scrollProgress={scrollProgressRef}
          className="absolute inset-0 w-full h-full z-0"
        />
      </Suspense>

      {/* Subtle Background Architectural Grid */}
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none z-0" aria-hidden="true" />

      {/* Ambient Lighting Well */}
      <div className="absolute inset-0 ambient-glow-blue pointer-events-none z-0" aria-hidden="true" />

      {/* Radial Depth Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(5, 6, 16, 0.75) 70%, #050610 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header Stamp */}
      <div
        ref={topSealRef}
        className="relative z-20 mt-16 opacity-30 pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 font-mono-label text-[10px] sm:text-[11px] text-impulse-blue-bright/80 border border-impulse-blue/20 bg-space-900/60 backdrop-blur-md px-3.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-impulse-blue animate-pulse" />
          <span>ORIGIN // CHAPTER ONE</span>
        </div>
      </div>

      {/* Foreground Wordmark Layer (Centered in 3D Space) */}
      <div
        ref={wordmarkWrapperRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 pointer-events-auto will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, 30px)',
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Monumental Centered Wordmark */}
        <h1
          ref={wordmarkRef}
          className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] font-sans font-black tracking-[-0.03em] leading-none text-impulse-white opacity-0"
          style={{
            textShadow: '0 0 100px rgba(59, 130, 246, 0.5), 0 20px 40px rgba(0, 0, 0, 0.95)',
          }}
        >
          IMPULSE
        </h1>

        {/* Subtitle emerging directly underneath */}
        <div
          ref={subtitleRef}
          className="mt-4 sm:mt-6 flex items-center gap-3 opacity-0"
        >
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-impulse-blue/60" />
          <p className="font-mono-label text-xs sm:text-sm md:text-base tracking-[0.25em] text-gradient-impulse font-semibold">
            IDEAS IN MOTION
          </p>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-impulse-magenta/60" />
        </div>

        {/* Direct Action Group */}
        <div
          ref={actionGroupRef}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0 pointer-events-auto"
        >
          <a
            href="/cohort"
            className="font-mono-label text-[11px] sm:text-xs px-5 py-2.5 bg-impulse-blue text-white font-semibold rounded-sm border border-impulse-blue-bright/60 hover:bg-impulse-blue/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            EXPLORE COHORT
          </a>
          <a
            href="/shark-hack"
            className="font-mono-label text-[11px] sm:text-xs px-5 py-2.5 bg-space-900/80 text-impulse-white rounded-sm border border-space-700 hover:border-impulse-blue/50 hover:bg-space-800 transition-all duration-300"
          >
            SHARK HACK
          </a>
        </div>
      </div>

      {/* Bottom Scroll Prompts */}
      <div className="relative z-20 flex flex-col items-center gap-2 mb-4 pointer-events-none">
        {/* Initial Prompt (Fades out immediately on scroll) */}
        <div
          ref={initialCueRef}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-[10px] text-impulse-blue-bright/70 tracking-[0.2em] animate-pulse">
            SCROLL TO REVEAL IMPULSE
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-impulse-blue/70 via-impulse-indigo/30 to-transparent" />
        </div>

        {/* Settled Prompt (Appears as lockup completes) */}
        <div
          ref={settledCueRef}
          className="absolute inset-0 flex flex-col items-center gap-1.5 opacity-0"
        >
          <span className="font-mono-label text-[10px] text-impulse-blue-bright/50 tracking-[0.2em]">
            CONTINUE SCROLLING
          </span>
          <div className="w-px h-5 bg-gradient-to-b from-impulse-blue/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
