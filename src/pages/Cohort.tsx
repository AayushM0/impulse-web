import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  FileText,
  Lightbulb,
  MapPin,
  Rocket,
  UsersRound,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AsciiBackground, SectionKicker } from '@/components/ui';
import { getLenis } from '@/providers/SmoothScrollProvider';
import './Cohort.css';

const roadmap = [
  { month: 'OCT', title: 'Validate the problem', detail: 'Research user needs, test assumptions, and choose a problem worth solving.', icon: Lightbulb },
  { month: 'NOV', title: 'Shape the product', detail: 'Map the experience, prototype the core workflow, and get early feedback.', icon: FileText },
  { month: 'DEC', title: 'Build the MVP', detail: 'Form product teams and turn validated concepts into working software.', icon: Code2 },
  { month: 'JAN', title: 'Pilot with users', detail: 'Deploy to real users, measure what matters, and improve through iteration.', icon: UsersRound },
  { month: 'FEB', title: 'Ship and showcase', detail: 'Launch the product, share outcomes, and plan what comes next.', icon: Rocket },
];

function getCohortTimeline(now: Date) {
  const month = now.getMonth();
  const startYear = month >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  const monthOffset = (now.getFullYear() - startYear) * 12 + month - 9;
  const activePhase = monthOffset >= 0 && monthOffset < roadmap.length ? monthOffset : null;

  return { monthOffset, activePhase };
}

type ActiveModal = { type: 'roadmap' } | null;

export default function Cohort() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [timelineDate, setTimelineDate] = useState(() => new Date());
  const { monthOffset, activePhase } = getCohortTimeline(timelineDate);
  const currentPhase = activePhase ?? (monthOffset >= roadmap.length ? roadmap.length - 1 : 0);
  const currentPhaseX = [100, 300, 500, 700, 900][currentPhase];
  const currentPhaseColor = ['#60a5fa', '#f472b6', '#60a5fa', '#f472b6', '#60a5fa'][currentPhase];

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.cohort-motion-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const contentRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    const heroLayer = heroLayerRef.current;
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
          if (progress >= 1) {
            heroLayer.style.opacity = '0';
            heroLayer.style.visibility = 'hidden';
            heroLayer.style.pointerEvents = 'none';
          } else {
            heroLayer.style.opacity = `${Math.max(0, 1 - progress * 1.05)}`;
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

  useEffect(() => {
    // Check once per hour if the month has transitioned
    const interval = window.setInterval(() => {
      setTimelineDate(new Date());
    }, 1000 * 60 * 60);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#070B14] min-h-screen">
      <Navbar />
      <main className="cohort-page relative overflow-x-clip">
        {/* Layer 1: Sticky Pinned Hero */}
        <div ref={heroLayerRef} className="sticky top-0 h-[100svh] min-h-[640px] z-0 overflow-hidden transition-opacity duration-300">
          <section className="cohort-hero h-full">
            <AsciiBackground
              className="cohort-hero-ascii"
              variant="waves"
              fade="bottom"
              paused={isScrolledPast}
              colors={['#1E2A44', '#2563EB', '#38BDF8', '#60A5FA', '#F472B6']}
              glyphs=" ·:-=+*#%@"
              size={13}
              scale={1.4}
              speed={0.65}
              angle={-20}
              clearing={0.15}
              contrast={1.15}
              intensity={1.05}
            />
            <div ref={contentRef} className="cohort-hero-stage will-change-transform">
              <div className="relative cohort-hero-content">
                {/* Ambient Aura Pulse behind Wordmark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[160px] sm:h-[220px] bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-pink-500/20 rounded-full blur-3xl pointer-events-none hero-aura-pulse -z-10"
                  aria-hidden="true"
                />
                <div className="flex justify-center mb-4 hero-stagger-1"><SectionKicker label="BUILDER INCUBATOR" /></div>
                <h1 className="cohort-motion-reveal hero-stagger-2">BUILDER <span className="animate-gradient-flow">COHORT</span></h1>
                <div className="cohort-capsule cohort-motion-reveal hero-stagger-3">PROJECTS IN MOTION</div>
                <p className="cohort-intro cohort-motion-reveal hero-stagger-4">
                  A high-intensity, 5-month cohort turning builders into product teams. From problem validation to live production deployment with real users.
                </p>
                <button className="cohort-primary-button cohort-motion-reveal hero-stagger-5" onClick={() => setActiveModal({ type: 'roadmap' })}>
                  Learn more <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Layer 2: Rising Obsidian Sheet with Peeking Blue Pill */}
        <div className="relative z-10 -mt-14 sm:-mt-15 md:-mt-16 rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] bg-[#070B14] border-t border-[#2563EB]/40 shadow-[0_-12px_36px_-6px_rgba(37,99,235,0.15),0_-24px_50px_-12px_rgba(0,0,0,0.95)] pb-20 sm:pb-28">
          <section className="cohort-timeline-section pt-5 sm:pt-6 md:pt-7" id="cohort-timeline" aria-label="Five-month cohort timeline">
            <div className="cohort-timeline">
              <div className="cohort-timeline-heading">
                <div>
                  <SectionKicker number="01" label="CURRICULUM · 5-MONTH SPRINT" className="mb-7" />
                  <h2 className="cohort-motion-reveal">THE <span>BUILD JOURNEY</span></h2>
                  <p className="cohort-motion-reveal">Five months to turn a bold idea into something real.</p>
                </div>
              </div>
          <ol className="cohort-timeline-track">
            <svg className="cohort-timeline-connector" viewBox="0 0 1020 260" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="cohort-timeline-gradient" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M 100 135 C 165 135, 225 245, 300 135 S 430 25, 500 135 S 630 245, 700 135 S 835 25, 900 135" />
              {[100, 300, 500, 700, 900].map((x, index) => (
                <circle
                  className={index === currentPhase ? 'is-current' : undefined}
                  key={x}
                  cx={x}
                  cy="135"
                  r="5"
                  style={index === currentPhase ? { color: currentPhaseColor } : undefined}
                />
              ))}
            </svg>
            {roadmap.map((step, index) => (
              <li
                className={`cohort-timeline-phase cohort-motion-reveal${index === activePhase ? ' is-active' : ''}${index < monthOffset ? ' is-complete' : ''}`}
                data-phase-index={index}
                key={step.month}
                aria-current={index === activePhase ? 'step' : undefined}
              >
                {index === currentPhase && <MapPin className="cohort-timeline-current-pin" size={20} aria-hidden="true" style={{ color: currentPhaseColor }} />}
                <span className="cohort-timeline-card">
                  <span className="cohort-timeline-marker">
                    <step.icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="cohort-timeline-card-copy">
                    <span className="cohort-timeline-meta">{String(index + 1).padStart(2, '0')} <i>{step.month}</i></span>
                    <strong className="cohort-motion-reveal cohort-text-reveal">{step.title}</strong>
                    <span className="cohort-timeline-description cohort-motion-reveal cohort-text-reveal">{step.detail}</span>
                    <span className="cohort-timeline-card-accent" />
                  </span>
                </span>
              </li>
            ))}
            <svg className="cohort-timeline-arrow-front" viewBox="0 0 1020 260" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="cohort-timeline-arrow-front-gradient" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <marker id="cohort-timeline-arrow-front-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto">
                  <path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="url(#cohort-timeline-arrow-front-gradient)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <clipPath id="cohort-timeline-fifth-card-clip">
                  <rect x="800" y="4" width="220" height="128" />
                </clipPath>
              </defs>
              <path
                d="M 900 135 C 925 175, 945 165, 963 132 S 992 75, 1010 70"
                clipPath="url(#cohort-timeline-fifth-card-clip)"
                markerEnd="url(#cohort-timeline-arrow-front-head)"
              />
            </svg>
            <svg className="cohort-timeline-arrow-overlay" viewBox="0 0 1020 260" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="cohort-timeline-arrow-gradient" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <marker id="cohort-timeline-arrowhead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="url(#cohort-timeline-arrow-gradient)" strokeWidth="1.5" strokeDasharray="2 1" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <path d="M 900 135 C 925 175, 945 165, 963 132 S 992 75, 1010 70" markerEnd="url(#cohort-timeline-arrowhead)" />
            </svg>
            <svg className="cohort-timeline-current-overlay" viewBox="0 0 1020 260" preserveAspectRatio="none" aria-hidden="true">
              <g transform={`translate(${currentPhaseX - 14} 96) scale(1.17)`} style={{ color: currentPhaseColor }}>
                <g className="cohort-timeline-pin-bounce">
                  <path d="M20 10c0 8-8 19-8 19S4 18 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3.2" />
                </g>
              </g>
            </svg>
          </ol>
        </div>
        <button
          type="button"
          className="cohort-timeline-scroll-cue"
          onClick={() => {
            const el = document.getElementById('cohort-projects');
            if (el) {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(el, { offset: -64 });
              else el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to cohort projects"
        >
          <ArrowDown size={15} />
        </button>
      </section>

      <section className="cohort-projects" id="cohort-projects">
        <div className="cohort-projects-heading cohort-motion-reveal">
          <div>
            <SectionKicker number="02" label="SHOWCASE · SHIPPED CODE" className="mb-3" />
            <h2 className="cohort-motion-reveal cohort-text-reveal">COHORT FEATURED <span>PROJECTS</span></h2>
            <p className="cohort-section-kicker cohort-motion-reveal cohort-text-reveal">Built together, shipped to the world</p>
          </div>
        </div>

        <div className="cohort-coming-soon cohort-motion-reveal my-16">
          <span /> <i>+</i> COHORT PROJECTS COMING SOON <span />
        </div>
      </section>
      </div>
      </main>

      <div className="relative z-10 bg-[#070B14]">
        <Footer />
      </div>

      {activeModal && (
        <div className="cohort-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveModal(null); }}>
          <section className="cohort-modal" role="dialog" aria-modal="true" aria-labelledby="cohort-modal-title" data-lenis-prevent>
            <button className="cohort-modal-close" onClick={() => setActiveModal(null)} aria-label="Close dialog"><X size={19} /></button>
            {activeModal.type === 'roadmap' ? (
              <>
                <p className="cohort-section-kicker">FIVE MONTHS · ONE SHIPPED PRODUCT</p>
                <h2 id="cohort-modal-title">From first question<br /><span>to real users.</span></h2>
                <p className="cohort-modal-intro">A focused, hands-on cohort for turning a validated problem into a product people can use.</p>
                <div className="cohort-roadmap">
                  {roadmap.map((step, index) => (
                    <div className="cohort-roadmap-step" key={step.month}>
                      <span className="cohort-roadmap-month">{step.month}<small>0{index + 1}</small></span>
                      <div><strong>{step.title}</strong><p>{step.detail}</p></div>
                    </div>
                  ))}
                </div>
                <div className="cohort-modal-footnote"><UsersRound size={17} /> Multidisciplinary teams · Mentorship · Real user feedback</div>
              </>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}

