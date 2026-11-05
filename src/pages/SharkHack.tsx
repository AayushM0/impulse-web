import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, ChevronDown, Coins, MapPin, Trophy, Users, FileText, Code2, Flag, CheckCircle2, Clock3, ClipboardList, Mic2, MonitorPlay, MessagesSquare, Handshake, GraduationCap, Sparkles, Award, Building2, LayoutGrid, CircleHelp, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SharkRegistrationButton from '@/components/SharkRegistrationButton';
import SharkTimeline from '@/components/OceanSharkTimeline';
import { useEventReveals } from '@/hooks/useEventReveals';
import './SharkHack.css';
import './SharkHackLayout.css';

// Participant-facing content from SHARK HACK (1).docx and explicit user updates.
// Overall prize pool confirmed by the user; individual place amounts are not specified.
// Schedule follows the user's updated timeline; venue and rules are still pending.
const finaleDate = '23 January 2027';
const timeline = [
  { title: 'Registrations Open', timing: '01 November 2026', description: 'Registration opens for teams participating in SHARK HACK.', icon: Users },
  { title: 'Problem Statements Released', timing: '01 December 2026', description: 'Problem statements are announced, and PPT/prototype submissions begin.', icon: FileText },
  { title: 'Registration & Submission Deadline', timing: '05 January 2027', description: 'Final day for registrations and submission of the required PPT or prototype.', icon: Clock3 },
  { title: 'Shortlist Announcement', timing: '11 January 2027', description: 'Shortlisted teams are announced following the evaluation process.', icon: CheckCircle2 },
  { title: 'Mentorship Rounds', timing: '13\u201315 January 2027', description: 'Selected teams receive mentorship and guidance to refine their solutions.', icon: GraduationCap },
  { title: 'Finalists Announced', timing: '17 January 2027', description: 'The teams advancing to the Grand Finale are announced.', icon: ClipboardList },
  { title: 'Grand Finale', timing: '23 January 2027', location: 'Delhi', description: 'Finalist teams compete at the SHARK HACK Grand Finale in Delhi.', icon: Trophy },
];

const sharkRoom = [
  { label: 'Pitch', icon: Mic2, title: 'Tell the story behind your solution.', description: 'Present your solution to the judging panel. Explain the problem, who it helps and why someone would choose what you’ve built.', caption: 'Explain the problem. Communicate the value.' },
  { label: 'Demo', icon: MonitorPlay, title: 'Show your prototype in action.', description: 'Demonstrate what you have built and how it works. Give the judges a clear view of your solution beyond the presentation.', caption: 'Bring your solution to life.' },
  { label: 'Answer', icon: MessagesSquare, title: 'Take questions from the Sharks.', description: 'The judges will challenge your approach. Be ready to explain what makes your solution different, whether it can work and who benefits.', caption: 'Know your product. Defend your choices.' },
  { label: 'Negotiate', icon: Handshake, title: 'Make the case for its value.', description: 'Receive offers in Impulse Credits and negotiate with the Sharks. These are competition credits, not real money; you are not selling your company.', caption: 'Offer rules and final scoring are still to be confirmed.' },
];

const faqs = [
  {
    question: 'Do I need a project or PPT to register?',
    answer: 'No. A PPT or solution is not required during registration. Problem statements are released and submissions open on 1 December 2026. Team registration and PPT/prototype submissions close on 5 January 2027.',
  },
  {
    question: 'Who can participate?',
    answer: 'Shark Hack is an All-India hackathon with teams of 2–4 participants. Detailed eligibility, college requirements and the individual or team registration process are still to be confirmed in the official rulebook.',
  },
  {
    question: 'Does every team attend the Delhi round?',
    answer: 'No. The first shortlist is announced on 11 January 2027, followed by mentorship on 13–15 January. Teams selected to attend the Delhi grand finale are announced on 17 January 2027.',
  },
  {
    question: 'What are Impulse Credits? Am I selling my project?',
    answer: 'Impulse Credits are a competition mechanism, not real money. Judges use them to express the value they place on a solution. You pitch and defend that value; you are not being asked to sell your company. The offer rules and how credits contribute to final rankings are still to be finalized in the official rulebook.',
  },
  {
    question: 'What details are still to be confirmed?',
    answer: 'The exact Delhi venue, registration link, problem-release platform, detailed submission format, eligibility, pitch timings and scoring rules are still to be confirmed. The grand finale is on ' + finaleDate + '.',
  },
];

const sectionLinks = [
  ['overview', 'Overview'],
  ['timeline', 'Timeline'],
  ['shark-room', 'The Shark Room'],
  ['prizes', 'Prizes'],
  ['partners', 'Partners'],
  ['faq', 'FAQs'],
] as const;

type SectionId = (typeof sectionLinks)[number][0];
const sectionIcons = { overview: LayoutGrid, timeline: Calendar, 'shark-room': Mic2, prizes: Trophy, partners: Handshake, faq: CircleHelp };

const faqIcons = [FileText, Users, MapPin, Coins, Calendar];
const focusStyle = ' shark-focus';

export default function SharkHack() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEventReveals(pageRef);
  const { hash, pathname, search } = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [roomStep, setRoomStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const selectedRoomStep = sharkRoom[roomStep];
  const RoomIcon = selectedRoomStep.icon;
  const focusPanel = useRef(false);

  const selectSection = (id: SectionId, moveFocusToPanel = false) => {
    setMobileMenuOpen(false);
    focusPanel.current = moveFocusToPanel;
    if (hash === '#' + id) {
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      if (moveFocusToPanel) document.getElementById(id)?.focus({ preventScroll: true });
      return;
    }
    navigate({ pathname, search, hash: '#' + id }, { preventScrollReset: true });
  };

  const panelProps = (id: SectionId) => ({
    'aria-labelledby': 'tab-' + id,
    tabIndex: -1,
  });

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      let current: SectionId = 'overview';
      for (const [id] of sectionLinks) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 200) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateSection); };
    updateSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileMenuOpen(false);
      mobileMenuButtonRef.current?.focus({ preventScroll: true });
    };
    const breakpoint = window.matchMedia('(max-width: 900px)');
    const closeOnResize = () => { if (!breakpoint.matches) setMobileMenuOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    breakpoint.addEventListener('change', closeOnResize);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      breakpoint.removeEventListener('change', closeOnResize);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = sectionLinks.find(([section]) => section === hash.slice(1))?.[0];
      if (!id) return;
      const panel = document.getElementById(id);
      panel?.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (focusPanel.current) {
        panel?.focus({ preventScroll: true });
        focusPanel.current = false;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    // The event is a continuous document; section links scroll to their content.
    <div className="shark-hack-page shark-scroll-page" ref={pageRef} data-lenis-prevent>
      <Navbar />
      <main>
        <nav aria-label="Shark Hack sections" className="shark-section-nav">
          <div className="shark-mobile-navigation" ref={mobileMenuRef}>
            <div className="shark-mobile-shortcuts">
              {sectionLinks.slice(0, 2).map(([id, label]) => {
                const Icon = sectionIcons[id];
                return <button key={id} type="button" className={'shark-mobile-tab' + focusStyle} aria-current={activeSection === id ? 'location' : undefined} aria-controls={id} onClick={() => selectSection(id)}><span className={'shark-nav-icon shark-nav-icon-' + id}><Icon aria-hidden="true" /></span>{label}</button>;
              })}
              <button ref={mobileMenuButtonRef} type="button" className={'shark-mobile-tab shark-mobile-more' + focusStyle} aria-expanded={mobileMenuOpen} aria-controls="shark-mobile-section-menu" data-active={!['overview', 'timeline'].includes(activeSection)} onClick={() => setMobileMenuOpen(open => !open)}><LayoutGrid aria-hidden="true" />More<span className="shark-mobile-menu-indicator" aria-hidden="true" /></button>
              <SharkRegistrationButton onOpen={() => setMobileMenuOpen(false)} />
            </div>
            <div id="shark-mobile-section-menu" className="shark-mobile-section-menu" hidden={!mobileMenuOpen}>
              <div className="shark-mobile-menu-heading"><span>Explore Shark Hack</span><button type="button" aria-label="Close section menu" className={focusStyle} onClick={() => { setMobileMenuOpen(false); mobileMenuButtonRef.current?.focus(); }}><X aria-hidden="true" /></button></div>
              <div className="shark-mobile-menu-grid">
                {sectionLinks.slice(2).map(([id, label]) => {
                  const Icon = sectionIcons[id];
                  return <button key={id} type="button" className={'shark-mobile-menu-option' + focusStyle} aria-current={activeSection === id ? 'location' : undefined} aria-controls={id} onClick={() => {
                    selectSection(id, true);
                  }}><span className={'shark-nav-icon shark-nav-icon-' + id}><Icon aria-hidden="true" /></span><span>{label}</span></button>;
                })}
              </div>
            </div>
          </div>
          <div className="shark-content-width shark-section-nav-inner">
            {sectionLinks.map(([id, label]) => {
              const TabIcon = sectionIcons[id];
              return (
              <button key={id} id={'tab-' + id} type="button" aria-current={activeSection === id ? 'location' : undefined} aria-controls={id} onClick={() => selectSection(id, true)} className={'shark-section-link' + (id === 'prizes' ? ' shark-prizes-tab' : '') + focusStyle}>
                <span className={'shark-nav-icon shark-nav-icon-' + id}><TabIcon aria-hidden="true" />{id === 'prizes' && <Sparkles className="shark-trophy-sparkle" aria-hidden="true" />}</span>{label}
              </button>
              );
            })}
            <SharkRegistrationButton />
          </div>
        </nav>

        <section id="overview" {...panelProps('overview')}>
          <div className="shark-hero">
          <div className="shark-hero-atmosphere" aria-hidden="true">
            <img src="/images/shark-hack-banner.jpg" alt="" width="1600" height="639" fetchPriority="high" className="shark-hero-art" />
          </div>
          <div className="shark-content-width">
            <div className="shark-hero-topline">
              <Link to="/events" className={'shark-back-link' + focusStyle}><ArrowUpRight className="shark-back-icon" aria-hidden="true" /> All events</Link>
            </div>
            <div className="shark-hero-content">
              <p className="shark-hero-eyebrow"><span aria-hidden="true" /> Impulse presents · All-India hackathon</p>
              <h1 id="shark-hack-title" className="shark-hero-title">SHARK <span>HACK</span></h1>
              <p className="shark-hero-tagline">Don’t just build. <span>Make them believe.</span></p>
              <p className="shark-hero-description">Build a solution to a surprise problem. Earn your place in the Delhi final, then pitch, demonstrate and negotiate its value with the Sharks.</p>
              <div className="shark-hero-actions">
                <button type="button" onClick={() => selectSection('timeline', true)} className={'shark-secondary-button' + focusStyle}><span>Explore the timeline</span><span className="shark-button-arrow"><ArrowRight aria-hidden="true" /></span></button>
              </div>
              <p className="shark-hero-note"><CheckCircle2 aria-hidden="true" /> No PPT or solution needed at registration.</p>
              <button type="button" onClick={() => selectSection('prizes', true)} className={'shark-rewards-preview' + focusStyle}><Trophy aria-hidden="true" /><span>₹1 lakh+ prize pool (in-kind + cash)</span><ArrowRight aria-hidden="true" /></button>
              <div className="shark-hero-process" aria-label="Build, pitch, negotiate, close"><span><Code2 aria-hidden="true" />Build</span><ArrowRight aria-hidden="true" /><span><Mic2 aria-hidden="true" />Pitch</span><ArrowRight aria-hidden="true" /><span><Handshake aria-hidden="true" />Negotiate</span><ArrowRight aria-hidden="true" /><span><Flag aria-hidden="true" />Close</span></div>
            </div>
            <dl className="shark-event-facts">
              <div className="shark-fact-card">
                <dt><span className="shark-fact-icon"><Calendar aria-hidden="true" /></span> Grand finale date</dt>
                <dd><strong>23 Jan</strong><span className="shark-fact-unit">2027 · Grand finale</span><span className="shark-fact-note"><Clock3 aria-hidden="true" /> Registration opens 1 Nov 2026</span></dd>
              </div>
              <div className="shark-fact-card">
                <dt><span className="shark-fact-icon"><MapPin aria-hidden="true" /></span> The offline final</dt>
                <dd><strong>Delhi</strong><span className="shark-fact-unit">For shortlisted teams</span><span className="shark-fact-note">Venue to be confirmed</span></dd>
              </div>
              <div className="shark-fact-card">
                <dt><span className="shark-fact-icon"><Users aria-hidden="true" /></span> Your team</dt>
                <dd><strong>2–4</strong><span className="shark-fact-unit">Participants per team</span><span className="shark-fact-note">No PPT needed to register</span></dd>
              </div>
              <div className="shark-fact-card shark-fact-prize">
                <dt><span className="shark-fact-icon"><Trophy aria-hidden="true" /></span> Prizes & rewards</dt>
                <dd><strong>₹1 lakh+</strong><span className="shark-fact-unit">Prize pool · In-kind + cash</span><span className="shark-fact-note">Dedicated Women-in-Tech prize</span></dd>
              </div>
            </dl>
          </div>
          </div>
        </section>

        <section id="timeline" {...panelProps('timeline')} className="shark-section shark-journey-section">
          <div className="shark-content-width">
            <div className="shark-section-heading">
              <div><p className="shark-eyebrow"><span>01</span> Your event timeline</p><h2 id="timeline-title">Your path to<br />the <em>Shark Room.</em></h2></div>
              <p className="shark-section-intro">From ideas to impact — follow the journey to SHARK HACK.</p>
            </div>
            <SharkTimeline steps={timeline} />
          </div>
        </section>

        <section id="shark-room" {...panelProps('shark-room')} className="shark-section shark-room-section">
          <div className="shark-content-width">
            <div className="shark-section-heading">
              <div><p className="shark-eyebrow"><span>02</span> For shortlisted teams · Delhi</p><h2 id="shark-room-title">What happens in<br />the <em>Shark Room?</em></h2></div>
              <p className="shark-section-intro">Meet the judges, present your solution and defend its value. Follow the four stages of the offline final.</p>
            </div>
            <div className="shark-room-explorer">
              <div className="shark-room-choices" role="group" aria-label="Explore the Shark Room">
                {sharkRoom.map(({ label, icon: Icon }, index) => (
                  <button key={label} id={'room-choice-' + index} type="button" aria-pressed={roomStep === index} aria-controls="shark-room-detail" onClick={() => setRoomStep(index)} className={'shark-room-choice' + focusStyle}>
                    <span className="shark-colour-icon"><Icon aria-hidden="true" /></span><span className="shark-room-choice-label"><small>Step {index + 1}</small><strong>{label}</strong></span>{index < sharkRoom.length - 1 && <ArrowRight className="shark-room-choice-connector" aria-hidden="true" />}
                  </button>
                ))}
              </div>
              <div id="shark-room-detail" className="shark-room-detail" role="region" aria-labelledby={'room-choice-' + roomStep} aria-live="polite">
                <div className="shark-room-detail-copy"><p className="shark-room-kicker">Step {roomStep + 1} of {sharkRoom.length} / {selectedRoomStep.label}</p><h3>{selectedRoomStep.title}</h3><p>{selectedRoomStep.description}</p><div className="shark-room-caption"><Sparkles aria-hidden="true" />{selectedRoomStep.caption}</div></div>
                <div className="shark-room-step-mark" aria-hidden="true"><span>{String(roomStep + 1).padStart(2, '0')}</span><RoomIcon /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="prizes" {...panelProps('prizes')} className="shark-section shark-prizes-section">
          <div className="shark-content-width">
            <div className="shark-section-heading"><div><p className="shark-eyebrow"><span><Trophy aria-hidden="true" /></span> Prizes & recognition</p><h2 id="prizes-title">Prizes</h2></div><div className="shark-section-symbol" aria-hidden="true"><Trophy /></div></div>
            <div className="shark-prize-grid">
              {[
                { place: 'First place', rank: '1', badge: '1ST', className: 'main', icon: Trophy },
                { place: 'Second place', rank: '2', badge: '2ND', className: 'second', icon: Award },
                { place: 'Third place', rank: '3', badge: '3RD', className: 'third', icon: Award },
              ].map(({ place, rank, badge, className, icon: Icon }) => (
                <article key={rank} className={'shark-prize-card shark-prize-card-' + className}>
                  <div className="shark-prize-top"><span className="shark-prize-icon"><Icon aria-hidden="true" /></span><span>{badge}</span></div>
                  <span className="shark-prize-rank" aria-hidden="true">{rank}</span>
                  <h3>{place}</h3>
                </article>
              ))}
            </div>
            <section className="shark-special-prizes" aria-labelledby="special-prizes-title">
              <h3 id="special-prizes-title">Special Hack Categories</h3>
              <article className="shark-special-prize-card">
                <span className="shark-special-prize-icon"><Users aria-hidden="true" /></span>
                <h4>Women-in-Tech Prize</h4>
                <p className="shark-prize-description">A dedicated prize for eligible all-women teams.</p>
              </article>
            </section>
          </div>
        </section>

        <section id="partners" {...panelProps('partners')} className="shark-section shark-partners-section">
          <div className="shark-content-width">
            <div className="shark-section-heading"><div><p className="shark-eyebrow"><span><Handshake aria-hidden="true" /></span> Sponsors & community</p><h2>Our sponsors.<br /><em>Our community partners.</em></h2></div></div>
            <div className="shark-partner-grid">
              <div className="shark-partner-card"><div className="shark-partner-heading"><span className="shark-colour-icon"><Building2 aria-hidden="true" /></span><h3>Sponsors</h3></div><div className="shark-partner-empty"><p>To be announced</p></div></div>
              <div className="shark-partner-card"><div className="shark-partner-heading"><span className="shark-colour-icon"><Handshake aria-hidden="true" /></span><h3>Community Partners</h3></div><div className="shark-partner-empty"><p>To be announced</p></div></div>
            </div>
          </div>
        </section>

        <section id="faq" {...panelProps('faq')} className="shark-section">
          <div className="shark-content-width shark-faq-layout">
            <div><p className="shark-eyebrow"><span>04</span> Before you register</p><h2 id="faq-title">Good questions.<br /><em>Clear answers.</em></h2></div>
            <div className="shark-faq-list">
              {faqs.map(({ question, answer }, index) => {
                const FaqIcon = faqIcons[index];
                return (
                <details key={question} className="shark-faq-item">
                  <summary className={focusStyle}><span className="shark-faq-icon shark-colour-icon"><FaqIcon aria-hidden="true" /></span><span>{question}</span><span className="shark-disclosure-icon"><ChevronDown aria-hidden="true" /></span></summary>
                  <p>{answer}</p>
                </details>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
