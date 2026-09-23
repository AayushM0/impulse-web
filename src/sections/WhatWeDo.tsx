import { useReveal } from '@/hooks/useReveal';
import SectionLabel from '@/components/SectionLabel';

const elements = [
  {
    num: '01',
    title: 'EXPLORE',
    description: 'Emerging technology, ideas and possibilities.',
  },
  {
    num: '02',
    title: 'BUILD',
    description: 'Real products, prototypes and experiments.',
  },
  {
    num: '03',
    title: 'COLLABORATE',
    description: 'Peers, mentors, researchers, founders and communities.',
  },
  {
    num: '04',
    title: 'SHOWCASE',
    description: 'Take what you create beyond the classroom.',
  },
];

export default function WhatWeDo() {
  const { ref, isVisible } = useReveal();

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionLabel index="03" label="IN MOTION" className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />

        <h2 className={`mt-8 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans text-impulse-white leading-[1.05] tracking-tight max-w-4xl transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          From curiosity<br />
          to <span className="text-gradient-impulse">creation.</span>
        </h2>

        {/* Network-connected elements */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-space-700/30">
          {elements.map((el, i) => (
            <div
              key={el.title}
              className={`relative bg-space-950 p-8 lg:p-10 group transition-all duration-1000 hover:bg-space-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {/* Top connecting line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-impulse-blue/20 to-transparent opacity-0 group-hover:via-impulse-blue/60 transition-all duration-500" />

              {/* Node indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-impulse-blue/40 group-hover:bg-impulse-blue transition-colors duration-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-impulse-blue/40 group-hover:animate-ping opacity-0 group-hover:opacity-100" />
                </div>
                <span className="font-mono-label text-impulse-blue-bright/40">{el.num}</span>
              </div>

              <h3 className="text-xl lg:text-2xl font-sans font-medium text-impulse-white mb-3 tracking-tight">
                {el.title}
              </h3>
              <p className="text-sm text-impulse-gray-light/60 leading-relaxed">
                {el.description}
              </p>

              {/* Bottom connecting line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-impulse-indigo/10 to-impulse-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Connecting network lines (decorative) */}
        <div className="hidden lg:block relative mt-0 h-0">
          <svg className="absolute -top-20 left-0 w-full h-20 pointer-events-none" aria-hidden="true">
            <line x1="12.5%" y1="0" x2="37.5%" y2="80" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
            <line x1="37.5%" y1="0" x2="62.5%" y2="80" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
            <line x1="62.5%" y1="0" x2="87.5%" y2="80" stroke="rgba(236,72,153,0.1)" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
