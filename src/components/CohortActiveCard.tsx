import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Code2, Cpu, Database, Flame, Layers, Rocket, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface CohortActiveCardProps {
  className?: string;
}

const COHORT_PROJECTS = [
  {
    id: 'tracekit',
    name: 'TraceKit',
    category: 'DEVELOPER TOOLS',
    summary: 'Async failures are hard to trace across separate tools; TraceKit connects each background job run to its logs, retries, and execution timeline in a unified streaming console.',
    milestone: 'Core trace engine active · Sprint focused on replay safety & SDK instrumentation',
    stack: ['Go', 'Redis', 'ClickHouse', 'React', 'gRPC'],
    team: '3 Builders · Lead: Zoya Iyer',
    velocity: '96% on-time ship rate',
    status: 'Functional V1 in Alpha',
  },
  {
    id: 'fieldnotes',
    name: 'FieldNotes',
    category: 'AI & RESEARCH',
    summary: 'Interview findings are difficult to revisit and cite; FieldNotes transcribes customer interviews and links searchable synthesis themes directly to timestamped audio clips.',
    milestone: 'Transcription pipeline complete · Sprint focused on collaborative semantic tagging',
    stack: ['Python', 'FastAPI', 'Whisper', 'pgvector', 'Tailwind'],
    team: '3 Builders · Lead: Anaya Sen',
    velocity: '92% on-time ship rate',
    status: 'Research Preview Live',
  },
];

export default function CohortActiveCard({ className = '' }: CohortActiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [activeProjectId, setActiveProjectId] = useState<string>('tracekit');
  const [isHovered, setIsHovered] = useState(false);

  const activeProject = COHORT_PROJECTS.find((p) => p.id === activeProjectId) || COHORT_PROJECTS[0];

  // 3D tilt & glare physics
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6.5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(96, 165, 250, 0.22) 0%, rgba(236, 72, 153, 0.08) 45%, transparent 75%)`;
      glareRef.current.style.opacity = '1';
    }
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto ${className}`}
      style={{ perspective: '1200px' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {/* Outer Glow Halo */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#2563EB]/40 via-[#60A5FA]/20 to-[#EC4899]/35 blur-xl opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovered ? 0.9 : 0.45 }}
      />

      {/* Main Hardware Container */}
      <div
        ref={cardRef}
        className="relative rounded-3xl border border-[#2563EB]/40 bg-gradient-to-b from-[#0B132B]/95 via-[#070B14]/98 to-[#0E1626]/95 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,99,235,0.15)] transition-shadow duration-300 select-none"
        style={{
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Dynamic Specular Glare */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Cyberpunk HUD Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 px-6 sm:px-8 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="font-mono-label text-xs tracking-wider text-emerald-400 font-bold">
              CURRENTLY ONGOING
            </span>
            <span className="text-gray-500 font-mono text-xs">/</span>
            <span className="font-mono-label text-xs tracking-wider text-[#93C5FD]">
              CYCLE 01 · CHAPTER ONE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[11px] px-2.5 py-1 rounded-md bg-[#2563EB]/15 border border-[#2563EB]/35 text-[#60A5FA]">
              PHASE // 02
            </span>
            <span className="font-mono-label text-[11px] px-2.5 py-1 rounded-md bg-pink-500/10 border border-pink-500/25 text-pink-400">
              SPRINT & BUILD
            </span>
          </div>
        </div>

        {/* Middle Body */}
        <div className="relative z-10 p-6 sm:p-8">
          
          {/* Main Title & Phase Description */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
                Turning validated problems into{' '}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#EC4899] bg-clip-text text-transparent">
                  shipping products.
                </span>
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-sans leading-relaxed mt-2.5 max-w-2xl">
                Five teams are currently deep in the 5-month sprint. Every Saturday, builders review
                distributed architectures, push tested commits, and clear milestone audits.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="shrink-0 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
              <div>
                <span className="block text-[10px] font-mono-label text-gray-400 uppercase tracking-wider">Sprint Velocity</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">94.2%</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="block text-[10px] font-mono-label text-gray-400 uppercase tracking-wider">Days in Sprint</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white">42 <span className="text-xs text-gray-500 font-normal">/ 150</span></span>
              </div>
            </div>
          </div>

          {/* Active Product Spotlight Section */}
          <div className="rounded-2xl border border-white/10 bg-[#070B14]/80 p-5 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono-label text-gray-400">
                <Terminal className="w-4 h-4 text-[#60A5FA]" />
                <span className="uppercase tracking-wider">Active Teams in Sprint (Click to Inspect)</span>
              </div>

              {/* Project Selectors */}
              <div className="flex items-center gap-2">
                {COHORT_PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-label tracking-wider transition-all duration-200 cursor-pointer ${
                      activeProjectId === proj.id
                        ? 'bg-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.5)] font-bold'
                        : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {proj.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl sm:text-2xl font-bold font-sans text-white">
                    {activeProject.name}
                  </h4>
                  <span className="text-[10px] font-mono-label px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {activeProject.category}
                  </span>
                  <span className="text-[10px] font-mono-label text-gray-500">
                    {activeProject.team}
                  </span>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                  {activeProject.summary}
                </p>

                {/* Live Milestone */}
                <div className="flex items-center gap-2 text-xs font-mono-label text-pink-300/90 bg-pink-500/[0.08] border border-pink-500/20 px-3 py-2 rounded-lg">
                  <Flame className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>{activeProject.milestone}</span>
                </div>
              </div>

              {/* Stack & Ship Status */}
              <div className="lg:col-span-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-3">
                <div>
                  <span className="block text-[10px] font-mono-label text-gray-400 mb-2 uppercase tracking-wider">
                    Target Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono-label text-[10px]">STAGE:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{activeProject.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Month Sprint Journey Track */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-mono-label text-gray-400 mb-3">
              <span className="tracking-wider uppercase">Incubator Curriculum Pipeline</span>
              <span className="text-[#60A5FA]">Grand Finale: 23 Jan 2027 · Delhi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono-label text-[10px] text-gray-400">PHASE 01 · OCT</span>
                  <span className="block font-sans text-xs font-bold text-gray-200">Problem Validation</span>
                </div>
              </div>

              {/* Step 2 (Active) */}
              <div className="p-3.5 rounded-xl border border-[#2563EB]/60 bg-[#2563EB]/10 flex items-center gap-3 shadow-[0_0_16px_rgba(37,99,235,0.2)]">
                <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono-label text-[10px] text-blue-300 font-bold">PHASE 02 · DEC (CURRENT)</span>
                  <span className="block font-sans text-xs font-bold text-white">Sprint & MVP Build</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono-label text-[10px] text-gray-400">PHASE 03 · FEB</span>
                  <span className="block font-sans text-xs font-bold text-gray-200">Ship & Demo Day</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-white/[0.015] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono-label">
            <span className="text-[#60A5FA]">◆</span>
            <span>Live telemetry synced with Chapter One repositories</span>
          </div>

          <Link
            to="/cohort"
            className="inline-flex items-center gap-2 text-xs font-mono-label tracking-wider text-white hover:text-pink-300 transition-colors font-semibold group"
          >
            EXPLORE THE FULL CURRICULUM
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
