import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, ChevronDown, Coins, MapPin, Trophy, Users, FileText, Code2, Flag, CheckCircle2, Clock3, ClipboardList, Copy, Mic2, MonitorPlay, MessagesSquare, Handshake, GraduationCap, Mail, Sparkles, Gift, Building2, LayoutGrid, CircleHelp, LockKeyhole, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SharkTimeline from '@/components/SharkTimeline';
import './SharkHack.css';

// Participant-facing content from SHARK HACK (1).docx and explicit user updates.
// Prize amounts are withheld; goodies and partner placeholders were requested by the user.
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

const registrationChecklist = [
  'Team name and team leader',
  'Team members · 2–4 per team',
  'College or institution',
  'Contact details',
  'Relevant technical domains',
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
  ['register', 'Registration'],
] as const;

type SectionId = (typeof sectionLinks)[number][0];
const sectionIcons = { overview: LayoutGrid, timeline: Calendar, 'shark-room': Mic2, prizes: Trophy, partners: Handshake, faq: CircleHelp, register: ClipboardList };
const overviewLinks = [
  { id: 'timeline', title: 'Plan your journey', description: 'From registration to the Delhi final.', action: 'View timeline' },
  { id: 'shark-room', title: 'Meet the Shark Room', description: 'Pitch, demo, answer and negotiate.', action: 'Explore the stages' },
  { id: 'prizes', title: 'See what’s at stake', description: 'Cash prizes, goodies and recognition.', action: 'Discover prizes' },
  { id: 'partners', title: 'Behind the event', description: 'Sponsors and community partners.', action: 'View partners' },
  { id: 'faq', title: 'Questions before you join?', description: 'Find the details you need to take part.', action: 'Read FAQs' },
  { id: 'register', title: 'Get your team ready', description: 'Registration details and what to prepare.', action: 'View registration' },
] as const;

const faqIcons = [FileText, Users, MapPin, Coins, Calendar];
const registrationIcons = [Flag, Users, GraduationCap, Mail, Code2];
const focusStyle = ' shark-focus';

export default function SharkHack() {
  const { hash, pathname, search } = useLocation();
  const navigate = useNavigate();
  const activeSection = sectionLinks.find(([id]) => id === hash.slice(1))?.[0] ?? 'overview';
  const [copyStatus, setCopyStatus] = useState('');
  const [roomStep, setRoomStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const selectedRoomStep = sharkRoom[roomStep];
  const RoomIcon = selectedRoomStep.icon;
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const focusPanel = useRef(false);

  const selectSection = (id: SectionId, moveFocusToPanel = false) => {
    setMobileMenuOpen(false);
    focusPanel.current = moveFocusToPanel;
    navigate({ pathname, search, hash: '#' + id }, { preventScrollReset: true });
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % sectionLinks.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + sectionLinks.length) % sectionLinks.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = sectionLinks.length - 1;
    else return;
    event.preventDefault();
    const id = sectionLinks[nextIndex][0];
    selectSection(id);
    document.getElementById('tab-' + id)?.focus({ preventScroll: true });
  };

  const panelProps = (id: SectionId) => ({
    role: 'tabpanel',
    'aria-labelledby': 'tab-' + id,
    hidden: activeSection !== id,
    tabIndex: 0,
  });

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

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
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('tab-' + activeSection)?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
      if (focusPanel.current) {
        document.getElementById(activeSection)?.focus({ preventScroll: true });
        focusPanel.current = false;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeSection]);

  const copyEventLink = async () => {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(window.location.origin + '/events/shark-hack');
      setCopyStatus('Event link copied.');
      copyTimer.current = setTimeout(() => setCopyStatus(''), 3000);
    } catch {
      setCopyStatus('Could not copy. You can copy this page’s address from your browser.');
    }
  };

  return (
    // Native scrolling prevents the site's Lenis animation from carrying into a new tab.
    <div className="shark-hack-page" data-lenis-prevent>
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
            </div>
            <div id="shark-mobile-section-menu" className="shark-mobile-section-menu" hidden={!mobileMenuOpen}>
              <div className="shark-mobile-menu-heading"><span>Explore Shark Hack</span><button type="button" aria-label="Close section menu" className={focusStyle} onClick={() => { setMobileMenuOpen(false); mobileMenuButtonRef.current?.focus(); }}><X aria-hidden="true" /></button></div>
              <div className="shark-mobile-menu-grid">
                {sectionLinks.slice(2).map(([id, label]) => {
                  const Icon = sectionIcons[id];
                  return <button key={id} type="button" className={'shark-mobile-menu-option' + (id === 'register' ? ' shark-mobile-menu-register' : '') + focusStyle} aria-current={activeSection === id ? 'location' : undefined} aria-controls={id} onClick={() => {
                    if (id === activeSection) { setMobileMenuOpen(false); document.getElementById(id)?.focus({ preventScroll: true }); }
                    else selectSection(id, true);
                  }}><span className={'shark-nav-icon shark-nav-icon-' + id}><Icon aria-hidden="true" /></span><span>{label}</span>{id === 'register' && <ArrowUpRight aria-hidden="true" />}</button>;
                })}
              </div>
            </div>
          </div>
          <div role="tablist" aria-label="Event details" className="shark-content-width shark-section-nav-inner">
            {sectionLinks.map(([id, label], index) => {
              const TabIcon = sectionIcons[id];
              return (
              <button key={id} id={'tab-' + id} type="button" role="tab" aria-selected={activeSection === id} aria-controls={id} tabIndex={activeSection === id ? 0 : -1} onClick={() => selectSection(id)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={(id === 'register' ? 'shark-section-register' : 'shark-section-link') + (id === 'prizes' ? ' shark-prizes-tab' : '') + focusStyle}>
                {id !== 'register' && <span className={'shark-nav-icon shark-nav-icon-' + id}><TabIcon aria-hidden="true" />{id === 'prizes' && <Sparkles className="shark-trophy-sparkle" aria-hidden="true" />}</span>}{label}{id === 'register' && <ArrowUpRight aria-hidden="true" />}
              </button>
              );
            })}
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
                <button type="button" onClick={() => selectSection('register', true)} className={'shark-primary-button' + focusStyle}><span>Registration details</span><span className="shark-button-arrow"><ArrowUpRight aria-hidden="true" /></span></button>
                <button type="button" onClick={() => selectSection('timeline', true)} className={'shark-secondary-button' + focusStyle}><span>Explore the timeline</span><span className="shark-button-arrow"><ArrowRight aria-hidden="true" /></span></button>
              </div>
              <p className="shark-hero-note"><CheckCircle2 aria-hidden="true" /> No PPT or solution needed at registration.</p>
              <button type="button" onClick={() => selectSection('prizes', true)} className={'shark-rewards-preview' + focusStyle}><Trophy aria-hidden="true" /><span>Cash prizes <span aria-hidden="true">·</span> Goodies <span aria-hidden="true">·</span> Recognition</span><ArrowRight aria-hidden="true" /></button>
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
                <dd><strong>Cash prizes</strong><span className="shark-fact-unit">Goodies & recognition</span><span className="shark-fact-note">Dedicated Women-in-Tech prize</span></dd>
              </div>
            </dl>
          </div>
          </div>
          <div className="shark-overview-explore shark-content-width">
            <div className="shark-explore-heading"><h2>There’s more to <span>Shark Hack.</span></h2><p>Choose a card to explore the details.</p></div>
            <div className="shark-explore-grid">
              {overviewLinks.map(({ id, title, description, action }) => {
                const Icon = sectionIcons[id];
                return <button key={id} type="button" className={'shark-explore-card shark-explore-' + id + focusStyle} onClick={() => selectSection(id, true)} aria-controls={id}>
                  <span className={'shark-nav-icon shark-nav-icon-' + id}><Icon aria-hidden="true" /></span>
                  <span className="shark-explore-copy"><strong>{title}</strong><span>{description}</span><span className="shark-explore-action">{action}<ArrowRight aria-hidden="true" /></span></span>
                </button>;
              })}
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
                <div className="shark-room-art" aria-hidden="true"><span className="shark-room-orbit" /><span className="shark-room-orbit" /><span className="shark-room-art-icon"><RoomIcon /></span><span className="shark-room-art-label">THE SHARK ROOM</span></div>
                <div className="shark-room-controls">
                  <button type="button" disabled={roomStep === 0} onClick={() => setRoomStep(step => Math.max(0, step - 1))} className={'shark-room-previous' + focusStyle}><ArrowLeft aria-hidden="true" /> Previous</button>
                  <span className="shark-room-progress" aria-hidden="true">{sharkRoom.map(({ label }, index) => <span key={label} className={index === roomStep ? 'is-active' : ''} />)}</span>
                  <button type="button" onClick={() => roomStep < sharkRoom.length - 1 ? setRoomStep(step => step + 1) : selectSection('register', true)} className={'shark-room-next' + focusStyle}>{roomStep < sharkRoom.length - 1 ? 'Next: ' + sharkRoom[roomStep + 1].label : 'Registration details'}<ArrowRight aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="prizes" {...panelProps('prizes')} className="shark-section shark-prizes-section">
          <div className="shark-content-width">
            <div className="shark-section-heading"><div><p className="shark-eyebrow"><span><Trophy aria-hidden="true" /></span> Prizes & recognition</p><h2 id="prizes-title">Cash prizes.<br /><em>Goodies. Recognition.</em></h2></div><div className="shark-section-symbol" aria-hidden="true"><Trophy /></div></div>
            <div className="shark-prize-grid">
              <div className="shark-prize-card shark-prize-card-main">
                <div className="shark-prize-top"><span className="shark-prize-icon"><Trophy aria-hidden="true" /></span><span>THE GRAND ROUND</span></div>
                <h3>Cash prizes</h3>
                <p className="shark-prize-description">Build your solution, make your pitch and compete for cash prizes at Shark Hack.</p>
                <Trophy className="shark-prize-watermark" aria-hidden="true" />
              </div>
              <div className="shark-prize-card shark-prize-card-goodies">
                <div className="shark-prize-top"><span className="shark-prize-icon"><Gift aria-hidden="true" /></span><span>MORE TO LOOK FORWARD TO</span></div>
                <h3>Goodies</h3>
                <p className="shark-prize-description">There’s more than cash to look forward to. Goodies are part of the Shark Hack rewards.</p>
                <Gift className="shark-prize-watermark" aria-hidden="true" />
              </div>
              <div className="shark-prize-card shark-prize-card-women">
                <div className="shark-prize-top"><span className="shark-prize-icon"><Users aria-hidden="true" /></span><span>DEDICATED RECOGNITION</span></div>
                <h3>Women-in-Tech<br /><span>Prize</span></h3>
                <p className="shark-prize-description">A dedicated prize for eligible all-women teams.</p>
                <Users className="shark-prize-watermark" aria-hidden="true" />
              </div>
            </div>
            <div className="shark-prize-cta"><div><h3>Ready to bring your idea to Shark Hack?</h3><p>No PPT or solution needed at registration.</p></div><button type="button" onClick={() => selectSection('register', true)} className={'shark-primary-button' + focusStyle}>Registration details <ArrowUpRight aria-hidden="true" /></button></div>
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

        <section id="register" {...panelProps('register')} className="shark-section shark-registration-section">
          <div className="shark-content-width">
            <div className="shark-registration-heading">
              <div><p className="shark-eyebrow"><span><ClipboardList aria-hidden="true" /></span> Shark Hack · Team entry</p><h2 id="registration-title">Registration</h2><p>Form your team. Get ready to enter Shark Hack.</p></div>
              <span className="shark-registration-badge"><Clock3 aria-hidden="true" /> Not open yet</span>
            </div>
            <div className="shark-registration-ticket">
              <div className="shark-registration-copy">
                <div className="shark-registration-card-top"><span className="shark-colour-icon"><Users aria-hidden="true" /></span><span>TEAM REGISTRATION</span></div>
                <h3>Bring your team.<br /><span>Build your next big idea.</span></h3>
                <dl className="shark-registration-facts"><div><dt>Team size</dt><dd>2–4 <span>participants</span></dd></div><div><dt>Grand finale</dt><dd>23 Jan 2027 <span>Delhi</span></dd></div></dl>
                <div className="shark-registration-status"><LockKeyhole aria-hidden="true" /><div><strong>Registrations open 1 November 2026</strong><p>Registration and submissions close on 5 January 2027. The official registration link will be announced.</p></div></div>
                <button type="button" disabled className="shark-registration-unavailable"><LockKeyhole aria-hidden="true" /> Registration not open yet</button>
                <p className="shark-registration-reassurance"><CheckCircle2 aria-hidden="true" /> No PPT or solution needed to register.</p>
                <button type="button" onClick={copyEventLink} className={'shark-share-button' + focusStyle}><Copy aria-hidden="true" /> Copy event link for your team</button>
                <p className="shark-copy-status" role="status">{copyStatus}</p>
              </div>
              <div className="shark-registration-prep">
                <p className="shark-registration-prep-label">BEFORE YOU REGISTER</p><h3>Have these details ready</h3>
                <ul>{registrationChecklist.map((item, index) => { const Icon = registrationIcons[index]; return (<li key={item}><span className="shark-colour-icon"><Icon aria-hidden="true" /></span>{item}</li>); })}</ul>
                <p>The official form may also request previous project experience or information needed for screening and logistics.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
