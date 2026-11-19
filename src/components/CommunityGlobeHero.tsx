import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import GridMotion from '@/components/GridMotion';
import { SectionKicker } from '@/components/ui';
import { allCommunityMembers } from '@/data/communityMembers';
import './CommunityGlobeHero.css';

const memberPhotoItems = allCommunityMembers
  .filter((member) => Boolean(member.photoPath))
  .map((member) => ({
    src: member.photoPath,
    alt: member.name,
    position: member.photoPosition,
  }));

export default function CommunityGlobeHero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <header ref={heroRef} className="globe-hero community-intro" aria-labelledby="community-title">
      <div className="globe-hero-gridmotion" aria-hidden="true">
        <GridMotion
          items={memberPhotoItems}
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
          grayscale={false}
        />
        <div className="globe-hero-gridmotion-overlay" />
      </div>

      <div className="community-hero-copy">
        <div className="flex justify-center mb-4">
          <SectionKicker label="PEOPLE // BUILDERS // COLLABORATION" />
        </div>
        <h1 id="community-title">
          Community at <span>Impulse.</span>
        </h1>
        <p className="community-hero-description">
          A creative space where curious minds connect, innovative ideas grow, and passionate builders come together to create meaningful solutions. Different perspectives meet here around a shared desire to learn by doing.
        </p>
        <div className="community-hero-actions">
          <a className="community-hero-button-primary" href="#community-connect-title">
            Connect With Us <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="community-explore-link" href="#flashcards">
            Explore community <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>

      <a className="community-scroll-cue" href="#flashcards">
        <span className="community-scroll-line" aria-hidden="true" />
        Scroll to discover
        <ArrowDown aria-hidden="true" />
      </a>
    </header>
  );
}
