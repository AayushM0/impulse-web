import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ImpulseField from '@/components/ImpulseField';
import TiltCard3D from '@/components/3d/TiltCard3D';
import { teamMembers } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  { label: 'SYSTEMS ARCHITECTS', x: '16%', y: '25%' },
  { label: 'AI RESEARCHERS', x: '78%', y: '20%' },
  { label: 'CREATIVE TECHNOLOGISTS', x: '48%', y: '45%' },
  { label: 'HARDWARE HACKERS', x: '22%', y: '75%' },
  { label: 'FOUNDERS & FELLOWS', x: '82%', y: '68%' },
  { label: 'OPEN SOURCE BUILDERS', x: '52%', y: '84%' },
];

export default function Community() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.team-card');
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-28 lg:py-36 bg-space-950 border-t border-space-800/80 overflow-hidden"
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 font-mono-label text-[11px] text-impulse-blue-bright/70 border border-space-700/80 bg-space-900/60 backdrop-blur-md px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-impulse-blue" />
            <span>COLLECTIVE // PEOPLE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-impulse-white tracking-tight leading-tight max-w-4xl">
            Find people who build like you <span className="text-impulse-blue-bright">think.</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-impulse-gray-light/70 max-w-xl">
            A collective of creators, engineers, and researchers exploring the frontiers of artificial intelligence together.
          </p>
        </div>

        {/* 3D Constellation Field */}
        <div className="relative h-[340px] lg:h-[400px] border border-space-800/80 overflow-hidden mb-16">
          <ImpulseField
            density="medium"
            showParticles={true}
            showOrbital={true}
            centralImpulse={true}
            interactive={true}
            accentColor="blue"
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-space-950/80 pointer-events-none" aria-hidden="true" />

          {/* Floating Role Nodes */}
          {roles.map((role) => (
            <div
              key={role.label}
              className="absolute font-mono-label text-[11px] text-impulse-blue-bright/80"
              style={{
                left: role.x,
                top: role.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-space-950/85 backdrop-blur-md border border-space-700/80 hover:border-impulse-blue/50 rounded-full transition-colors duration-200 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-impulse-blue animate-pulse" />
                <span>{role.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Founding Circle Team Showcase */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono-label text-xs text-impulse-blue-bright/70">
              FOUNDING CIRCLE // LEADERSHIP
            </h3>
            <span className="font-mono-label text-xs text-impulse-gray-light/70">
              CHAPTER ONE
            </span>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-card">
                <TiltCard3D maxTilt={8} className="h-full">
                  <div className="h-full relative p-6 bg-space-900/95 border border-space-800 hover:border-impulse-blue/40 transition-colors duration-300 flex flex-col justify-between">
                    <div>
                      {/* Avatar & Tag Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-full bg-space-800 border border-space-700 flex items-center justify-center font-bold text-impulse-white font-sans text-sm">
                          {member.avatar}
                        </div>
                        <span className="font-mono-label text-[10px] text-impulse-blue-bright/70">
                          {member.tag}
                        </span>
                      </div>

                      <h4 className="text-xl font-sans font-semibold text-impulse-white tracking-tight mb-1">
                        {member.name}
                      </h4>
                      <p className="font-mono-label text-xs text-impulse-blue-bright mb-3">
                        {member.role}
                      </p>
                      <p className="text-xs text-impulse-gray-light/70 leading-relaxed">
                        {member.focus}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-space-800 text-[11px] font-mono-label text-impulse-gray-light/70">
                      {member.discipline}
                    </div>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
