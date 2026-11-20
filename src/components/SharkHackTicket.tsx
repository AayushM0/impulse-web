import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Trophy, Sparkles } from 'lucide-react';

interface SharkHackTicketProps {
  className?: string;
}

export default function SharkHackTicket({ className = '' }: SharkHackTicketProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0, isMobile: false });
  const [isHovered, setIsHovered] = useState(false);

  // Measure actual pixel size for mathematical SVG path and clip-path
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDimensions({
          width: Math.round(width),
          height: Math.round(height),
          isMobile: width < 860,
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height, isMobile } = dimensions;

  // Geometry configuration
  const geometry = useMemo(() => {
    if (width === 0 || height === 0) return null;

    if (!isMobile) {
      // Landscape Ticket (Desktop)
      const corner = Math.min(24, Math.round(width * 0.025));
      const notch = Math.min(20, Math.round(height * 0.055));
      // Perforation line sits at ~73% of width
      const perfX = Math.round(width * 0.73);

      const path = [
        `M ${corner} 0`,
        `L ${perfX - notch} 0`,
        `A ${notch} ${notch} 0 0 0 ${perfX + notch} 0`,
        `L ${width - corner} 0`,
        `A ${corner} ${corner} 0 0 1 ${width} ${corner}`,
        `L ${width} ${height - corner}`,
        `A ${corner} ${corner} 0 0 1 ${width - corner} ${height}`,
        `L ${perfX + notch} ${height}`,
        `A ${notch} ${notch} 0 0 0 ${perfX - notch} ${height}`,
        `L ${corner} ${height}`,
        `A ${corner} ${corner} 0 0 1 0 ${height - corner}`,
        `L 0 ${corner}`,
        `A ${corner} ${corner} 0 0 1 ${corner} 0`,
        'Z',
      ].join(' ');

      return { path, perfX, perfY: 0, notch, corner, isMobile: false };
    } else {
      // Portrait Ticket (Mobile)
      const corner = Math.min(22, Math.round(width * 0.04));
      const notch = Math.min(18, Math.round(width * 0.045));
      // Perforation line sits at ~74% of height
      const perfY = Math.round(height * 0.74);

      const path = [
        `M ${corner} 0`,
        `L ${width - corner} 0`,
        `A ${corner} ${corner} 0 0 1 ${width} ${corner}`,
        `L ${width} ${perfY - notch}`,
        `A ${notch} ${notch} 0 0 0 ${width} ${perfY + notch}`,
        `L ${width} ${height - corner}`,
        `A ${corner} ${corner} 0 0 1 ${width - corner} ${height}`,
        `L ${corner} ${height}`,
        `A ${corner} ${corner} 0 0 1 0 ${height - corner}`,
        `L 0 ${perfY + notch}`,
        `A ${notch} ${notch} 0 0 0 0 ${perfY - notch}`,
        `L 0 ${corner}`,
        `A ${corner} ${corner} 0 0 1 ${corner} 0`,
        'Z',
      ].join(' ');

      return { path, perfX: 0, perfY, notch, corner, isMobile: true };
    }
  }, [width, height, isMobile]);

  // Interactive 3D tilt & glare physics
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 7;
    const rotX = -yRatio * 2 * maxTilt;
    const rotY = xRatio * 2 * maxTilt;

    card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.012)`;

    if (glareRef.current) {
      const glareX = (xRatio + 0.5) * 100;
      const glareY = (yRatio + 0.5) * 100;
      glareRef.current.style.background = `radial-gradient(45% 45% at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.14) 0%, rgba(96, 165, 250, 0.08) 35%, transparent 75%)`;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  }, []);

  const clipPathStyle = geometry ? `path('${geometry.path}')` : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto will-change-transform ${className}`.trim()}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={cardRef}
        className="relative w-full transition-transform duration-300 ease-out select-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
          filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(37, 99, 235, 0.18))',
        }}
      >
        {/* Ticket Base Container with Clip Path */}
        <div
          className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B1222] via-[#070B14] to-[#0A101D] min-h-[520px] md:min-h-[440px]"
          style={{ clipPath: clipPathStyle }}
        >
          {/* Subtle Ambient Nebula Spotlights inside the ticket */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-pink-600/12 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 -right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle Cyber Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Watermark in background */}
          <div
            className="absolute font-mono font-black select-none pointer-events-none opacity-[0.04] text-white tracking-tighter"
            style={
              !isMobile
                ? {
                    right: '32px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 'clamp(80px, 11vw, 130px)',
                    writingMode: 'vertical-rl',
                  }
                : {
                    bottom: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '64px',
                  }
            }
            aria-hidden="true"
          >
            2027
          </div>

          {/* Main Layout Grid */}
          <div className="relative z-10 flex flex-col md:flex-row h-full">
            {/* === LEFT SIDE: MAIN TICKET BODY === */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Top Bar: Kicker + Live Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#93C5FD] border border-[#2563EB]/40 bg-[#070B14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_2px_12px_rgba(7,11,20,0.8)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_10px_#60A5FA] animate-pulse" />
                    <span>IMPULSE · CHAPTER ONE FINALE</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/25">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>REGISTRATION LIVE</span>
                  </div>
                </div>

                {/* Event Heading */}
                <div className="mb-4">
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-impulse-blue-bright mb-1.5">
                    ALL-INDIA HACKATHON
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight">
                    SHARK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#C084FC] to-[#F472B6]">HACK</span>
                  </h3>
                </div>

                {/* Tagline */}
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 font-sans">
                  Our flagship 36-hour offline hackathon. Shortlisted teams build production software and pitch live to Sharks in New Delhi.
                </p>

                {/* Event Meta Badges */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-mono font-semibold text-gray-300 mb-8">
                  <span className="inline-flex items-center gap-1.5 bg-space-900/90 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" /> Jan 23–24, 2027
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-space-900/90 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" /> Offline / New Delhi
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-space-900/90 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" /> ₹1 Lakh+ Prize Pool
                  </span>
                </div>
              </div>

              {/* Bottom Actions + Tracks */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/shark-hack"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-space-950 hover:bg-[#F2F6FF] font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.4)]"
                  >
                    <span>EXPLORE SHARKHACK</span>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/events"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300"
                  >
                    <span>ALL EVENTS</span>
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                </div>

                {/* Tracks preview */}
                <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <span className="text-gray-500">TRACKS:</span>
                  <span className="text-gray-300">AI/ML</span> ·
                  <span className="text-gray-300">Web3</span> ·
                  <span className="text-gray-300">DevTools</span> ·
                  <span className="text-gray-300">Open</span>
                </div>
              </div>
            </div>

            {/* === RIGHT SIDE: PERFORATED TEAR-OFF STUB === */}
            <div
              className={`relative flex flex-col justify-between ${
                !isMobile
                  ? 'w-[27%] border-l border-dashed border-[#2563EB]/40 bg-[#070B14]/60 p-6 sm:p-8'
                  : 'w-full border-t border-dashed border-[#2563EB]/40 bg-[#070B14]/60 p-6'
              }`}
            >
              {/* Stub Header */}
              <div className="flex items-center justify-between md:flex-col md:items-start gap-2">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#93C5FD] uppercase">
                  ADMIT ONE
                </span>
                <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">
                  HACKER PASS
                </span>
              </div>

              {/* Vertical Title / Badge on Desktop */}
              {!isMobile ? (
                <div className="my-auto py-6 flex items-center justify-center">
                  <div
                    className="font-mono text-xs font-black tracking-[0.25em] text-gray-300 select-none uppercase opacity-80"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    SHARKHACK · 2027
                  </div>
                </div>
              ) : null}

              {/* Barcode & Serial */}
              <div className="flex flex-col items-center md:items-start gap-2 pt-3">
                {/* SVG Vector Barcode */}
                <div className="w-full flex justify-center md:justify-start" aria-hidden="true">
                  <svg
                    viewBox="0 0 140 32"
                    className="h-8 w-36 text-gray-300 opacity-75"
                    fill="currentColor"
                  >
                    <rect x="0" y="0" width="3" height="32" />
                    <rect x="5" y="0" width="2" height="32" />
                    <rect x="9" y="0" width="4" height="32" />
                    <rect x="15" y="0" width="1" height="32" />
                    <rect x="18" y="0" width="3" height="32" />
                    <rect x="23" y="0" width="2" height="32" />
                    <rect x="27" y="0" width="5" height="32" />
                    <rect x="34" y="0" width="2" height="32" />
                    <rect x="38" y="0" width="3" height="32" />
                    <rect x="43" y="0" width="1" height="32" />
                    <rect x="46" y="0" width="4" height="32" />
                    <rect x="52" y="0" width="2" height="32" />
                    <rect x="56" y="0" width="3" height="32" />
                    <rect x="61" y="0" width="5" height="32" />
                    <rect x="68" y="0" width="2" height="32" />
                    <rect x="72" y="0" width="1" height="32" />
                    <rect x="75" y="0" width="4" height="32" />
                    <rect x="81" y="0" width="3" height="32" />
                    <rect x="86" y="0" width="2" height="32" />
                    <rect x="90" y="0" width="4" height="32" />
                    <rect x="96" y="0" width="1" height="32" />
                    <rect x="99" y="0" width="5" height="32" />
                    <rect x="106" y="0" width="2" height="32" />
                    <rect x="110" y="0" width="3" height="32" />
                    <rect x="115" y="0" width="2" height="32" />
                    <rect x="119" y="0" width="4" height="32" />
                    <rect x="125" y="0" width="1" height="32" />
                    <rect x="128" y="0" width="3" height="32" />
                    <rect x="133" y="0" width="2" height="32" />
                    <rect x="137" y="0" width="3" height="32" />
                  </svg>
                </div>

                <div className="flex items-center justify-between w-full font-mono text-[9px] tracking-wider text-gray-400">
                  <span>IMP-SHK-027</span>
                  <span>DELHI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Glare Overlay */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              clipPath: clipPathStyle,
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Outer SVG Border Stroke Following Exact Notches and Curves */}
        {geometry && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
          >
            {/* Ambient Cyan/Sapphire Outer Glow */}
            <path
              d={geometry.path}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              strokeOpacity="0.25"
              className="filter blur-[2px]"
            />
            {/* Crisp Top Rim Outline */}
            <path
              d={geometry.path}
              fill="none"
              stroke="rgba(96, 165, 250, 0.45)"
              strokeWidth="1.25"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
