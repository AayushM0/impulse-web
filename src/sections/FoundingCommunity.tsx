import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReveal } from '@/hooks/useReveal';
import ImpulseField from '@/components/ImpulseField';

export default function FoundingCommunity() {
  const { ref, isVisible } = useReveal();

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden bg-space-950">
      <ImpulseField
        density="low"
        showParticles={true}
        showOrbital={false}
        centralImpulse={true}
        interactive={true}
        accentColor="magenta"
        className="opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-space-950 via-transparent to-space-950" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className={`font-mono-label text-impulse-blue-bright/50 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          FOUNDING / CHAPTER ONE
        </div>

        <h2 className={`text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans text-impulse-white leading-[1.05] tracking-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Every movement has<br />
          a <span className="text-gradient-impulse">beginning.</span>
        </h2>

        <p className={`mt-8 text-lg lg:text-xl text-impulse-gray-light/70 leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Impulse is starting with a small group of people who want to help shape what comes next.
        </p>

        <Link
          to="/join"
          className={`group mt-12 inline-flex items-center gap-3 font-mono-label text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue/60 transition-all duration-300 px-9 py-4 energy-sweep ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '300ms' }}
        >
          JOIN THE FOUNDING CIRCLE
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <p className={`font-mono-label text-impulse-blue-bright/30 mt-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          NOT ELITIST. INTENTIONAL.
        </p>
      </div>
    </section>
  );
}
