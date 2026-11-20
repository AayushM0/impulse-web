import { ArrowRight, MessageSquare, Terminal, Sparkles, Globe } from 'lucide-react';
import { Button, SectionKicker } from '@/components/ui';

export default function ExploreCommunity() {
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

  return (
    <section id="community" className="relative py-16 md:py-24 px-6 lg:px-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionKicker label="03 // ECOSYSTEM" className="mb-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight">
              BUILDER COMMUNITY
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base font-sans leading-relaxed">
            A collective of creators who do not just talk about ideas: we build, test, and ship them.
          </p>
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
