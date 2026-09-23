import { useReveal } from '@/hooks/useReveal';
import ImpulseField from '@/components/ImpulseField';

const connections = [
  'Universities',
  'AI Communities',
  'Founders',
  'Researchers',
  'Companies',
  'Open-Source Communities',
  'Hackathons',
  'Global Opportunities',
];

export default function Ecosystem() {
  const { ref, isVisible } = useReveal();

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div>
            <h2 className={`text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans text-impulse-white leading-[1.05] tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Built to go<br />
              <span className="text-gradient-impulse">beyond.</span>
            </h2>

            <p className={`mt-8 text-lg lg:text-xl text-impulse-gray-light/60 leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Impulse is designed to connect people with a wider ecosystem of builders, researchers, companies and communities — locally and globally.
            </p>

            <div className={`mt-12 space-y-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {connections.map((conn, i) => (
                <div
                  key={conn}
                  className={`flex items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${300 + i * 60}ms` }}
                >
                  <div className="w-8 h-px bg-impulse-blue/30" />
                  <span className="text-sm lg:text-base text-impulse-gray-light/70 tracking-wide">
                    {conn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: large network visualization */}
          <div className={`relative h-[400px] lg:h-[560px] border border-space-700/50 overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <ImpulseField
              density="high"
              showParticles={true}
              showOrbital={true}
              centralImpulse={true}
              interactive={true}
              accentColor="blue"
              className="opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-950/60 to-transparent" aria-hidden="true" />

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="font-mono-label text-impulse-blue-bright/40">IMPULSE</p>
                <p className="font-mono-label text-[10px] text-impulse-blue-bright/30 mt-1">ECOSYSTEM NODE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
