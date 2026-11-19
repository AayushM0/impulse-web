import { useMemo, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
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
    <header ref={heroRef} className="globe-hero community-intro" aria-labelledby="community-title">
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
          Where curious minds connect, innovate, and build together.
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
