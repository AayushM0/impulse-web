import { useReveal } from '@/hooks/useReveal';
import SectionLabel from '@/components/SectionLabel';

const stages = ['LEARN', 'EXPLORE', 'BUILD', 'EXPERIENCE'];

export default function WhyImpulse() {
  const { ref, isVisible } = useReveal();

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionLabel index="02" label="WHY" className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />

        <div className="mt-8 max-w-4xl">
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans text-impulse-white leading-[1.05] tracking-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Engineering is meant<br />
            to be <span className="text-gradient-impulse">experienced.</span>
          </h2>

          <p className={`mt-8 text-lg lg:text-xl text-impulse-gray-light/60 leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            We believe technology is best understood by exploring it, experimenting with it and building with it.
          </p>
        </div>

        {/* Visual transition: LEARN → EXPLORE → BUILD → EXPERIENCE */}
        <div className={`mt-20 lg:mt-32 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0">
            {stages.map((stage, i) => (
              <div key={stage} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 flex-1">
                <div className="flex-1 group">
                  <div className="relative border border-space-600 hover:border-impulse-blue/40 transition-colors duration-500 p-8 lg:p-12 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-impulse-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="font-mono-label text-impulse-blue-bright/40 block mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl lg:text-3xl font-sans text-impulse-white tracking-tight">
                      {stage}
                    </span>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className="flex items-center justify-center lg:px-6">
                    <div className="relative w-full lg:w-auto">
                      <div className="h-px w-full lg:w-16 bg-gradient-to-r from-impulse-blue/40 to-impulse-indigo/40" />
                      <div className="hidden lg:block absolute -right-1 -top-1 w-2 h-2 rounded-full bg-impulse-blue/60" />
                      <div className="lg:hidden absolute -bottom-1 right-0 w-2 h-2 rounded-full bg-impulse-blue/60" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
