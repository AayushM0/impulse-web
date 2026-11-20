import { ArrowRight, CheckCircle2, Rocket, Code2, Users } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreCohort() {
  const phases = [
    {
      num: '01',
      title: 'Problem & Validation',
      desc: 'Form teams, interview real users, and stress-test assumptions before writing a line of code.',
      icon: Users,
    },
    {
      num: '02',
      title: 'Sprint & Build',
      desc: 'Rapid weekly MVP iterations with architecture guidance, security audits, and code reviews.',
      icon: Code2,
    },
    {
      num: '03',
      title: 'Launch & Demo Day',
      desc: 'Deploy live production apps, acquire real users, and pitch to founders and venture scouts.',
      icon: Rocket,
    },
  ];

  return (
    <section id="cohort" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionKicker label="02 // INCUBATOR" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight">
              BUILDER COHORT
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base font-sans leading-relaxed">
            A high-intensity, 5-month cohort turning builders into product teams from problem validation to live production deployment.
          </p>
        </div>

        {/* 3 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.num}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1626]/60 to-[#070B14]/80 p-8 flex flex-col justify-between hover:border-impulse-blue/40 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-label text-xs tracking-wider text-impulse-blue-bright/80 font-bold">
                      PHASE // {phase.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-impulse-blue/10 border border-impulse-blue/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-white mb-3">
                    {phase.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-sans">
                    {phase.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono-label text-emerald-400/90">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Milestone Gated</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="rounded-2xl border border-white/10 bg-space-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-bold font-sans text-white mb-1">
              Want to build in Chapter One?
            </div>
            <div className="text-sm text-gray-400 font-sans">
              Learn about our track structure, mentors, and alumni products.
            </div>
          </div>

          <Button to="/cohort" variant="primary" size="md" className="group shrink-0">
            EXPLORE THE COHORT
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
