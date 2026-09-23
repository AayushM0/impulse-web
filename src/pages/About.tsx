import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';
import CTASection from '@/components/CTASection';
import { useReveal } from '@/hooks/useReveal';

const story = [
  {
    label: 'THE ORIGIN',
    title: 'Why Impulse was created.',
    body: 'Impulse was born from a simple observation: the most meaningful learning happens when you build, not when you just study. A group of students felt that the gap between curiosity and creation was too wide — and decided to close it.',
  },
  {
    label: 'THE BELIEF',
    title: 'Engineering is meant to be experienced.',
    body: 'We believe technology is best understood by exploring it, experimenting with it and building with it. Reading about AI is not the same as building with it. Watching a tutorial is not the same as shipping something real.',
  },
  {
    label: 'THE CULTURE',
    title: 'Curiosity becomes creation.',
    body: 'Impulse is built on a culture of curiosity, collaboration and creation. We celebrate shipping over perfection, experimentation over expertise, and community over competition. Everyone starts somewhere.',
  },
  {
    label: 'THE VISION',
    title: 'A growing ecosystem of ambitious builders.',
    body: 'Impulse is starting in a university environment, but the vision is bigger. We see a community that can expand across universities, cities and eventually globally — connecting builders, researchers, founders and opportunities everywhere.',
  },
];

export default function About() {
  return (
    <div className="bg-space-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden impulse-bg-gradient pt-20">
        <ImpulseField
          density="medium"
          showParticles={true}
          showOrbital={true}
          centralImpulse={true}
          interactive={true}
          accentColor="mixed"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-space-950 via-space-950/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full pb-16">
          <div className="flex items-center gap-3 font-mono-label text-impulse-blue-bright/70 mb-6">
            <span className="text-impulse-blue-bright/50">ABOUT</span>
            <span className="w-8 h-px bg-impulse-blue/30" />
            <span>IMPULSE</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-sans font-bold tracking-tight leading-[0.9] text-impulse-white max-w-4xl">
            IDEAS<br />
            <span className="text-gradient-impulse">IN MOTION.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-impulse-gray-light/80 max-w-xl leading-relaxed">
            An AI Builder Community where curiosity becomes creation.
          </p>
        </div>
      </section>

      {/* Story sections */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-6 space-y-32 lg:space-y-48">
          {story.map((s, i) => (
            <AboutBlock key={s.label} {...s} index={i} />
          ))}
        </div>
      </section>

      <CTASection
        headline="Every movement has a beginning."
        description="Impulse is starting with a small group of people who want to help shape what comes next."
        buttonText="JOIN THE FOUNDING CIRCLE"
        buttonTo="/join"
        microcopy="CHAPTER ONE STARTS HERE."
      />

      <Footer />
    </div>
  );
}

function AboutBlock({ label, title, body, index }: { label: string; title: string; body: string; index: number }) {
  const { ref, isVisible } = useReveal();

  return (
    <div ref={ref} className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-impulse-blue/60 hidden lg:block" aria-hidden="true" />
      <div className="absolute -left-4 top-0 w-px h-full bg-gradient-to-b from-impulse-blue/20 to-transparent hidden lg:block" aria-hidden="true" />

      <div className={`lg:pl-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="font-mono-label text-impulse-blue-bright/60 mb-4">
          {String(index + 1).padStart(2, '0')} / {label}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-sans text-impulse-white leading-[1.05] tracking-tight mb-8">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-impulse-gray-light/60 leading-relaxed max-w-2xl">
          {body}
        </p>
      </div>
    </div>
  );
}
