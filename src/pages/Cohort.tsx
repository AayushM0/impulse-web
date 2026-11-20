import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
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

interface CohortProject {
  id: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  targetUser: string;
  solution: string;
  milestone: string;
  architecture: string;
  description?: string;
  coverImage?: string;
  stack: string[];
  team: { name: string; role?: string; avatar?: string }[];
  status?: string;
  cycle?: string;
  realUsers?: number;
  outcomes?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
}

const cohortProjects: CohortProject[] = [
  {
    id: 'signalforge',
    name: 'SignalForge',
    category: 'AI OPERATIONS',
    summary: 'Support signals get buried across channels; SignalForge clusters feedback into ranked, evidence-linked product opportunities.',
    problem: 'Product teams spend hours sorting feedback across chat, tickets, and call notes, while important user patterns go unnoticed.',
    targetUser: 'Product managers and support leads at small SaaS teams.',
    solution: 'An evidence-linked feedback workspace groups recurring issues and turns them into ranked, reviewable opportunities.',
    milestone: 'October MVP gate cleared; preparing the November design-partner demo.',
    architecture: 'Ingestion workers normalize support events, embeddings cluster related feedback, and a review API serves evidence-backed themes to the dashboard.',
    stack: ['TypeScript', 'PostgreSQL', 'pgvector', 'OpenAI'],
    team: [{ name: 'Aarav Mehta' }, { name: 'Mina Shah' }, { name: 'Dev Kapoor' }],
    status: 'On Track - Functional V1',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/signal-forge' },
      { label: 'Live Demo', url: 'https://signalforge.impulse.build' },
    ],
  },
  {
    id: 'tracekit',
    name: 'TraceKit',
    category: 'DEVELOPER TOOLS',
    summary: 'Async failures are hard to trace across separate tools; TraceKit brings job runs, logs, and retries into one workflow console.',
    problem: 'Early-stage engineering teams need to understand failed background jobs without stitching together fragmented observability data.',
    targetUser: 'Backend engineers maintaining queue-based services.',
    solution: 'A lightweight workflow console connects each job run to its logs, retries, and execution history.',
    milestone: 'Core trace viewer complete; November sprint is focused on replay safety and team onboarding.',
    architecture: 'A typed SDK emits correlated events to a queue; workers persist traces and a streaming API powers the searchable run timeline.',
    stack: ['Go', 'Redis', 'ClickHouse', 'React'],
    team: [{ name: 'Zoya Iyer' }, { name: 'Kabir Rao' }, { name: 'Ishaan Das' }],
    status: 'On Track - Functional V1',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/tracekit' },
      { label: 'Live Demo', url: 'https://tracekit.impulse.build' },
    ],
  },
  {
    id: 'fieldnotes',
    name: 'FieldNotes',
    category: 'RESEARCH',
    summary: 'Interview findings are hard to revisit and cite; FieldNotes links searchable transcripts directly to source moments.',
    problem: 'Manual transcription and note sorting make qualitative research difficult to revisit and easy to misquote.',
    targetUser: 'UX researchers and product teams running customer interviews.',
    solution: 'A private research library links searchable transcripts and themes directly to timestamped source excerpts.',
    milestone: 'Interview import and citation flow validated; November demo will test collaborative synthesis.',
    architecture: 'Audio is transcribed asynchronously, speaker turns are indexed with timestamps, and every generated theme retains a source citation.',
    stack: ['Python', 'FastAPI', 'Whisper', 'pgvector'],
    team: [{ name: 'Anaya Sen' }, { name: 'Rohan Nair' }, { name: 'Tara Bose' }],
    status: 'On Track - Research Preview',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/fieldnotes' },
      { label: 'Live Demo', url: 'https://fieldnotes.impulse.build' },
    ],
  },
  {
    id: 'relayboard',
    name: 'RelayBoard',
    category: 'TEAM PRODUCTIVITY',
    summary: 'Distributed handoffs get lost across chat and trackers; RelayBoard turns updates into clear owners and next actions.',
    problem: 'Owners and blockers are difficult to spot across chat threads, issue trackers, and recurring status reports.',
    targetUser: 'Small, distributed product and engineering teams.',
    solution: 'A shared delivery board turns project updates into concise handoffs with clear ownership and next actions.',
    milestone: 'Team board and update workflow shipped internally; next gate is a pilot with two remote teams.',
    architecture: 'Connector adapters sync selected work items into a normalized event model; rules build a real-time handoff view with audit history.',
    stack: ['Next.js', 'PostgreSQL', 'GraphQL', 'Tailwind'],
    team: [{ name: 'Neel Verma' }, { name: 'Kiara Dutta' }, { name: 'Arjun Gill' }],
    status: 'On Track - Pilot Ready',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/relayboard' },
      { label: 'Live Demo', url: 'https://relayboard.impulse.build' },
    ],
  },
  {
    id: 'accesslens',
    name: 'AccessLens',
    category: 'ACCESSIBILITY',
    summary: 'Accessibility issues surface too late; AccessLens maps actionable audit findings to the page elements teams own.',
    problem: 'Automated audits surface findings, but developers lack actionable context tied to the component they own.',
    targetUser: 'Frontend developers and accessibility reviewers.',
    solution: 'A browser-side audit assistant maps accessibility findings to page elements and gives teams a prioritized fix queue.',
    milestone: 'Browser audit prototype is functional; November milestone adds saved reports and regression checks.',
    architecture: 'A browser extension runs axe-core checks, maps results to DOM selectors, and syncs signed reports to a small team API.',
    stack: ['TypeScript', 'React', 'axe-core', 'Supabase'],
    team: [{ name: 'Sana Qureshi' }, { name: 'Vihaan Roy' }, { name: 'Myra Thomas' }],
    status: 'On Track - Functional V1',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/accesslens' },
      { label: 'Live Demo', url: 'https://accesslens.impulse.build' },
    ],
  },
  {
    id: 'modelmeter',
    name: 'ModelMeter',
    category: 'AI INFRASTRUCTURE',
    summary: 'AI regressions are hard to catch across model changes; ModelMeter compares quality, latency, and token cost.',
    problem: 'Prompt regressions are often caught late because evaluation cases and production traces are not compared consistently.',
    targetUser: 'Applied AI teams iterating on LLM-powered products.',
    solution: 'A compact evaluation workbench tracks versioned test cases, model outputs, latency, and token spend.',
    milestone: 'Evaluation runner and baseline comparison are ready; November sprint targets scheduled team runs.',
    architecture: 'A provider-neutral adapter captures completions, a job runner executes versioned eval sets, and a metrics store powers comparisons.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    team: [{ name: 'Aditi Kulkarni' }, { name: 'Reyansh Jain' }, { name: 'Nisha Paul' }],
    status: 'On Track - Functional V1',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/modelmeter' },
      { label: 'Live Demo', url: 'https://modelmeter.impulse.build' },
    ],
  },
  {
    id: 'greengrid',
    name: 'GreenGrid',
    category: 'CLIMATE TECH',
    summary: 'Campus energy waste is difficult to pinpoint; GreenGrid pairs meter readings with schedules to flag unusual demand.',
    problem: 'Utility reports arrive too late and lack the building-level context needed to identify practical savings.',
    targetUser: 'Campus facilities managers and sustainability teams.',
    solution: 'An energy monitoring dashboard combines meter readings with occupancy schedules to highlight unusual demand.',
    milestone: 'Sample-data dashboard is live; team is preparing a November pilot with facilities staff.',
    architecture: 'Meter readings enter through a time-series ingestion service, are aligned with building schedules, and feed anomaly summaries.',
    stack: ['Node.js', 'TimescaleDB', 'MQTT', 'React'],
    team: [{ name: 'Ira Malhotra' }, { name: 'Dhruv Bansal' }, { name: 'Meera Pillai' }],
    status: 'On Track - Pilot Ready',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/greengrid' },
      { label: 'Live Demo', url: 'https://greengrid.impulse.build' },
    ],
  },
  {
    id: 'launchpad',
    name: 'Launchpad',
    category: 'EDTECH',
    summary: 'Student projects stall before validation; Launchpad guides teams from a rough idea through milestones to a tested release.',
    problem: 'Project-based learning often stops at tutorials, leaving teams unsure how to validate and scope their own product.',
    targetUser: 'Student founders and multidisciplinary builder cohorts.',
    solution: 'A guided workspace breaks a product sprint into testable milestones, mentor feedback, and weekly demos.',
    milestone: 'Sprint planner and mentor review flow cleared the October gate; November focuses on cohort onboarding.',
    architecture: 'A workflow engine stores milestone templates and evidence; role-based APIs deliver mentor reviews and team progress views.',
    stack: ['TypeScript', 'Next.js', 'Supabase', 'Vercel'],
    team: [{ name: 'Kavya Menon' }, { name: 'Advik Sethi' }, { name: 'Simran Kaur' }],
    status: 'On Track - Functional V1',
    cycle: 'Cycle 1',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/impulse-community/launchpad' },
      { label: 'Live Demo', url: 'https://launchpad.impulse.build' },
    ],
  },
];

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
  const [flippedProjectId, setFlippedProjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [timelineDate, setTimelineDate] = useState(() => new Date());
  const [revealedProjectIds, setRevealedProjectIds] = useState<Set<string>>(() => new Set());
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const { monthOffset, activePhase } = getCohortTimeline(timelineDate);
  const currentPhase = activePhase ?? (monthOffset >= roadmap.length ? roadmap.length - 1 : 0);
  const currentPhaseX = [100, 300, 500, 700, 900][currentPhase];
  const currentPhaseColor = ['#60a5fa', '#f472b6', '#60a5fa', '#f472b6', '#60a5fa'][currentPhase];
  const categories = ['All Projects', ...new Set(cohortProjects.map((project) => project.category))];
  const visibleProjects = activeCategory === 'All Projects'
    ? cohortProjects
    : cohortProjects.filter((project) => project.category === activeCategory);

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
    const grid = projectsGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.cohort-project-teaser[data-project-id]'));

    if (!('IntersectionObserver' in window)) {
      setRevealedProjectIds(new Set(cards.map((card) => card.dataset.projectId).filter((id): id is string => Boolean(id))));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = (entry.target as HTMLElement).dataset.projectId;
          if (!projectId) return;

          setRevealedProjectIds((current) => {
            const next = new Set(current);
            if (entry.isIntersecting) next.add(projectId);
            else next.delete(projectId);
            return next;
          });
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeCategory]);

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
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const timeout = window.setTimeout(() => setTimelineDate(new Date()), nextMonth.getTime() - now.getTime());
    return () => window.clearTimeout(timeout);
  }, [timelineDate]);

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
          {categories.length > 2 && (
            <label className="cohort-filter-label">
              <span className="sr-only">Filter projects</span>
              <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
          )}
        </div>

        {visibleProjects.length ? (
          <div className="cohort-projects-grid" ref={projectsGridRef}>
            {visibleProjects.map((project, index) => (
              <article
                className={`cohort-project-teaser${revealedProjectIds.has(project.id) ? ' is-revealed' : ' is-pending'}${flippedProjectId === project.id ? ' is-flipped' : ''}`}
                data-project-id={project.id}
                key={project.id}
              >
                <span className="cohort-project-teaser-inner">
                  <span className="cohort-project-teaser-face cohort-project-teaser-front">
                    <div className="cohort-project-card-top">
                      <span className="cohort-project-category">{project.category}</span>
                      <span className="cohort-project-card-art">
                        <ProjectCardArt index={index} />
                      </span>
                    </div>
                    <strong className="cohort-project-name cohort-motion-reveal cohort-text-reveal">{project.name}</strong>
                    <p className="cohort-project-summary cohort-motion-reveal cohort-text-reveal">{project.summary}</p>
                    <div className="cohort-project-tech-stack" aria-label="Technology stack">
                      {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <div className="cohort-project-card-footer">
                      <span className="cohort-project-team" aria-label="Project team">
                        Team: {project.team.map((member) => member.name).join(' · ')}
                      </span>
                      <button
                        className="cohort-project-teaser-action cohort-project-more"
                        type="button"
                        onClick={() => {
                          setRevealedProjectIds((current) => new Set(current).add(project.id));
                          setFlippedProjectId(project.id);
                        }}
                        aria-label={`Explore ${project.name}`}
                      >
                        View details <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </span>
                  <span className="cohort-project-teaser-face cohort-project-teaser-back">
                    <div className="cohort-project-back-header">
                      <strong className="cohort-project-name cohort-motion-reveal cohort-text-reveal">{project.name}</strong>
                      <span className="cohort-project-category">{project.category}</span>
                    </div>
                    <div className="cohort-project-back-details">
                      <div className="cohort-project-back-field"><i className="cohort-motion-reveal cohort-text-reveal">PROBLEM STATEMENT</i><span>{project.problem}</span></div>
                      <div className="cohort-project-back-field"><i className="cohort-motion-reveal cohort-text-reveal">TECHNICAL ARCHITECTURE</i><span>{project.architecture}</span></div>
                      <div className="cohort-project-back-field"><i className="cohort-motion-reveal cohort-text-reveal">PROPOSED SOLUTION</i><span>{project.solution}</span></div>
                      <div className="cohort-project-back-field"><i className="cohort-motion-reveal cohort-text-reveal">USP</i><span>{project.summary}</span></div>
                    </div>
                    <div className="cohort-project-links">
                      {project.links?.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                          {link.label === 'GitHub Repository' ? 'GitHub Repo' : link.label === 'Live Demo' ? 'Website' : link.label}
                          {' '}<ArrowUpRight size={11} aria-hidden="true" />
                        </a>
                      ))}
                      <button
                        className="cohort-project-teaser-action cohort-project-return"
                        type="button"
                        onClick={(event) => {
                          setFlippedProjectId(null);
                          event.currentTarget.blur();
                        }}
                        aria-label={`Return to ${project.name} summary`}
                      >
                        <ArrowLeft size={13} /> Return
                      </button>
                    </div>
                  </span>
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="cohort-project-empty">
            <span className="cohort-empty-mark"><Code2 size={21} /></span>
            <p className="cohort-empty-kicker cohort-motion-reveal cohort-text-reveal">THE NEXT BUILD STARTS HERE</p>
            <h3 className="cohort-motion-reveal cohort-text-reveal">Projects in motion.</h3>
            <p className="cohort-motion-reveal cohort-text-reveal">Featured cohort projects will appear here as teams ship and share their work.</p>
          </div>
        )}

        <div className="cohort-coming-soon"><span /> <i>+</i> MORE PROJECTS COMING SOON <span /></div>
      </section>
      </div>
      </main>

      <div className="relative z-10 bg-[#070B14]">
        <Footer />
      </div>

      {activeModal && (
        <div className="cohort-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveModal(null); }}>
          <section className="cohort-modal" role="dialog" aria-modal="true" aria-labelledby="cohort-modal-title">
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

function ProjectCardArt({ index }: { index: number }) {
  const mod = index % 5;
  if (mod === 0) {
    return (
      <svg className="cohort-card-art-svg" viewBox="0 0 60 28" fill="none" aria-hidden="true">
        <path d="M6 20 18 8l16 14 18-16" stroke="#60A5FA" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="20" r="2.5" fill="#60A5FA" />
        <circle cx="18" cy="8" r="2.5" fill="#60A5FA" />
        <circle cx="34" cy="22" r="2.5" fill="#60A5FA" />
        <circle cx="52" cy="6" r="2.5" fill="#F472B6" />
      </svg>
    );
  }
  if (mod === 1) {
    return (
      <svg className="cohort-card-art-svg" viewBox="0 0 60 28" fill="none" aria-hidden="true">
        <rect x="8" y="16" width="7" height="9" rx="1" fill="rgba(244, 114, 182, 0.2)" stroke="#F472B6" strokeWidth="1.2" />
        <rect x="20" y="11" width="7" height="14" rx="1" fill="rgba(244, 114, 182, 0.2)" stroke="#F472B6" strokeWidth="1.2" />
        <rect x="32" y="6" width="7" height="19" rx="1" fill="rgba(244, 114, 182, 0.2)" stroke="#F472B6" strokeWidth="1.2" />
        <rect x="44" y="2" width="6" height="23" rx="1" fill="rgba(244, 114, 182, 0.2)" stroke="#F472B6" strokeWidth="1.2" />
      </svg>
    );
  }
  if (mod === 2) {
    return (
      <svg className="cohort-card-art-svg" viewBox="0 0 60 28" fill="none" aria-hidden="true">
        <ellipse cx="30" cy="14" rx="20" ry="7" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="1.2" strokeDasharray="2 3" />
        <ellipse cx="30" cy="14" rx="9" ry="12" stroke="rgba(244, 114, 182, 0.5)" strokeWidth="1.2" />
        <circle cx="30" cy="14" r="3" fill="#F472B6" />
        <circle cx="13" cy="14" r="2" fill="#60A5FA" />
      </svg>
    );
  }
  if (mod === 3) {
    return (
      <svg className="cohort-card-art-svg" viewBox="0 0 60 28" fill="none" aria-hidden="true">
        <path d="M8 14h44M18 14l12-9 12 9-12 9-12-9Z" stroke="rgba(96, 165, 250, 0.7)" strokeWidth="1.2" />
        <circle cx="8" cy="14" r="2.5" fill="#60A5FA" />
        <circle cx="30" cy="5" r="2.5" fill="#F472B6" />
        <circle cx="52" cy="14" r="2.5" fill="#60A5FA" />
        <circle cx="30" cy="23" r="2.5" fill="#60A5FA" />
      </svg>
    );
  }
  return (
    <div className="cohort-card-art-nodes flex items-center gap-1" aria-hidden="true">
      <span className="font-mono-label text-[9px] px-1.5 py-0.5 rounded-full border border-blue-400/30 text-[#9AA8C2] bg-[#070B14]">MVP</span>
      <span className="w-3 h-px bg-gradient-to-r from-blue-400/40 to-pink-400/40" />
      <span className="font-mono-label text-[9px] px-1.5 py-0.5 rounded-full border border-pink-400/30 text-[#9AA8C2] bg-[#070B14]">PROD</span>
    </div>
  );
}