import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Calendar, Check, ChevronDown, Coins, MapPin, Trophy, Users } from 'lucide-react';
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

const submissionChecklist = [
  ['The problem', 'What exactly are you solving?'],
  ['The user', 'Who experiences this problem?'],
  ['Your solution', 'What have you built?'],
  ['How it works', 'What is the mechanism or product flow?'],
  ['The prototype', 'What can be seen, tested or demonstrated?'],
  ['Innovation', 'What is different about your approach?'],
  ['USP', 'Why does your solution stand out?'],
  ['Impact', 'What changes if your solution succeeds?'],
  ['Feasibility', 'Can this realistically be implemented?'],
  ['Future potential', 'Where could this go beyond the hackathon?'],
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
  ['submission', 'What to submit'],
  ['prizes', 'Prizes'],
  ['faq', 'FAQs'],
];

const focusStyle = ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#93c5fd]';

export default function SharkHack() {
  const { hash } = useLocation();

  // Handle incoming registration links after the app's route-level scroll reset.
  useEffect(() => {
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="shark-hack-page min-h-screen">
      <Navbar />
      <main>
        <section id="overview" aria-labelledby="shark-hack-title" className="shark-hero scroll-mt-36">
          <div className="shark-hero-atmosphere" aria-hidden="true">
            <img src="/images/shark-hack-banner.jpg" alt="" width="1600" height="639" fetchPriority="high" className="shark-hero-art" />
          </div>
          <div className="shark-hero-container">
            <div className="shark-hero-topline">
              <Link to="/events" className={'shark-back-link' + focusStyle}>
                <ArrowUpRight className="h-4 w-4 rotate-180" aria-hidden="true" /> All events
              </Link>
              <span className="shark-edition">IMPULSE / 2026</span>
            </div>

            <div className="shark-hero-content">
              <p className="shark-hero-eyebrow"><span aria-hidden="true" /> Impulse presents · All-India hackathon</p>
              <h1 id="shark-hack-title" className="shark-hero-title">
                <span>SHARK</span>{' '}<span className="shark-hero-title-accent">HACK</span>
              </h1>
              <p className="shark-hero-tagline">Don’t just build. <span>Make them believe.</span></p>
              <p className="shark-hero-description">
                Build a solution to a surprise problem. Earn your place in the Delhi final, then pitch, demonstrate and negotiate its value with the Sharks.
              </p>

              <div className="shark-hero-actions">
                <a href="#register" className={'shark-primary-button' + focusStyle}>
                  Registration details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#timeline" className={'shark-secondary-button' + focusStyle}>
                  Explore the timeline <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="shark-hero-note">No PPT or solution needed at registration.</p>

              <div className="shark-hero-process" aria-label="Build, pitch, negotiate, close">
                <span>Build</span><ArrowRight aria-hidden="true" />
                <span>Pitch</span><ArrowRight aria-hidden="true" />
                <span>Negotiate</span><ArrowRight aria-hidden="true" />
                <span>Close</span>
              </div>
            </div>

            <dl className="shark-event-facts">
              <div>
                <dt><Calendar aria-hidden="true" /> Proposed final date</dt>
                <dd>30 or 31 October 2026<span className="shark-date-note">One date to be confirmed</span></dd>
              </div>
              <div>
                <dt><MapPin aria-hidden="true" /> Location</dt>
                <dd>Delhi<span>Offline final · Venue to be confirmed</span></dd>
              </div>
              <div>
                <dt><Users aria-hidden="true" /> Team size</dt>
                <dd>2–4 participants<span>Per team</span></dd>
              </div>
              <div>
                <dt><Trophy aria-hidden="true" /> Prize pool</dt>
                <dd className="shark-prize-value">₹1,00,000+<span>Dedicated Women-in-Tech prize</span></dd>
              </div>
            </dl>
          </div>
        </section>

        <nav aria-label="Shark Hack sections" className="sticky top-16 z-30 border-b border-[#8d99be]/15 bg-[#06070b]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-6 py-4 lg:gap-8 lg:px-10">
            {sectionLinks.map(([id, label]) => (
              <a key={id} href={'#' + id} className={'shrink-0 rounded text-sm text-[#ced3e1] transition-colors hover:text-[#93c5fd]' + focusStyle}>{label}</a>
            ))}
            <a href="#register" className={'ml-auto inline-flex shrink-0 items-center gap-2 rounded text-sm font-medium text-[#93c5fd] hover:text-[#e2e7ff]' + focusStyle}>Registration <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </nav>

        <section id="timeline" aria-labelledby="timeline-title" className="scroll-mt-36 border-b border-[#8d99be]/15 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <p className="font-mono-label text-[#93c5fd]">Your event timeline</p>
              <h2 id="timeline-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From your first idea<br />to the Shark Room.</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-[#a2aabc]">Register, build, submit. Shortlisted teams take their solutions to the offline final in Delhi.</p>
              <div className="mt-7 max-w-sm rounded-xl border border-[#60a5fa]/15 bg-[#60a5fa]/5 p-5 text-sm leading-relaxed text-[#bfdbfe]/90">
                The schedule is provisional. The final date depends on venue availability; problem-release and submission dates are still to be confirmed.
              </div>
            </div>
            <ol>
              {timeline.map((step, index) => (
                <li key={step.title} className={'relative pl-16' + (index < timeline.length - 1 ? ' pb-9' : '')}>
                  {index < timeline.length - 1 && <div className="absolute bottom-0 left-5 top-11 w-px bg-gradient-to-b from-[#3b82f6]/30 to-white/10" aria-hidden="true" />}
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#60a5fa]/25 bg-[#3b82f6]/5 font-mono text-xs text-[#93c5fd]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-xs font-medium text-[#93c5fd]">{step.timing}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#f5f7ff]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a2aabc]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="submission" aria-labelledby="submission-title" className="scroll-mt-36 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-mono-label text-[#93c5fd]">After the problem is released</p>
                <h2 id="submission-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What you’ll need to submit.</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#a2aabc]">Your presentation and documentation should explain your solution across these ten points. The submission format and deadline are still to be confirmed.</p>
            </div>
            <div className="mt-8 rounded-xl border border-[#60a5fa]/20 bg-[#3b82f6]/5 px-5 py-4 text-sm text-[#dbeafe]">
              <span className="font-semibold">For later, not registration:</span> you do not need a PPT or solution to sign up.
            </div>
            <details className="group mt-5 rounded-2xl border border-[#8d99be]/15 bg-white/[0.02]">
              <summary className={'flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-6 text-base font-medium text-[#f5f7ff] [&::-webkit-details-marker]:hidden' + focusStyle}>
                View the submission checklist
                <ChevronDown className="h-5 w-5 shrink-0 text-[#93c5fd] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <ol className="grid gap-x-10 gap-y-6 border-t border-[#8d99be]/15 p-6 sm:grid-cols-2">
                {submissionChecklist.map(([title, description], index) => (
                  <li key={title} className="flex gap-4">
                    <span className="pt-0.5 font-mono text-xs text-[#93c5fd]/70" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3 className="text-sm font-medium text-[#f5f7ff]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#a2aabc]">{description}</p></div>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </section>

        <section id="prizes" aria-labelledby="prizes-title" className="shark-prizes-section scroll-mt-36 border-y border-[#8d99be]/15 bg-white/[0.02] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="font-mono-label text-[#93c5fd]">Prizes & recognition</p>
            <h2 id="prizes-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Build something worth backing.</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <div className="shark-prize-card-main rounded-2xl border p-7 sm:p-9">
                <Trophy className="h-7 w-7 text-[#93c5fd]" aria-hidden="true" />
                <h3 className="mt-6 text-sm font-medium text-[#bfdbfe]">Total prize pool</h3>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-[#f5f7ff] sm:text-5xl">₹1,00,000+</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#a2aabc]">Compete for the Shark Hack prize pool in the offline grand round.</p>
              </div>
              <div className="shark-prize-card-women rounded-2xl border p-7 sm:p-9">
                <Users className="h-7 w-7 text-[#f9a8d4]" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#f5f7ff]">Women-in-Tech Prize</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#ced3e1]">A dedicated prize for eligible all-women teams.</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#a2aabc]">Organized by an all-women Impulse team, Shark Hack’s main competition remains open to eligible participants.</p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4 rounded-xl border border-[#8d99be]/15 p-5 sm:p-6">
              <Coins className="mt-0.5 h-5 w-5 shrink-0 text-[#93c5fd]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[#a2aabc]"><span className="font-medium text-[#f5f7ff]">About Impulse Credits.</span> Judges use these competition credits to make offers on your solution’s value. They are not real money. The deal mechanics and their role in final rankings will be set out in the official rulebook.</p>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-36 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <p className="font-mono-label text-[#93c5fd]">Before you register</p>
              <h2 id="faq-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A few useful answers.</h2>
            </div>
            <div className="divide-y divide-white/10 border-y border-[#8d99be]/15">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group">
                  <summary className={'flex cursor-pointer list-none items-center justify-between gap-5 rounded py-6 text-base font-medium text-[#f5f7ff] [&::-webkit-details-marker]:hidden' + focusStyle}>
                    {question}<ChevronDown className="h-4 w-4 shrink-0 text-[#93c5fd] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                  </summary>
                  <p className="pb-6 pr-6 text-sm leading-relaxed text-[#a2aabc]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="register" aria-labelledby="registration-title" className="shark-registration-section scroll-mt-36 border-t border-[#60a5fa]/15 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <div>
              <p className="font-mono-label text-[#93c5fd]">Registration</p>
              <h2 id="registration-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Get your team ready.</h2>
              <p className="mt-5 max-w-md leading-relaxed text-[#ced3e1]">Bring together 2–4 participants. You’ll register through the official form; there’s no PPT or solution to submit at this stage.</p>
              <div className="mt-7 rounded-xl border border-[#60a5fa]/20 bg-[#3b82f6]/5 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#93c5fd]"><Calendar className="h-4 w-4 shrink-0" aria-hidden="true" /> Registration link to be announced</p>
                <p className="mt-2 text-sm leading-relaxed text-[#a2aabc]">Registration is not available on this page yet.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#8d99be]/15 bg-[#0d101a] p-7 sm:p-8">
              <h3 className="text-lg font-medium text-[#f5f7ff]">Have these details ready</h3>
              <ul className="mt-6 space-y-4">
                {registrationChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#ced3e1]"><Check className="h-5 w-5 shrink-0 text-[#93c5fd]" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[#8d99be]/15 pt-5 text-xs leading-relaxed text-[#a2aabc]">The official form may also request previous project experience or information needed for screening and logistics.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
