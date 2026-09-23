import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';
import CTASection from '@/components/CTASection';
import { useReveal } from '@/hooks/useReveal';

const sections = [
  {
    label: 'WHO WE ARE',
    title: 'A community of curious builders.',
    body: 'Impulse is a group of people who believe AI and technology are best understood by creating with them. We come from different backgrounds — engineering, design, research, product — but share one instinct: the desire to build.',
  },
  {
    label: 'WHAT WE BUILD',
    title: 'Real things, not just assignments.',
    body: 'We build products, prototypes, tools, experiments and research projects. We build things that might fail. We build things that might become something bigger. The point is to build — and to build with others.',
  },
  {
    label: 'HOW WE WORK',
    title: 'Collaboration over competition.',
    body: 'We share what we learn. We help each other debug, design, research and ship. We run hackathons, build sprints, AI labs and demo nights — not to compete, but to create together and learn from each other.',
  },
  {
    label: 'WHAT MEMBERS EXPERIENCE',
    title: 'Access to a builder ecosystem.',
    body: 'Members get hands-on experience with emerging AI tools, mentorship from people who build, a platform to showcase their work, and a network of peers and collaborators who are just as curious and ambitious as they are.',
  },
  {
    label: 'BUILDER CULTURE',
    title: 'Curiosity becomes creation.',
    body: 'We celebrate shipping over perfection. We value experimentation over expertise. We believe everyone starts somewhere, and the best way to learn is to build something real and put it into the world.',
  },
];

export default function Community() {
  return (
    <div className="bg-space-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden impulse-bg-gradient pt-20">
        <ImpulseField
          density="medium"
          showParticles={true}
          showOrbital={true}
          centralImpulse={true}
          interactive={true}
          accentColor="mixed"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/50 to-transparent" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full pb-16">
          <div className="flex items-center gap-3 font-mono-label text-impulse-blue-bright/70 mb-6">
            <span className="text-impulse-blue-bright/50">COMMUNITY</span>
            <span className="w-8 h-px bg-impulse-blue/30" />
            <span>PEOPLE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold tracking-tight leading-[0.95] text-impulse-white max-w-3xl">
            Find people who<br />
            build like you <span className="text-gradient-impulse">think.</span>
          </h1>
        </div>
      </section>

      {/* Sections */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-6 space-y-24 lg:space-y-32">
          {sections.map((sec, i) => (
            <CommunityBlock key={sec.label} index={i} {...sec} />
          ))}
        </div>
      </section>

      <CTASection
        headline="Join the community."
        description="Find your people. Build something real. Be part of what comes next."
        buttonText="JOIN THE COMMUNITY"
        buttonTo="/join"
      />

      <Footer />
    </div>
  );
}

function CommunityBlock({ label, title, body, index }: { label: string; title: string; body: string; index: number }) {
  const { ref, isVisible } = useReveal();

  return (
    <div ref={ref} className="relative">
      <div className="absolute -left-4 top-0 w-px h-full bg-gradient-to-b from-impulse-blue/20 via-impulse-indigo/10 to-transparent hidden lg:block" aria-hidden="true" />

      <div className={`lg:pl-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="font-mono-label text-impulse-blue-bright/60 mb-4">
          {String(index + 1).padStart(2, '0')} / {label}
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans text-impulse-white leading-[1.1] tracking-tight mb-6">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-impulse-gray-light/60 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
