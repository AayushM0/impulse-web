import { ArrowRight, CheckCircle2, Code2, Rocket, Users, Sparkles } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreCohort() {
  const phases = [
    {
      num: '01',
      title: 'Problem & Validation',
      desc: 'Form teams, interview real users, and stress-test assumptions before writing a line of code.',
      icon: Users,
      status: 'Validated',
      statusType: 'completed',
      dateNote: 'October',
      isCurrent: false,
    },
    {
      num: '02',
      title: 'Sprint & Build',
      desc: 'Rapid weekly MVP iterations with architecture guidance, security audits, and code reviews. Teams ship functional V1s with live telemetry.',
      icon: Code2,
      status: 'Currently Ongoing',
      statusType: 'active',
      dateNote: 'December · Month 2 of 5',
      isCurrent: true,
    },
    {
      num: '03',
      title: 'Launch & Demo Day',
      desc: 'Deploy live production apps, acquire real users, and pitch to venture scouts and founders at the Delhi Grand Finale.',
      icon: Rocket,
      status: 'Upcoming',
      statusType: 'upcoming',
      dateNote: 'February 2027',
      isCurrent: false,
    },
  ];

  return (
    <section id="cohort" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      {/* Background subtle glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-pink-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Context, and CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionKicker label="02 // INCUBATOR" className="mb-4" />
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

            {/* Active Cycle Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-label text-xs tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              CYCLE 1 ACTIVE · 5 TEAMS SHIPPING
            </div>

            {/* CTA Action Button */}
            <div>
              <Button to="/cohort" variant="primary" size="md" className="group">
                EXPLORE THE COHORT
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: 3 Phases with Phase 02 Highlighted */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.num}
                  className={`relative rounded-2xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between ${
                    phase.isCurrent
                      ? 'border-2 border-[#2563EB]/70 bg-gradient-to-br from-[#0B132B]/95 via-[#070B14]/98 to-[#0E1626]/95 shadow-[0_0_30px_rgba(37,99,235,0.25)] ring-1 ring-[#2563EB]/40'
                      : 'border border-white/10 bg-gradient-to-b from-[#0E1626]/60 to-[#070B14]/80 hover:border-white/20'
                  }`}
                >
                  {/* Glowing accent for active card */}
                  {phase.isCurrent && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#2563EB]/20 via-[#EC4899]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`font-mono-label text-xs tracking-wider font-bold ${
                          phase.isCurrent ? 'text-pink-400' : 'text-[#60A5FA]'
                        }`}>
                          PHASE // {phase.num}
                        </span>

                        {phase.isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-label bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            CURRENTLY ONGOING
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono-label text-gray-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                            {phase.dateNote}
                          </span>
                        )}
                      </div>

                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        phase.isCurrent
                          ? 'bg-gradient-to-br from-[#2563EB] to-[#EC4899] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                          : 'bg-white/[0.04] border border-white/10 text-gray-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className={`text-lg sm:text-xl font-bold font-sans mb-2 ${
                      phase.isCurrent ? 'text-white' : 'text-gray-100'
                    }`}>
                      {phase.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed font-sans">
                      {phase.desc}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-label">
                    {phase.statusType === 'completed' && (
                      <span className="flex items-center gap-1.5 text-emerald-400/90">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Milestone Validated</span>
                      </span>
                    )}

                    {phase.statusType === 'active' && (
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-1.5 text-blue-300">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          <span>Active Sprint: Day 42 / 150</span>
                        </span>
                        <span className="text-pink-400 font-semibold">94% Velocity</span>
                      </div>
                    )}

                    {phase.statusType === 'upcoming' && (
                      <span className="flex items-center gap-1.5 text-pink-400/90">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Milestone Gated</span>
                      </span>
                    )}
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
