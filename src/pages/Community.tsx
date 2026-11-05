import { type ElementType, type ReactNode, useState } from 'react';
import { Crown, Network, UserRound, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunityGlobeHero from '@/components/CommunityGlobeHero';
import ConnectWithUs from '@/components/ConnectWithUs';
import { useReveal } from '@/hooks/useReveal';
import {
  communityPresidents,
  communityTeams,
  type CommunityMember,
  type CommunityTeam,
} from '@/data/communityMembers';
import './Community.css';

const communityValues = [
  {
    number: '01',
    heading: 'Who We Are',
    statement: 'A community of curious builders.',
    supporting: 'Impulse brings together people who are curious, creative and interested in making things together. Different perspectives meet here around a shared desire to learn by doing.',
    accent: 'blue',
  },
  {
    number: '02',
    heading: 'What We Build',
    statement: 'Real things, not just assignments.',
    supporting: 'We make meaningful projects, experiment with ideas and turn early concepts into working solutions. Every build is a chance to test what could be possible.',
    accent: 'pink',
  },
  {
    number: '03',
    heading: 'How We Work',
    statement: 'Collaboration over competition.',
    supporting: 'Members learn from one another, collaborate across teams and grow together. We share our process and help each other move ideas forward.',
    accent: 'blue',
  },
  {
    number: '04',
    heading: 'What Members Experience',
    statement: 'Learn, experiment and build together.',
    supporting: 'Take ownership, try new approaches and work with others to turn ideas into projects. Members learn by contributing to work that keeps moving.',
    accent: 'pink',
  },
  {
    number: '05',
    heading: 'Builder Culture',
    statement: 'Curiosity, experimentation and creation.',
    supporting: 'We make room to create, fail, learn and build again. Curiosity starts the process; sharing what we discover helps everyone get better.',
    accent: 'blue',
  },
];

const revealOpts = {
  threshold: 0.12,
  rootMargin: '0px 0px -18% 0px',
  once: false,
} as const;

function CommunityReveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  id,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
  children: ReactNode;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>(revealOpts);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`community-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

function SplitLine({
  text,
  className,
  as: Tag = 'p',
  delay = 28,
}: {
  text: string;
  className: string;
  as?: ElementType;
  delay?: number;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>(revealOpts);
  return (
    <Tag ref={ref} className={`${className} community-split-line ${isVisible ? 'is-visible' : ''}`}>
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="community-split-char"
          style={{ transitionDelay: isVisible ? `${index * delay}ms` : '0ms' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}

export default function Community() {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const activeTeam = communityTeams[activeTeamIndex] || communityTeams[0];

  return (
    <div className="community-page min-h-screen bg-[#06070B] text-[#F5F7FF]">
      <Navbar />

      <main>
        <CommunityGlobeHero />

        <section id="flashcards" className="relative px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:px-10 scroll-mt-20">
          <span id="who-we-are" className="sr-only" />
          <div className="community-section-shell mx-auto max-w-[1240px]">
            <div className="community-section-intro mb-12 flex items-end justify-between gap-8 sm:mb-16">
              <div>
                <SplitLine as="p" text="WHAT BRINGS US TOGETHER" className="mb-4 font-mono-label text-[10px] text-[#93C5FD] sm:text-xs" delay={18} />
                <CommunityReveal as="h2" delay={80} className="max-w-2xl text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                  A place to <span className="community-gradient-text">make things matter.</span>
                </CommunityReveal>
              </div>
            </div>

            <div className="community-values-grid">
              {communityValues.map((value, idx) => <ValueCard key={value.number} {...value} index={idx} />)}
            </div>
          </div>
        </section>

        <section id="organization" className="community-people-section px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 scroll-mt-20" aria-labelledby="people-title">
          <span id="people" className="sr-only" />
          <div className="mx-auto max-w-[1240px]">
            <div className="community-roster-heading">
              <div>
                <SplitLine as="p" text="IMPULSE COMMUNITY · ORGANIZATION" className="mb-4 font-mono-label text-[10px] text-[#93C5FD] sm:text-xs" delay={16} />
                <CommunityReveal as="h2" id="people-title" delay={80} className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                  The people <span className="community-gradient-text">behind the work.</span>
                </CommunityReveal>
              </div>
            </div>

            <div className="community-org-chart">
              {/* Level 01: Presidents */}
              <CommunityReveal className="community-org-level-label"><h3>Presidents</h3><small>Community leadership</small></CommunityReveal>
              <div className="community-president-row">
                {communityPresidents.map((member, idx) => (
                  <MemberCard key={member.id} member={member} variant="president" index={idx} />
                ))}
              </div>

              <div className="community-org-connector" aria-hidden="true"><span /></div>

              {/* Team Leadership & Coordinators */}
              <CommunityReveal className="community-org-level-label community-team-level-label">
                <h3>Team leadership &amp; coordinators</h3>
                <small>Select a department below to view its heads and coordinators</small>
              </CommunityReveal>

              {/* Department Tabs */}
              <div className="community-team-tabs-container">
                <div className="community-team-tabs" role="tablist" aria-label="Department switcher">
                  {communityTeams.map((team, idx) => {
                    const isActive = activeTeamIndex === idx;
                    return (
                      <button
                        key={team.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`community-team-tab ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveTeamIndex(idx)}
                      >
                        <span className="community-team-tab-name">{team.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Team Showcase: One department at a time */}
              <div className="community-team-showcase" key={activeTeam.id}>
                <TeamNode team={activeTeam} />
              </div>

            </div>
          </div>
        </section>

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}

function TeamNode({ team }: { team: CommunityTeam }) {
  return (
    <section className="community-team-node" aria-labelledby={`${team.id}-title`}>
      <CommunityReveal className="community-team-node-heading">
        <div className="community-team-node-heading-left">
          <h4 id={`${team.id}-title`}>{team.name}</h4>
        </div>
      </CommunityReveal>

      <CommunityReveal className="community-member-level-label" delay={40}><Users size={14} aria-hidden="true" /> HEADS</CommunityReveal>
      <div className="community-head-grid">
        {team.heads.map((member, idx) => (
          <MemberCard key={member.id} member={member} variant="head" index={idx} />
        ))}
      </div>

      <div className="community-team-branch" aria-hidden="true" />

      <CommunityReveal className="community-member-level-label" delay={40}><UserRound size={14} aria-hidden="true" /> COORDINATORS</CommunityReveal>
      <div className="community-committee-grid">
        {team.committeeMembers.map((member, idx) => (
          <MemberCard key={member.id} member={member} variant="committee" index={idx} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({
  member,
  variant = 'committee',
  index = 0,
}: {
  member: CommunityMember;
  variant?: 'president' | 'head' | 'committee';
  index?: number;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(revealOpts);
  const [isFlipped, setIsFlipped] = useState(false);
  const initials = member.avatarInitial || (member.name ? member.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('') : '?');
  const displayName = member.name || 'Name to be added';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${(index % 6) * 65}ms` : '0ms' }}
      className={`community-member-card community-member-${variant} ${isVisible ? 'is-visible' : ''} ${isFlipped ? 'is-flipped' : ''}`}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(false);
      }}
      onClick={() => {
        if (window.matchMedia('(hover: none)').matches) setIsFlipped((flipped) => !flipped);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsFlipped((flipped) => !flipped);
        }
      }}
      role="region"
      tabIndex={0}
      aria-label={`${displayName} card. Hover to view details.`}
    >
      <div className="community-member-card-inner">
        {/* Front of card */}
        <div className="community-member-face community-member-front">
          <div className="community-member-photo">
            {member.photoPath ? (
              <img
                src={member.photoPath}
                alt={`${displayName} profile`}
                loading="lazy"
                style={{
                  objectPosition: member.photoPosition || '50% 50%',
                  transform: `scale(${member.photoZoom || 1})`,
                  transformOrigin: member.photoTransformOrigin || '50% 50%',
                }}
              />
            ) : (
              <span className="community-photo-initials">{initials}</span>
            )}
            {!member.photoPath && <span className="community-photo-placeholder">PHOTO NEEDED</span>}
          </div>

          <div className="community-member-copy">
            <span className="community-member-name">{displayName}</span>
            {variant !== 'president' && member.designation !== 'President' && member.oneLiner?.trim() && (
              <span className="community-member-one-liner">{member.oneLiner.trim()}</span>
            )}
          </div>

          <span className="community-member-open">TAP FOR DETAILS ↻</span>
          <span className="community-member-role-mark" aria-hidden="true">
            {variant === 'president' ? <Crown /> : variant === 'head' ? <Users /> : <Network />}
          </span>
        </div>

        {/* Back of card - reveals on hover */}
        <div className="community-member-face community-member-back">
          <div className="community-member-back-header">
            <span className="community-member-back-name" title={displayName}>{displayName}</span>
            <span className="community-member-back-badge">DETAILS</span>
          </div>

          <div className="community-member-back-body">
            <div className="community-member-back-field">
              <span className="community-field-label">TEAM</span>
              <span className="community-field-val">{member.team}</span>
            </div>
            <div className="community-member-back-field">
              <span className="community-field-label">ROLE</span>
              <span className="community-field-val">{member.designation}</span>
            </div>
            {member.skills && member.skills.length > 0 && (
              <div className="community-member-back-field">
                <span className="community-field-label">SKILLS</span>
                <span className="community-field-val">{member.skills.join(', ')}</span>
              </div>
            )}
            {member.linkedinUrl && (
              <div className="community-member-back-field">
                <span className="community-field-label">LINKEDIN</span>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="community-field-link"
                >
                  View Profile ↗
                </a>
              </div>
            )}
            {member.githubUrl && (
              <div className="community-member-back-field">
                <span className="community-field-label">GITHUB</span>
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="community-field-link"
                >
                  View Profile ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({
  number,
  heading,
  statement,
  supporting,
  accent,
  index = 0,
}: (typeof communityValues)[number] & { index?: number }) {
  const { ref, isVisible } = useReveal<HTMLElement>(revealOpts);
  return (
    <article
      ref={ref}
      style={{ transitionDelay: isVisible ? `${(index % 3) * 110}ms` : '0ms' }}
      className={`community-value-card community-card-${accent} ${number === '02' ? 'community-build-card' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="community-value-card-top mb-6 flex items-center justify-end">
        <CardArtwork number={number} />
      </div>
      <p className="mb-3 font-mono-label text-[9px] text-[#A2AABC] sm:text-[10px]">{heading}</p>
      <h3 className="mb-4 text-2xl font-medium leading-[1.16] tracking-[-0.035em] text-[#F5F7FF] sm:text-[1.7rem]">{statement}</h3>
      <p className="text-sm leading-7 text-[#A2AABC]">{supporting}</p>
    </article>
  );
}

function CardArtwork({ number }: { number: string }) {
  if (number === '02') {
    return (
      <div className="community-card-art community-build-path" aria-hidden="true">
        <span className="community-build-node">IDEA</span>
        <span className="community-build-line"><i /></span>
        <span className="community-build-node">MAKE</span>
        <span className="community-build-line"><i /></span>
        <span className="community-build-node">BUILD</span>
      </div>
    );
  }

  if (number === '01') {
    return (
      <svg className="community-card-art community-art-people" viewBox="0 0 96 54" fill="none" aria-hidden="true">
        <path className="community-art-line" d="M10 39 30 13l25 29 29-30" />
        <path className="community-art-line community-art-line-faint" d="m10 39 45 3 29-30" />
        <circle cx="10" cy="39" r="3" /><circle cx="30" cy="13" r="3" /><circle cx="55" cy="42" r="3" /><circle cx="84" cy="12" r="3" />
      </svg>
    );
  }

  if (number === '03') {
    return (
      <svg className="community-card-art community-art-collab" viewBox="0 0 96 54" fill="none" aria-hidden="true">
        <path className="community-art-line" d="M13 27h70M28 27l20-16 20 16-20 16-20-16Z" />
        <circle cx="13" cy="27" r="4" /><circle className="community-art-center" cx="48" cy="11" r="4" /><circle cx="83" cy="27" r="4" /><circle cx="48" cy="43" r="4" />
      </svg>
    );
  }

  if (number === '04') {
    return (
      <svg className="community-card-art community-art-growth" viewBox="0 0 96 54" fill="none" aria-hidden="true">
        <rect className="community-art-bar" x="12" y="32" width="14" height="10" rx="1" />
        <rect className="community-art-bar" x="33" y="23" width="14" height="19" rx="1" />
        <rect className="community-art-bar" x="54" y="14" width="14" height="28" rx="1" />
        <rect className="community-art-bar" x="75" y="7" width="10" height="35" rx="1" />
        <path className="community-art-line community-art-growth-sweep" d="M10 45h77" />
      </svg>
    );
  }

  return (
    <svg className="community-card-art community-art-culture" viewBox="0 0 96 54" fill="none" aria-hidden="true">
      <ellipse className="community-art-orbit" cx="48" cy="27" rx="31" ry="14" />
      <ellipse className="community-art-orbit community-art-orbit-second" cx="48" cy="27" rx="18" ry="27" />
      <circle className="community-art-core" cx="48" cy="27" r="4" />
      <circle className="community-art-satellite" cx="18" cy="27" r="2.5" />
    </svg>
  );
}
