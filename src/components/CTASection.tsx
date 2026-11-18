import { ArrowRight } from 'lucide-react';
import ImpulseField from './ImpulseField';
import { Button, SectionKicker } from '@/components/ui';

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
        <div className="flex justify-center mb-8">
          <SectionKicker label="SIGNAL ACTIVE" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans text-impulse-white mb-6 leading-[1.05]">
          {headline}
        </h2>

        <p className="text-lg lg:text-xl text-impulse-gray-light/70 mb-10 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <Button
          to={buttonTo}
          variant="primary"
          size="lg"
          className="group shadow-[0_4px_24px_rgba(37,99,235,0.4)]"
        >
          {buttonText}
          <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>

        {microcopy && (
          <p className="font-mono-label text-impulse-blue-bright/70 mt-8">
            {microcopy}
          </p>
        )}
      </div>
    </section>
  );
}
