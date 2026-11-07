import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImpulseField from './ImpulseField';

interface CTASectionProps {
  headline: string;
  description: string;
  buttonText: string;
  buttonTo: string;
  microcopy?: string;
}

export default function CTASection({ headline, description, buttonText, buttonTo, microcopy }: CTASectionProps) {
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden impulse-bg-gradient">
      <ImpulseField
        density="low"
        showParticles={true}
        showOrbital={true}
        centralImpulse={true}
        interactive={true}
        accentColor="mixed"
        className="opacity-60"
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono-label text-impulse-blue-bright/70 mb-8">
          <span className="w-2 h-2 rounded-full bg-impulse-blue animate-pulse-slow" />
          SIGNAL ACTIVE
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans text-impulse-white mb-6 leading-[1.05]">
          {headline}
        </h2>

        <p className="text-lg lg:text-xl text-impulse-gray-light/70 mb-10 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <Link
          to={buttonTo}
          className="group inline-flex items-center gap-3 font-mono-label text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue/60 transition-colors duration-300 px-9 py-4 energy-sweep"
        >
          {buttonText}
          <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {microcopy && (
          <p className="font-mono-label text-impulse-blue-bright/70 mt-8">
            {microcopy}
          </p>
        )}
      </div>
    </section>
  );
}
