import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Calendar, ChevronDown, Coins, MapPin, Trophy, Users, FileText, Code2, Flag, CheckCircle2, Clock3, ClipboardList, Copy, Mic2, MonitorPlay, MessagesSquare, Handshake, GraduationCap, Mail, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './SharkHack.css';

// Participant-facing content from SHARK HACK (1).docx.
// Unconfirmed dates, eligibility and rules remain explicitly provisional.
// The document's final note specifies one finale date, subject to venue availability.
const timeline = [
  {
    title: 'Register',
    timing: 'Registration link to be announced',
    description: 'Register through the official form. Teams have 2–4 members. You do not need to submit a PPT or solution at registration.',
  },
  {
    title: 'Get the problem statement',
    timing: 'Release date to be confirmed',
    description: 'The official problem statement is revealed before building begins. Understand the challenge, identify your users and develop your approach.',
  },
  {
    title: 'Build & submit',
    timing: 'Submission deadline to be announced',
    description: 'Build and test your prototype or MVP. Submit the required presentation and documentation before the official deadline.',
  },
  {
    title: 'Shortlisting',
    timing: 'Announcement date to be confirmed',
    description: 'The Impulse organizing and judging team evaluates submissions. Shortlisted teams move on to the offline grand round in Delhi.',
  },
  {
    title: 'Enter the Shark Room',
    timing: '30 or 31 October 2026 · Tentative',
    description: 'Pitch your solution, demonstrate your prototype and answer the judges’ questions. Defend its value and negotiate offers in Impulse Credits.',
  },
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
    answer: 'No. A PPT or solution is not required during registration. Building begins after the official problem statement is released; the presentation and documentation are submitted later, before the announced deadline.',
  },
  {
    question: 'Who can participate?',
    answer: 'Shark Hack is an All-India hackathon with teams of 2–4 participants. Detailed eligibility, college requirements and the individual or team registration process are still to be confirmed in the official rulebook.',
  },
  {
    question: 'Does every team attend the Delhi round?',
    answer: 'Only shortlisted teams advance to the offline grand round in Delhi. Submissions will be evaluated by the Impulse organizing and judging team according to the officially published criteria.',
  },
  {
    question: 'What are Impulse Credits? Am I selling my project?',
    answer: 'Impulse Credits are a competition mechanism, not real money. Judges use them to express the value they place on a solution. You pitch and defend that value; you are not being asked to sell your company. The offer rules and how credits contribute to final rankings are still to be finalized in the official rulebook.',
  },
  {
    question: 'What details are still to be confirmed?',
    answer: 'The final event date and venue, problem-release date and platform, submission deadline and format, detailed eligibility, pitch timings and scoring rules are still to be confirmed. The proposed Delhi round is on 30 or 31 October 2026, with one date to be selected based on venue availability.',
  },
];

const sectionLinks = [
  ['overview', 'Overview'],
  ['timeline', 'Timeline'],
  ['shark-room', 'The Shark Room'],
  ['prizes', 'Prizes'],
  ['faq', 'FAQs'],
];

const timelineIcons = [Users, FileText, Code2, CheckCircle2, Flag];
const faqIcons = [FileText, Users, MapPin, Coins, Calendar];
const registrationIcons = [Flag, Users, GraduationCap, Mail, Code2];
const focusStyle = ' shark-focus';

export default function SharkHack() {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [copyStatus, setCopyStatus] = useState('');
  const [roomStep, setRoomStep] = useState(0);
  const selectedRoomStep = sharkRoom[roomStep];
  const RoomIcon = selectedRoomStep.icon;
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const current = [...sectionLinks, ['register', 'Registration']].filter(([id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 180;
      }).pop();
      setActiveSection(current?.[0] || 'overview');
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSection);
    };
    updateSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(copyTimer.current);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const copyEventLink = async () => {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(window.location.origin + '/shark-hack');
      setCopyStatus('Event link copied.');
      copyTimer.current = setTimeout(() => setCopyStatus(''), 3000);
    } catch {
      setCopyStatus('Could not copy. You can copy this page’s address from your browser.');
    }
  };

  return (
    <div className="shark-hack-page">
      <Navbar />
      <main>
        <nav aria-label="Shark Hack sections" className="shark-section-nav">
          <div className="shark-content-width shark-section-nav-inner">
            {sectionLinks.map(([id, label], index) => (
              <a key={id} href={'#' + id} aria-current={activeSection === id ? 'location' : undefined} className={'shark-section-link' + focusStyle}><span aria-hidden="true">{String(index).padStart(2, '0')}</span>{label}</a>
            ))}
            <a href="#register" aria-current={activeSection === 'register' ? 'location' : undefined} className={'shark-section-register' + focusStyle}>Registration <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </nav>

        <section id="overview" aria-labelledby="shark-hack-title" className="shark-hero">
          <div className="shark-hero-atmosphere" aria-hidden="true">
            <img src="/images/shark-hack-banner.jpg" alt="" width="1600" height="639" fetchPriority="high" className="shark-hero-art" />
          </div>
          <div className="shark-content-width">
            <div className="shark-hero-topline">
              <Link to="/events" className={'shark-back-link' + focusStyle}><ArrowUpRight className="shark-back-icon" aria-hidden="true" /> All events</Link>
              <span className="shark-edition">IMPULSE / 2026</span>
            </div>
            <div className="shark-hero-content">
              <p className="shark-hero-eyebrow"><span aria-hidden="true" /> Impulse presents · All-India hackathon</p>
              <h1 id="shark-hack-title" className="shark-hero-title">SHARK <span>HACK</span></h1>
              <p className="shark-hero-tagline">Don’t just build. <span>Make them believe.</span></p>
              <p className="shark-hero-description">Build a solution to a surprise problem. Earn your place in the Delhi final, then pitch, demonstrate and negotiate its value with the Sharks.</p>
              <div className="shark-hero-actions">
                <a href="#register" className={'shark-primary-button' + focusStyle}><span>Registration details</span><span className="shark-button-arrow"><ArrowUpRight aria-hidden="true" /></span></a>
                <a href="#timeline" className={'shark-secondary-button' + focusStyle}><span><small>Your journey, step by step</small>Explore the timeline</span><span className="shark-button-arrow"><ArrowDown aria-hidden="true" /></span></a>
              </div>
              <p className="shark-hero-note"><CheckCircle2 aria-hidden="true" /> No PPT or solution needed at registration.</p>
              <div className="shark-hero-process" aria-label="Build, pitch, negotiate, close"><span><Code2 aria-hidden="true" />Build</span><ArrowRight aria-hidden="true" /><span><Mic2 aria-hidden="true" />Pitch</span><ArrowRight aria-hidden="true" /><span><Handshake aria-hidden="true" />Negotiate</span><ArrowRight aria-hidden="true" /><span><Flag aria-hidden="true" />Close</span></div>
            </div>
            <dl className="shark-event-facts">
              <div className="shark-fact-card">
                <dt><span className="shark-fact-icon"><Calendar aria-hidden="true" /></span> Proposed final date</dt>
                <dd><strong>30 or 31</strong><span className="shark-fact-unit">October 2026</span><span className="shark-fact-note"><Clock3 aria-hidden="true" /> One date to be confirmed</span></dd>
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
                <dt><span className="shark-fact-icon"><Trophy aria-hidden="true" /></span> Total prize pool</dt>
                <dd><strong>₹1,00,000+</strong><span className="shark-fact-unit">Prizes & recognition</span><span className="shark-fact-note">Dedicated Women-in-Tech prize</span></dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="timeline" aria-labelledby="timeline-title" className="shark-section shark-journey-section">
          <div className="shark-content-width">
            <div className="shark-section-heading">
              <div><p className="shark-eyebrow"><span>01</span> Your event timeline</p><h2 id="timeline-title">Your path to<br />the <em>Shark Room.</em></h2></div>
              <p className="shark-section-intro">Register, build, submit. Shortlisted teams take their solutions to the offline final in Delhi.</p>
            </div>
            <ol className="shark-journey">
              {timeline.map((step, index) => {
                const StepIcon = timelineIcons[index];
                return (
                  <li key={step.title} className={'shark-journey-step' + (index === timeline.length - 1 ? ' shark-journey-finale' : '')}>
                    <div className="shark-step-marker" aria-hidden="true"><StepIcon /></div>
                    <div className="shark-step-card">
                      <p className="shark-step-label">Stage {String(index + 1).padStart(2, '0')}<span>{index === timeline.length - 1 ? 'The offline final' : 'Road to the final'}</span></p>
                      <p className="shark-step-timing"><Clock3 aria-hidden="true" />{step.timing}</p>
                      <h3>{step.title}</h3><p className="shark-step-description">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="shark-schedule-note"><Clock3 aria-hidden="true" /><p><strong>The schedule is provisional.</strong> The final date depends on venue availability; problem-release and submission dates are still to be confirmed.</p></div>
          </div>
        </section>

        <section id="shark-room" aria-labelledby="shark-room-title" className="shark-section shark-room-section">
          <div className="shark-content-width">
            <div className="shark-section-heading">
              <div><p className="shark-eyebrow"><span>02</span> For shortlisted teams · Delhi</p><h2 id="shark-room-title">What happens in<br />the <em>Shark Room?</em></h2></div>
              <p className="shark-section-intro">Meet the judges, present your solution and defend its value. Explore each part of the offline final.</p>
            </div>
            <div className="shark-room-explorer">
              <div className="shark-room-choices" role="group" aria-label="Explore the Shark Room">
                {sharkRoom.map(({ label, icon: Icon }, index) => (
                  <button key={label} id={'room-choice-' + index} type="button" aria-pressed={roomStep === index} aria-controls="shark-room-detail" onClick={() => setRoomStep(index)} className={'shark-room-choice' + focusStyle}>
                    <span className="shark-colour-icon"><Icon aria-hidden="true" /></span><span>{label}</span><ArrowUpRight className="shark-room-choice-arrow" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div id="shark-room-detail" className="shark-room-detail" role="region" aria-labelledby={'room-choice-' + roomStep} aria-live="polite">
                <div className="shark-room-detail-copy"><p className="shark-room-kicker">Inside the offline final / {selectedRoomStep.label}</p><h3>{selectedRoomStep.title}</h3><p>{selectedRoomStep.description}</p><div className="shark-room-caption"><Sparkles aria-hidden="true" />{selectedRoomStep.caption}</div></div>
                <div className="shark-room-art" aria-hidden="true"><span className="shark-room-orbit" /><span className="shark-room-orbit" /><span className="shark-room-art-icon"><RoomIcon /></span><span className="shark-room-art-label">THE SHARK ROOM</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="prizes" aria-labelledby="prizes-title" className="shark-section shark-prizes-section">
          <div className="shark-content-width">
            <div className="shark-section-heading"><div><p className="shark-eyebrow"><span>03</span> Prizes & recognition</p><h2 id="prizes-title">Build something<br /><em>worth backing.</em></h2></div><div className="shark-section-symbol" aria-hidden="true"><Trophy /></div></div>
            <div className="shark-prize-grid">
              <div className="shark-prize-card shark-prize-card-main">
                <div className="shark-prize-top"><span className="shark-prize-icon"><Trophy aria-hidden="true" /></span><span>THE GRAND ROUND</span></div>
                <h3>Total prize pool</h3><p className="shark-prize-amount">₹1,00,000<span>+</span></p>
                <p className="shark-prize-description">Compete for the Shark Hack prize pool in the offline grand round.</p>
                <Trophy className="shark-prize-watermark" aria-hidden="true" />
              </div>
              <div className="shark-prize-card shark-prize-card-women">
                <div className="shark-prize-top"><span className="shark-prize-icon"><Users aria-hidden="true" /></span><span>DEDICATED RECOGNITION</span></div>
                <h3>Women-in-Tech<br /><span>Prize</span></h3>
                <p className="shark-prize-description">A dedicated prize for eligible all-women teams.</p>
                <p className="shark-prize-description">Organized by an all-women Impulse team, Shark Hack’s main competition remains open to eligible participants.</p>
                <Users className="shark-prize-watermark" aria-hidden="true" />
              </div>
            </div>
            <div className="shark-credit-note"><span><Coins aria-hidden="true" /></span><p><strong>About Impulse Credits.</strong> Judges use these competition credits to make offers on your solution’s value. They are not real money. The deal mechanics and their role in final rankings will be set out in the official rulebook.</p></div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="shark-section">
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

        <section id="register" aria-labelledby="registration-title" className="shark-section shark-registration-section">
          <div className="shark-content-width">
            <div className="shark-registration-ticket">
              <div className="shark-registration-copy">
                <p className="shark-eyebrow"><span>05</span> Registration</p>
                <h2 id="registration-title">Your team.<br /><em>Your next move.</em></h2>
                <p className="shark-section-intro">Bring together 2–4 participants. You’ll register through the official form; there’s no PPT or solution to submit at this stage.</p>
                <div className="shark-registration-status"><Clock3 aria-hidden="true" /><div><strong>Registration link to be announced</strong><p>Registration is not available on this page yet.</p></div></div>
              </div>
              <div className="shark-registration-prep">
                <span className="shark-prep-icon shark-colour-icon"><ClipboardList aria-hidden="true" /></span><h3>Have these details ready</h3>
                <ul>{registrationChecklist.map((item, index) => { const Icon = registrationIcons[index]; return (<li key={item}><span className="shark-colour-icon"><Icon aria-hidden="true" /></span>{item}</li>); })}</ul>
                <p>The official form may also request previous project experience or information needed for screening and logistics.</p>
                <button type="button" onClick={copyEventLink} className={'shark-share-button' + focusStyle}><Copy aria-hidden="true" /> Copy event link for your team</button>
                <p className="shark-copy-status" role="status">{copyStatus}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
