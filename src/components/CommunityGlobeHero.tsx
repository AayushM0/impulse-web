import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import GridMotion, { type GridMotionItem } from '@/components/GridMotion';
import { SectionKicker } from '@/components/ui';
import { allCommunityMembers, communityPresidents } from '@/data/communityMembers';
import './CommunityGlobeHero.css';

const founderItems: GridMotionItem[] = communityPresidents
  .filter((member) => Boolean(member.photoPath))
  .map((member) => ({
    src: member.photoPath,
    alt: member.name,
    position: member.photoPosition,
  }));

const otherMemberItems: GridMotionItem[] = allCommunityMembers
  .filter(
    (member) =>
      !communityPresidents.some((president) => president.id === member.id) &&
      Boolean(member.photoPath),
  )
  .map((member) => ({
    src: member.photoPath,
    alt: member.name,
    position: member.photoPosition,
  }));

export default function CommunityGlobeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    const heroLayer = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;
    let lastPast = false;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = Math.max(window.innerHeight * 0.65, 400);
        const progress = Math.min(1, Math.max(0, y / maxScroll));
        if (el) {
          el.style.transform = `translate3d(0, ${-progress * 70}px, 0)`;
          el.style.opacity = `${Math.max(0, 1 - progress * 1.15)}`;
        }

        const past = y > maxScroll * 1.05;
        if (past !== lastPast) {
          lastPast = past;
          setIsScrolledPast(past);
        }

        if (heroLayer) {
          if (past) {
            heroLayer.style.visibility = 'hidden';
            heroLayer.style.pointerEvents = 'none';
          } else {
            heroLayer.style.visibility = 'visible';
            heroLayer.style.pointerEvents = 'auto';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const memberRows: GridMotionItem[][] = useMemo(() => {
    const topRow = otherMemberItems.slice(0, 8);
    const centerRow = [
      founderItems[0],
      otherMemberItems[8],
      otherMemberItems[9],
      founderItems[1],
      otherMemberItems[10],
      otherMemberItems[11],
    ].filter(Boolean);
    const lowerRow = otherMemberItems.slice(12, 20);
    const bottomRow = otherMemberItems.slice(20);

    return [topRow, centerRow, lowerRow, bottomRow];
  }, []);

  return (
    <header ref={heroRef} className="globe-hero community-intro h-full" aria-labelledby="community-title">
      <div className="globe-hero-gridmotion" aria-hidden="true">
        <GridMotion
          rowItems={memberRows}
          rows={4}
          aspectRatio={1.33}
          gap={16}
          radius={14}
          angle={-12}
          tilt={0}
          speed={24}
          direction="alternate"
          parallax={0.5}
          spotlight={0.6}
          dim={0.35}
          fade={0.5}
          paused={isScrolledPast}
          grayscale={false}
        />
        <div className="globe-hero-gridmotion-overlay" />
      </div>

      <div ref={contentRef} className="community-hero-copy will-change-transform">
        <div className="flex justify-center mb-4 hero-stagger-1">
          <SectionKicker label="PEOPLE · BUILDERS · COLLABORATION" />
        </div>
        <h1 id="community-title" className="hero-stagger-2">
          Community at <span className="animate-gradient-flow">Impulse.</span>
        </h1>
        <p className="community-hero-description hero-stagger-3">
          Where curious minds connect, innovate, and build together.
        </p>
        <div className="community-hero-actions hero-stagger-4">
          <a className="community-hero-button-primary group transition-all duration-300 hover:shadow-[0_0_24px_rgba(96,165,250,0.3)] hover:-translate-y-0.5" href="#community-connect-title">
            Connect With Us <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
