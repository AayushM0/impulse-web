import { useState } from 'react';
import { ArrowRight, CheckCircle2, Code2, Rocket, Users, Sparkles, ChevronDown, Activity, Flame } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreCohort() {
  const [activePhase, setActivePhase] = useState<string>('02'); // Phase 02 is currently ongoing by default

  const phases = [
    {
      num: '01',
      title: 'Problem & Validation',
      tagline: 'Oct · Problem Discovery & User Validation',
      desc: 'Form teams, interview 30+ real users, and stress-test assumptions before writing a single line of code. Clear market-need milestones before architecture approvals.',
      icon: Users,
      statusLabel: 'Validated',
      statusType: 'completed',
      accentColor: 'text-[#60A5FA]',
      bgGradient: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      milestone: 'Milestone 01 Cleared · Market Need Verified',
    },
    {
      num: '02',
      title: 'Sprint & MVP Build',
      tagline: 'Dec · 5-Month High-Velocity Sprint',
      desc: 'Weekly architecture reviews, automated test pipelines, and security audits. Product teams ship functional V1s with live telemetry and real weekly user feedback.',
      icon: Code2,
      statusLabel: 'Currently Ongoing',
      statusType: 'active',
      accentColor: 'text-pink-400',
      bgGradient: 'from-[#2563EB]/20 via-[#0E1626]/90 to-[#070B14]/95',
      borderColor: 'border-[#2563EB]/70',
      milestone: 'Active Sprint: Day 42 / 150 · 94.2% Ship Rate',
    },
    {
      num: '03',
      title: 'Ship, Showcase & Demo Day',
      tagline: 'Feb · Grand Finale & Pitch',
      desc: 'Deploy live production apps, onboard early adopters, and pitch on stage to founders, angels, and venture scouts at the Delhi Grand Finale in January 2027.',
      icon: Rocket,
      statusLabel: 'Upcoming Finale',
      statusType: 'upcoming',
      accentColor: 'text-[#EC4899]',
      bgGradient: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      milestone: 'Delhi Demo Day 2027 · ₹1 Lakh+ Prize Pool & Angel Backing',
    },
  ];

  return (
    <section id="cohort" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-pink-600/10 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Context, and CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionKicker label="02 · INCUBATOR" className="mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-white tracking-tight leading-[1.08] mb-4">
              BUILDER{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#EC4899] bg-clip-text text-transparent">
                COHORT
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base font-sans leading-relaxed mb-6 max-w-lg">
              A high-intensity, 5-month cohort turning builders into venture product teams.
              From problem validation to live production deployment with real users.
            </p>

            {/* Active Cycle Badge with small green dot (unboxed) */}
            <div className="flex items-center gap-2 text-xs font-mono-label text-gray-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399] shrink-0" />
              <span>CYCLE 1 ACTIVE · 5 TEAMS SHIPPING</span>
            </div>

            {/* CTA Action Button */}
            <div>
              <Button to="/cohort" variant="primary" size="md" className="group">
                EXPLORE THE COHORT
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Stacked Cards Deck with Peeking Headings */}
          <div
            className="lg:col-span-7 flex flex-col relative"
            onMouseLeave={() => setActivePhase('02')} // Reset to the currently ongoing Phase 02 when mouse leaves
          >
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const isSelected = activePhase === phase.num;
              const isOngoing = phase.num === '02';

              return (
                <div
                  key={phase.num}
                  onClick={() => setActivePhase(phase.num)}
                  onMouseEnter={() => setActivePhase(phase.num)}
                  className={`group relative rounded-2xl cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    idx > 0 ? '-mt-3 sm:-mt-4' : ''
                  } ${
                    isOngoing && !isSelected
                      ? 'border border-[#2563EB]/50 bg-[#0E1626]/85 shadow-[0_0_20px_rgba(37,99,235,0.15)] z-20'
                      : isSelected
                      ? isOngoing
                        ? 'border-2 border-[#2563EB] bg-gradient-to-br from-[#0B132B]/95 via-[#070B14]/98 to-[#0E1626]/95 shadow-[0_12px_36px_rgba(37,99,235,0.28)] ring-1 ring-[#2563EB]/40 z-30'
                        : 'border border-white/25 bg-[#0E1626]/95 shadow-[0_12px_32px_rgba(0,0,0,0.5)] z-30'
                      : 'border border-white/10 bg-[#0A101E]/80 hover:border-white/20 z-10'
                  }`}
                  style={{
                    transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {/* Subtle Glowing Accent for Ongoing Phase */}
                  {isOngoing && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#2563EB]/25 via-[#EC4899]/15 to-transparent rounded-full blur-2xl pointer-events-none" />
                  )}

                  {/* Peeking Header Strip (Always visible for every card in the stack) */}
                  <div className="relative z-10 px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOngoing
                            ? 'bg-gradient-to-br from-[#2563EB] to-[#EC4899] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                            : isSelected
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/[0.04] text-gray-400 border border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Header Text & Phase Number */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-0.5 flex-wrap">
                          <span
                            className={`font-mono-label text-[11px] sm:text-xs tracking-wider font-bold ${
                              isOngoing ? 'text-pink-400' : 'text-[#60A5FA]'
                            }`}
                          >
                            PHASE · {phase.num}
                          </span>

                          <span className="text-gray-600 font-mono text-[10px]">·</span>

                          {/* Small Dot Status Indicator (No boxy blocks) */}
                          {isOngoing ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-label text-emerald-400 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399] shrink-0" />
                              CURRENTLY ONGOING
                            </span>
                          ) : phase.statusType === 'completed' ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-label text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0" />
                              VALIDATED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-label text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                              UPCOMING
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg lg:text-xl font-bold font-sans text-white tracking-tight">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right Meta or Expand Cue */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline-block text-xs font-mono-label text-gray-400">
                        {phase.tagline}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                          isSelected ? 'rotate-180 text-white' : 'opacity-60'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expandable Body Drawer */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 border-t border-white/5">
                        <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed mb-4 max-w-xl">
                          {phase.desc}
                        </p>

                        {/* Milestone Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-label pt-3 border-t border-white/5">
                          {phase.statusType === 'completed' && (
                            <div className="flex items-center gap-2 text-emerald-400">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>{phase.milestone}</span>
                            </div>
                          )}

                          {phase.statusType === 'active' && (
                            <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                              <div className="flex items-center gap-2 text-blue-300">
                                <Activity className="w-4 h-4 text-[#60A5FA] shrink-0" />
                                <span>{phase.milestone}</span>
                              </div>
                              <span className="text-pink-400 font-semibold flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5 text-pink-400" />
                                Sprint Velocity: 94%
                              </span>
                            </div>
                          )}

                          {phase.statusType === 'upcoming' && (
                            <div className="flex items-center gap-2 text-pink-300/90">
                              <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                              <span>{phase.milestone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
