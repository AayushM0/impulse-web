import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Coins,
  ArrowRight,
  Shield,
  Zap,
  Flame,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Target,
  MessageSquare,
  HelpCircle,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';

// Categories tested in Shark Hack
const testedDimensions = [
  {
    tag: '01 / TECH',
    title: 'Can you actually build?',
    desc: 'Functional code, robust architectures, real data pipes, or physical prototypes. No vaporware.',
    border: 'border-cyan-500/40',
    color: 'text-cyan-400',
  },
  {
    tag: '02 / PROBLEM',
    title: 'Did you understand it deeply?',
    desc: 'Not surface symptoms, but real systemic bottlenecks. Who bleeds from this friction every single day?',
    border: 'border-violet-500/40',
    color: 'text-violet-400',
  },
  {
    tag: '03 / PRODUCT',
    title: 'Does it genuinely solve the pain?',
    desc: 'UX that respects time. Intuitive workflows, seamless user journeys, and tangible product velocity.',
    border: 'border-pink-500/40',
    color: 'text-pink-400',
  },
  {
    tag: '04 / INNOVATION',
    title: 'What makes your approach non-obvious?',
    desc: 'Why did nobody do this before? What technological breakthrough or counter-intuitive insight did you tap?',
    border: 'border-cyan-500/40',
    color: 'text-cyan-400',
  },
  {
    tag: '05 / USP',
    title: 'Why should someone choose your solution?',
    desc: 'Clear, defensible differentiation. When Sharks ask "Why you over the giants?", you need an undeniable answer.',
    border: 'border-amber-500/40',
    color: 'text-amber-400',
  },
  {
    tag: '06 / COMMUNICATION',
    title: 'Can you make them care in 60s?',
    desc: 'Crystal-clear articulation. If you cannot explain the value simply, nobody will listen to your code.',
    border: 'border-emerald-500/40',
    color: 'text-emerald-400',
  },
  {
    tag: '07 / BUSINESS',
    title: 'Why does the solution matter economically?',
    desc: 'Distribution, scalability, cost-to-serve, and value-capture. Showing why backing you is a winning bet.',
    border: 'border-violet-500/40',
    color: 'text-violet-400',
  },
  {
    tag: '08 / NEGOTIATION',
    title: 'Can you defend your value under pressure?',
    desc: 'When the Sharks push back and make lowball credit bids, will you fold or prove why you are worth more?',
    border: 'border-pink-500/40',
    color: 'text-pink-400',
  },
];

// The 10 Submission Pillars
const submissionPillars = [
  { num: '01', title: 'The Problem', prompt: 'What exact bottleneck or friction are you solving?' },
  { num: '02', title: 'The User', prompt: 'Who suffers from this problem and needs this immediately?' },
  { num: '03', title: 'Your Solution', prompt: 'What concrete product or system have you engineered?' },
  { num: '04', title: 'How It Works', prompt: 'The end-to-end mechanism, data pipeline, and workflow.' },
  { num: '05', title: 'The Prototype', prompt: 'What working artifact can the Sharks test and inspect live?' },
  { num: '06', title: 'Innovation', prompt: 'What makes your design novel, counter-intuitive, or defensible?' },
  { num: '07', title: 'The USP', prompt: 'Why should someone choose this over existing alternatives?' },
  { num: '08', title: 'Impact', prompt: 'What tangible transformation occurs if this solution scales?' },
  { num: '09', title: 'Feasibility', prompt: 'Can this realistically run, scale, and withstand real-world loads?' },
  { num: '10', title: 'Future Scale', prompt: 'Where could this go beyond the 48-hour hackathon arena?' },
];

// Timeline stages
const timelineStages = [
  {
    stage: '01',
    phase: 'REGISTRATIONS OPEN',
    date: 'NOW LIVE — FREE ENTRY',
    badge: 'STAGE 01',
    status: 'ACTIVE',
    headline: 'Assemble Your Squad',
    desc: 'Teams of 2–4 builders register through the portal. No preliminary PPT or project required at this stage. Keep it accessible and assemble diverse skillsets: engineering, product, and storytelling.',
    action: 'Register Squad Below',
  },
  {
    stage: '02',
    phase: 'THE PROBLEM DROP',
    date: '20 OCTOBER 2026 · 10:00 AM IST',
    badge: 'STAGE 02',
    status: 'UPCOMING',
    headline: 'The Clock Starts. Surprise Statement Drops.',
    desc: 'The official problem statement is dropped nationwide simultaneously. Until this moment, no team knows what they will build. The building begins instantly.',
    action: 'Problem Released Online',
  },
  {
    stage: '03',
    phase: '48H BUILD & SUBMIT',
    date: '20 – 22 OCTOBER 2026',
    badge: 'STAGE 03',
    status: 'UPCOMING',
    headline: 'Build Prototype & Document 10 Pillars',
    desc: 'Teams sprint for 48 hours to build a working prototype or MVP, compile their presentation addressing the 10 core dimensions, and upload repository links before the buzzer.',
    action: 'Submission Portal Closes',
  },
  {
    stage: '04',
    phase: 'SHORTLIST ANNOUNCEMENT',
    date: '25 OCTOBER 2026',
    badge: 'STAGE 04',
    status: 'UPCOMING',
    headline: 'Not Every Team Enters The Shark Room',
    desc: 'Impulse technical jury and screening panel evaluate all submissions against locked rubrics. The most impressive builder teams are invited to Delhi for the grand offline clash.',
    action: 'Finalists Notified',
  },
  {
    stage: '05',
    phase: 'OFFLINE GRAND FINALE',
    date: '30 - 31 OCTOBER 2026 · DELHI',
    badge: 'STAGE 05',
    status: 'THE CLIMAX',
    headline: 'Welcome to the Shark Room',
    desc: 'Shortlisted teams gather in Delhi for high-stakes pitching, live prototype inspection, ruthless Shark grilling, Impulse Credit bidding wars, counteroffers, and live deals on stage!',
    action: '₹1,00,000+ Deals Closed',
  },
];

// FAQs
const faqs = [
  {
    q: 'What is the team size and eligibility?',
    a: 'Teams must consist of 2 to 4 members. Anyone currently enrolled in college/university or early-career builders passionate about tech, AI, systems, and product development across India is eligible to apply.',
  },
  {
    q: 'Do we need a completed project or PPT during registration?',
    a: 'No! Registration is completely open and simple. You do NOT submit any PPT or solution during initial registration. The surprise problem statement is revealed on 20 October, which is when building officially begins.',
  },
  {
    q: 'What are Impulse Credits and how does the Shark Room work?',
    a: 'Instead of dry rubric scores, the final round in Delhi operates as an interactive deal room. Each judge is a "Shark" equipped with Impulse Credits. Sharks offer credits to back your prototype, and teams must defend their valuation, accept, counteroffer, or negotiate live on stage.',
  },
  {
    q: 'What is the Women-in-Tech Prize?',
    a: 'Shark Hack is organized by an all-women Impulse leadership core. While the hackathon is open to builders everywhere, we feature a dedicated Women-in-Tech Prize (₹15,000+ Cash + special mentorship) exclusively for eligible all-women builder teams.',
  },
  {
    q: 'What happens during the Offline Grand Round in Delhi?',
    a: 'Finalist teams present their solution on the main stage. You demonstrate your live working prototype, explain your defensible USP, field grueling questions from industry Sharks, negotiate for Impulse Credits, and close deals in front of a live audience.',
  },
  {
    q: 'How does Impulse Credit negotiation translate into cash prizes?',
    a: 'Impulse Credits represent the conviction and valuation placed by the Sharks on your solution. Final deals along with technical jury rubrics dictate the distribution of the ₹1,00,000+ prize pool, investment grant tracks, and cloud credits.',
  },
];

export default function SharkHack() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [askCredits, setAskCredits] = useState<number>(15000);
  const [pitchPower, setPitchPower] = useState<'solid' | 'flawless' | 'legendary'>('flawless');
  const [prototypeQuality, setPrototypeQuality] = useState<'working_mvp' | 'deep_tech' | 'production_ready'>('deep_tech');
  const [hasUspDefense, setHasUspDefense] = useState<boolean>(true);

  // Registration Form State
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    institution: '',
    teamSize: '3',
    track: 'AI Agents & Autonomous Systems',
    allWomenTeam: false,
    githubUrl: '',
  });

  // Calculate simulated shark reactions
  const calculateSharkValuation = () => {
    let multiplier = 0.8;
    if (pitchPower === 'flawless') multiplier += 0.25;
    if (pitchPower === 'legendary') multiplier += 0.55;
    if (prototypeQuality === 'deep_tech') multiplier += 0.35;
    if (prototypeQuality === 'production_ready') multiplier += 0.65;
    if (hasUspDefense) multiplier += 0.3;

    const offerCredits = Math.round(askCredits * multiplier);
    return {
      offerCredits,
      sharkVerdict:
        offerCredits >= askCredits
          ? 'DEAL ACCEPTED — THE SHARKS ARE IN!'
          : offerCredits >= askCredits * 0.75
          ? 'COUNTEROFFER OPPORTUNITY — DEFEND YOUR VALUATION'
          : 'THE SHARKS ARE CHALLENGING YOUR MOAT',
      sharkComment:
        offerCredits >= askCredits
          ? '“Your prototype is undeniable and your USP holds up under fire. We are putting full credits behind this!”'
          : offerCredits >= askCredits * 0.75
          ? '“We love the architecture, but customer switching friction is real. Show us why you deserve the full ask.”'
          : '“Code alone is not enough. Why won’t Google or a well-funded seed startup wipe this out in 3 months?”',
    };
  };

  const simResult = calculateSharkValuation();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#050610] min-h-screen text-slate-100 overflow-x-clip selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      {/* Floating Section Jump Ribbon */}
      <div className="sticky top-16 z-40 bg-[#050610]/90 backdrop-blur-md border-b border-cyan-900/30 py-2.5 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between text-xs font-mono-label">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">SHARK HACK 2026 // LIVE PORTAL</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#overview" className="hover:text-cyan-300 transition-colors">Overview</a>
            <a href="#why-shark-hack" className="hover:text-cyan-300 transition-colors">The Big Idea</a>
            <a href="#four-phases" className="hover:text-cyan-300 transition-colors">4-Phase Model</a>
            <a href="#simulator" className="hover:text-amber-300 transition-colors text-amber-400/90 font-semibold">Deal Simulator</a>
            <a href="#timeline" className="hover:text-cyan-300 transition-colors">Timeline</a>
            <a href="#pillars" className="hover:text-cyan-300 transition-colors">10 Pillars</a>
            <a href="#women-in-tech" className="hover:text-pink-300 transition-colors text-pink-400/90 font-semibold">Women in Tech</a>
            <a href="#faq" className="hover:text-cyan-300 transition-colors">Rules & FAQ</a>
            <a
              href="#register"
              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full hover:bg-cyan-500/30 hover:border-cyan-300 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              Register Team ↓
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section id="overview" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden impulse-bg-gradient">
          <ImpulseField
            density="medium"
            showParticles={true}
            showOrbital={true}
            centralImpulse={true}
            interactive={true}
            accentColor="blue"
            className="opacity-45"
          />

          {/* Bioluminescent Deep Sea Glow Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1000px] h-[500px] bg-gradient-to-r from-cyan-600/20 via-violet-600/20 to-pink-600/20 blur-[130px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
            {/* Top Announcement Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono-label text-[11px] tracking-widest px-3 py-1 bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                IMPULSE PRESENTS · ALL-INDIA FLAGSHIP HACKATHON
              </span>
              <span className="font-mono-label text-[11px] text-slate-400 border border-slate-800 bg-slate-900/60 px-3 py-1 rounded-full">
                30 - 31 OCTOBER 2026 · DELHI
              </span>
              <span className="font-mono-label text-[11px] text-amber-300 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" />
                ₹1,00,000+ PRIZE POOL
              </span>
            </div>

            {/* Main Headline */}
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-extrabold tracking-tight leading-[0.95] text-white">
                DON’T JUST BUILD.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                  MAKE THEM BELIEVE.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300/90 max-w-2xl font-normal leading-relaxed">
                An All-India Hackathon where technical execution meets pitching, product thinking, and live negotiation inside the Shark Room.
              </p>
            </div>

            {/* Featured Official Banner Showcase Card */}
            <div className="mt-12 relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] group">
              <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/shark-hack-banner.jpg"
                  alt="Shark Hack Official Banner - Impulse Ideas in Motion"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050610] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050610]/70 via-transparent to-[#050610]/70" />

                {/* Banner Overlay Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-mono-label text-xs text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      OFFICIAL HACKATHON ARENA
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-medium">
                      Code · Create · Make an Impact — Compete in Delhi for ₹1,00,000+ Deals
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#register"
                      className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono-label text-xs uppercase font-semibold rounded hover:brightness-110 transition shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    >
                      Enter The Arena
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Ribbon (5 Metric Bento Cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 font-mono-label text-[11px] mb-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  PRIZE POOL
                </div>
                <div className="text-2xl font-bold font-sans text-amber-300">₹1,00,000+</div>
                <div className="text-xs text-slate-400 mt-1">Cash, Grants & Cloud Credits</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 font-mono-label text-[11px] mb-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  FINALS DATE
                </div>
                <div className="text-2xl font-bold font-sans text-cyan-300">30–31 OCT</div>
                <div className="text-xs text-slate-400 mt-1">Offline Grand Round · Delhi</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 font-mono-label text-[11px] mb-2">
                  <Coins className="w-4 h-4 text-violet-400" />
                  CURRENCY
                </div>
                <div className="text-2xl font-bold font-sans text-violet-300">Impulse Credits</div>
                <div className="text-xs text-slate-400 mt-1">Live Shark Deal Valuation</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 font-mono-label text-[11px] mb-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  TEAM SIZE
                </div>
                <div className="text-2xl font-bold font-sans text-emerald-300">2–4 Builders</div>
                <div className="text-xs text-slate-400 mt-1">Interdisciplinary Squads</div>
              </div>

              <div className="col-span-2 lg:col-span-1 p-5 rounded-xl bg-pink-950/20 border border-pink-500/30 hover:border-pink-500/60 transition-colors">
                <div className="flex items-center gap-2 text-pink-400 font-mono-label text-[11px] mb-2">
                  <Award className="w-4 h-4 text-pink-400" />
                  DEDICATED AWARD
                </div>
                <div className="text-2xl font-bold font-sans text-pink-300">Women In Tech</div>
                <div className="text-xs text-pink-200/70 mt-1">₹15,000+ Exclusive Prize</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE BIG IDEA & WHY SHARK HACK? */}
        <section id="why-shark-hack" className="py-20 lg:py-28 border-t border-slate-800/80 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 font-mono-label text-cyan-400 text-xs mb-3">
                <span className="w-6 h-px bg-cyan-400/50" />
                <span>01 — THE BIG IDEA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                Most hackathons only test if you can code.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  SHARK HACK asks a bigger question.
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Can you build something genuinely valuable — and then make the room believe it is worth backing?
                Because in the real world, a technically brilliant product still needs people who can explain it, defend it, sell it, and close the deal.
              </p>
            </div>

            {/* Contrast Grid: Normal Hackathon vs Shark Hack */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Normal Hackathon Card */}
              <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative">
                <span className="font-mono-label text-xs text-slate-500 uppercase tracking-wider block mb-4">
                  THE CONVENTIONAL FORMULA
                </span>
                <h3 className="text-2xl font-sans font-bold text-slate-300 mb-6">Standard College Hackathon</h3>
                <div className="flex flex-col gap-3 font-mono-label text-xs text-slate-400 mb-8">
                  <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded">01. Problem Assigned</div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded">02. 48 Hours Coding</div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded">03. 3-Minute Slide Pitch</div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded">04. Judges Fill Scorecard (87/100)</div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded">05. Trophies Handed Out & Project Dies</div>
                </div>
                <p className="text-xs text-slate-500 border-t border-slate-800/80 pt-4">
                  Result: Endless half-finished hackathon repos that nobody ever uses or invests in.
                </p>
              </div>

              {/* Shark Hack Formula Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-950/20 via-slate-900/60 to-purple-950/20 border border-cyan-500/40 relative shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono-label text-[10px] rounded-full uppercase tracking-wider">
                  THE SHARK HACK REVOLUTION
                </div>
                <span className="font-mono-label text-xs text-cyan-400 uppercase tracking-wider block mb-4">
                  THE LIVE DEAL ROOM EXPERIENCE
                </span>
                <h3 className="text-2xl font-sans font-bold text-white mb-6">Shark Hack 2026</h3>
                <div className="flex flex-col gap-3 font-mono-label text-xs mb-8">
                  <div className="p-3 bg-cyan-950/40 border border-cyan-700/50 text-cyan-200 rounded">
                    01. Surprise Problem Statement Drops (The Clock Starts)
                  </div>
                  <div className="p-3 bg-cyan-950/40 border border-cyan-700/50 text-cyan-200 rounded">
                    02. 48h MVP & 10-Pillar Documentation Sprint
                  </div>
                  <div className="p-3 bg-cyan-950/40 border border-cyan-700/50 text-cyan-200 rounded">
                    03. All-India Shortlist & Call to Offline Delhi Arena
                  </div>
                  <div className="p-3 bg-violet-950/50 border border-violet-700/50 text-violet-200 rounded">
                    04. Enter The Shark Room: Live Demo + Tough Q&A
                  </div>
                  <div className="p-3 bg-pink-950/50 border border-pink-700/50 text-pink-200 rounded">
                    05. Sharks Bid Impulse Credits → Counteroffers → Deal Closed!
                  </div>
                </div>
                <p className="text-xs text-cyan-300/80 border-t border-cyan-900/50 pt-4">
                  Result: Battle-tested founders who know how to engineer, pitch, negotiate, and defend product value.
                </p>
              </div>
            </div>

            {/* The 8 Dimensions Tested */}
            <div className="mt-16">
              <div className="flex items-center gap-2 font-mono-label text-cyan-400 text-xs mb-3">
                <span className="w-6 h-px bg-cyan-400/50" />
                <span>WHAT THE SHARKS LOOK FOR</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white mb-10">
                The 8 Tested Dimensions of a Winning Build
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {testedDimensions.map((dim) => (
                  <div
                    key={dim.tag}
                    className={`p-6 rounded-xl bg-slate-900/40 border ${dim.border} hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <span className={`font-mono-label text-[11px] font-bold ${dim.color} block mb-2`}>
                        {dim.tag}
                      </span>
                      <h4 className="text-lg font-sans font-bold text-white mb-3">{dim.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{dim.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 4-PHASE MODEL */}
        <section id="four-phases" className="py-20 lg:py-28 border-t border-slate-800/80 bg-slate-950/50 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono-label text-xs text-cyan-400 tracking-widest uppercase">
                THE BATTLE ARENA
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                The 4-Phase Model
              </h2>
              <p className="text-slate-400 mt-4 text-base">
                From a blank canvas to a signed handshake on the Delhi deal room stage.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Phase 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/30 relative flex flex-col justify-between group hover:border-cyan-400 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono-label font-bold text-lg mb-6">
                    01
                  </div>
                  <span className="font-mono-label text-xs text-cyan-400 tracking-wider">PHASE 01</span>
                  <h3 className="text-2xl font-bold font-sans text-white mt-1 mb-3">BUILD</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Turn the surprise problem statement into a functioning MVP under pressure. Write clean code, engineer resilient data pathways, and eliminate vaporware.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono-label text-slate-500">
                  DELIVERABLE: Working Prototype + Code Repo
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-violet-500/30 relative flex flex-col justify-between group hover:border-violet-400 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-mono-label font-bold text-lg mb-6">
                    02
                  </div>
                  <span className="font-mono-label text-xs text-violet-400 tracking-wider">PHASE 02</span>
                  <h3 className="text-2xl font-bold font-sans text-white mt-1 mb-3">PITCH</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Take the stage. Make the room understand the friction, demo the mechanism, highlight your moat, and state your ask clearly to the panel.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono-label text-slate-500">
                  DELIVERABLE: 5-Minute Stage Demo & Story
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-pink-500/30 relative flex flex-col justify-between group hover:border-pink-400 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-mono-label font-bold text-lg mb-6">
                    03
                  </div>
                  <span className="font-mono-label text-xs text-pink-400 tracking-wider">PHASE 03</span>
                  <h3 className="text-2xl font-bold font-sans text-white mt-1 mb-3">NEGOTIATE</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    The Sharks counter. They test your defensibility: “Why won’t this get copied? Who actually pays for this?” Stand your ground and defend your valuation.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono-label text-slate-500">
                  DELIVERABLE: Live Shark Q&A Defense
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-amber-500/30 relative flex flex-col justify-between group hover:border-amber-400 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono-label font-bold text-lg mb-6">
                    04
                  </div>
                  <span className="font-mono-label text-xs text-amber-400 tracking-wider">PHASE 04</span>
                  <h3 className="text-2xl font-bold font-sans text-white mt-1 mb-3">CLOSE</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Counteroffer or accept. Secure maximum Impulse Credits from the Sharks, lock in the partnership, and close the deal on stage.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono-label text-slate-500">
                  DELIVERABLE: Sealed Deal & Prize Allocation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SHARK ROOM & IMPULSE CREDITS SIMULATOR */}
        <section id="simulator" className="py-20 lg:py-28 border-t border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 font-mono-label text-amber-400 text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mb-3">
                <Coins className="w-3.5 h-3.5" />
                INTERACTIVE EXPERIENCE // SHARK ROOM ENGINE
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                Simulate Your Shark Deal
              </h2>
              <p className="text-slate-300 mt-4 text-base sm:text-lg">
                Impulse Credits are the lifeblood of Shark Hack. Test your valuation ask, tune your pitch fidelity, and see how the Sharks react in real-time.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-6 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                <div>
                  <label className="flex items-center justify-between font-mono-label text-xs text-slate-300 mb-2">
                    <span>YOUR VALUATION ASK IN IMPULSE CREDITS:</span>
                    <span className="text-amber-400 font-bold text-sm">{askCredits.toLocaleString()} CREDITS</span>
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="2500"
                    value={askCredits}
                    onChange={(e) => setAskCredits(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono-label text-slate-500 mt-1">
                    <span>5,000 Credits</span>
                    <span>25,000 Credits</span>
                    <span>50,000 Credits</span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-label text-xs text-slate-300 mb-2">
                    PROTOTYPE COMPLETENESS:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono-label">
                    <button
                      type="button"
                      onClick={() => setPrototypeQuality('working_mvp')}
                      className={`p-3 rounded border transition-all ${
                        prototypeQuality === 'working_mvp'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Working MVP
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrototypeQuality('deep_tech')}
                      className={`p-3 rounded border transition-all ${
                        prototypeQuality === 'deep_tech'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Deep Tech
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrototypeQuality('production_ready')}
                      className={`p-3 rounded border transition-all ${
                        prototypeQuality === 'production_ready'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Production Ready
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-label text-xs text-slate-300 mb-2">
                    PITCH & STORYTELLING POWER:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono-label">
                    <button
                      type="button"
                      onClick={() => setPitchPower('solid')}
                      className={`p-3 rounded border transition-all ${
                        pitchPower === 'solid'
                          ? 'border-violet-400 bg-violet-950/40 text-violet-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Solid
                    </button>
                    <button
                      type="button"
                      onClick={() => setPitchPower('flawless')}
                      className={`p-3 rounded border transition-all ${
                        pitchPower === 'flawless'
                          ? 'border-violet-400 bg-violet-950/40 text-violet-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Flawless
                    </button>
                    <button
                      type="button"
                      onClick={() => setPitchPower('legendary')}
                      className={`p-3 rounded border transition-all ${
                        pitchPower === 'legendary'
                          ? 'border-violet-400 bg-violet-950/40 text-violet-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Electric
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 rounded border border-slate-800 bg-slate-950/60 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasUspDefense}
                      onChange={(e) => setHasUspDefense(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-white block">Defensible USP Defense Ready</span>
                      <span className="text-slate-400 text-[11px]">Ready to answer "Why you over existing big-tech alternatives?"</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Shark Reaction Floor */}
              <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.15)] flex flex-col justify-between min-h-[420px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <span className="font-mono-label text-xs text-cyan-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE SHARK ROOM FEEDBACK
                    </span>
                    <span className="font-mono-label text-xs text-amber-300 font-bold">
                      OFFER: {simResult.offerCredits.toLocaleString()} CREDITS
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="font-mono-label text-[10px] text-slate-500 tracking-wider block mb-1">
                      VERDICT:
                    </span>
                    <div className="text-xl font-bold font-sans text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-400" />
                      {simResult.sharkVerdict}
                    </div>
                  </div>

                  {/* Shark Quote Block */}
                  <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
                    <div className="text-xs font-mono-label text-slate-400 mb-2">SHARK BENCH DELIBERATION:</div>
                    <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
                      {simResult.sharkComment}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono-label text-slate-400">VALUATION SPREAD</div>
                    <div className="text-sm font-bold text-cyan-300">
                      {Math.round((simResult.offerCredits / askCredits) * 100)}% of Ask Secured
                    </div>
                  </div>
                  <a
                    href="#register"
                    className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono-label text-xs uppercase font-semibold rounded hover:brightness-110 transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Face Real Sharks In Delhi →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EVENT TIMELINE (THE ROAD TO DELHI) */}
        <section id="timeline" className="py-20 lg:py-28 border-t border-slate-800/80 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-16">
              <span className="font-mono-label text-xs text-cyan-400 tracking-widest uppercase">
                CHRONOLOGY & MILESTONES
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                The Journey to the Shark Room
              </h2>
              <p className="text-slate-300 mt-4 text-base sm:text-lg">
                Mark your calendar. Every phase is timed to test sprint speed, iteration, and stage readiness.
              </p>
            </div>

            <div className="space-y-6">
              {timelineStages.map((stage, idx) => (
                <div
                  key={stage.stage}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    stage.status === 'ACTIVE'
                      ? 'bg-cyan-950/20 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                      : stage.status === 'THE CLIMAX'
                      ? 'bg-gradient-to-r from-purple-950/30 to-pink-950/30 border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.15)]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono-label text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950/80 border border-cyan-800 rounded">
                          {stage.badge}
                        </span>
                        {stage.status === 'ACTIVE' && (
                          <span className="font-mono-label text-[10px] text-emerald-400 px-2 py-0.5 bg-emerald-950/80 border border-emerald-800 rounded-full animate-pulse">
                            ACTIVE NOW
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold font-sans text-white">{stage.phase}</div>
                      <div className="flex items-center gap-1.5 text-xs font-mono-label text-slate-400 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {stage.date}
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <h4 className="text-base font-bold text-slate-200 mb-1">{stage.headline}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{stage.desc}</p>
                    </div>

                    <div className="lg:col-span-3 flex lg:justify-end">
                      {stage.status === 'ACTIVE' ? (
                        <a
                          href="#register"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-slate-950 font-mono-label text-xs font-bold rounded hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                          {stage.action}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="font-mono-label text-xs text-slate-400 border border-slate-800 px-4 py-2 rounded bg-slate-950/50">
                          {stage.action}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: THE 10 SUBMISSION PILLARS */}
        <section id="pillars" className="py-20 lg:py-28 border-t border-slate-800/80 bg-slate-950/60 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-16">
              <span className="font-mono-label text-xs text-cyan-400 tracking-widest uppercase">
                BUILD · DOCUMENT · SUBMIT
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                The 10 Submission Pillars
              </h2>
              <p className="text-slate-300 mt-4 text-base sm:text-lg">
                When submissions open on 20 October, your team's deck and repository will be evaluated across these 10 locked dimensions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {submissionPillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono-label text-xs text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors block mb-2">
                      {pillar.num}
                    </span>
                    <h3 className="text-lg font-bold font-sans text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: WOMEN IN TECH SPOTLIGHT */}
        <section id="women-in-tech" className="py-20 lg:py-28 border-t border-slate-800/80 relative overflow-hidden bg-gradient-to-b from-pink-950/15 via-[#050610] to-[#050610]">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-pink-500/10 blur-[130px] pointer-events-none rounded-full" />
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="font-mono-label text-xs text-pink-400 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full">
                  WOMEN IN TECH // SPECIAL INITIATIVE
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-4 leading-tight">
                  Built by Women.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                    Open to builders everywhere.
                  </span>
                </h2>
                <p className="text-slate-300 mt-6 text-base sm:text-lg leading-relaxed">
                  SHARK HACK is proudly organized by an all-women Impulse leadership core. The event is intentionally designed not merely as a competition, but as an arena where women take the spotlight across technology, engineering architecture, product vision, pitching, and live deal negotiation.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/30">
                    <div className="text-pink-400 font-mono-label text-xs mb-1">DEDICATED CATEGORY</div>
                    <div className="text-xl font-bold text-white">🏆 Women-in-Tech Prize</div>
                    <div className="text-xs text-slate-400 mt-1">Exclusive ₹15,000+ cash reward and leadership mentorship for eligible all-women teams.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/30">
                    <div className="text-pink-400 font-mono-label text-xs mb-1">EQUAL ARENA</div>
                    <div className="text-xl font-bold text-white">Building & Pitching</div>
                    <div className="text-xs text-slate-400 mt-1">Creating a stage where women are building deep tech, answering tough questions, and leading negotiations.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-900/80 border border-pink-500/40 relative shadow-[0_0_35px_rgba(236,72,153,0.15)]">
                <h3 className="text-xl font-bold font-sans text-white mb-4">Core Principles of the Room</h3>
                <div className="space-y-4 font-mono-label text-xs">
                  <div className="flex items-center gap-3 p-3 bg-pink-950/20 border border-pink-900/40 rounded">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>01. BUILDING WITH TECHNICAL RIGOR</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-950/20 border border-pink-900/40 rounded">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>02. PITCHING WITH CONVICTION</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-950/20 border border-pink-900/40 rounded">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>03. NEGOTIATING WITHOUT BACKING DOWN</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-950/20 border border-pink-900/40 rounded">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>04. CLOSING DEALS ON MERIT & IMPACT</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                  All-women builder teams can check the designated box during team registration to be eligible for the dedicated prize pool.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: PRIZE POOL BREAKDOWN */}
        <section className="py-20 lg:py-28 border-t border-slate-800/80 bg-slate-950/40 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono-label text-xs text-amber-400 tracking-widest uppercase">
                STAKES & INCENTIVES
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                ₹1,00,000+ Prize Pool & Perks
              </h2>
              <p className="text-slate-400 mt-4 text-base">
                Real rewards for teams that can engineer under pressure and defend product value.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Grand Champions */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-amber-950/30 to-slate-900 border border-amber-500/50 relative shadow-[0_0_35px_rgba(245,158,11,0.2)]">
                <div className="font-mono-label text-xs text-amber-400 font-bold mb-2">01 / FIRST PLACE</div>
                <h3 className="text-2xl font-bold font-sans text-white mb-2">Grand Champions</h3>
                <div className="text-4xl font-extrabold text-amber-300 font-sans my-4">₹50,000</div>
                <ul className="space-y-2 text-xs text-slate-300 font-mono-label">
                  <li className="flex items-center gap-2">✓ Cash Prize + Grand Trophy</li>
                  <li className="flex items-center gap-2">✓ Impulse Seed Grant Consideration</li>
                  <li className="flex items-center gap-2">✓ $5,000+ Cloud Infrastructure Credits</li>
                  <li className="flex items-center gap-2">✓ 1-on-1 Pitch Mentorship with Tier-1 VCs</li>
                </ul>
              </div>

              {/* Runner Up */}
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700 relative">
                <div className="font-mono-label text-xs text-slate-400 font-bold mb-2">02 / SECOND PLACE</div>
                <h3 className="text-2xl font-bold font-sans text-white mb-2">First Runner-Up</h3>
                <div className="text-4xl font-extrabold text-slate-200 font-sans my-4">₹25,000</div>
                <ul className="space-y-2 text-xs text-slate-300 font-mono-label">
                  <li className="flex items-center gap-2">✓ Cash Prize + Silver Citation</li>
                  <li className="flex items-center gap-2">✓ Cloud Infrastructure Credits</li>
                  <li className="flex items-center gap-2">✓ Fast-track Entry into Impulse Cohort</li>
                </ul>
              </div>

              {/* Women-In-Tech & Citations */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-pink-950/30 to-slate-900 border border-pink-500/40 relative shadow-[0_0_25px_rgba(236,72,153,0.15)]">
                <div className="font-mono-label text-xs text-pink-400 font-bold mb-2">SPECIAL RECOGNITION</div>
                <h3 className="text-2xl font-bold font-sans text-white mb-2">Women-In-Tech Prize</h3>
                <div className="text-4xl font-extrabold text-pink-300 font-sans my-4">₹15,000+</div>
                <ul className="space-y-2 text-xs text-slate-300 font-mono-label">
                  <li className="flex items-center gap-2">✓ Cash Prize for All-Women Builder Squad</li>
                  <li className="flex items-center gap-2">✓ Dedicated Founder Sponsorship</li>
                  <li className="flex items-center gap-2">✓ Special Stage Citation at Delhi Finale</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: MASTER RULEBOOK & FAQ */}
        <section id="faq" className="py-20 lg:py-28 border-t border-slate-800/80 relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-3xl mb-16">
              <span className="font-mono-label text-xs text-cyan-400 tracking-widest uppercase">
                MASTER RULEBOOK & DIRECT ANSWERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-300 mt-4 text-base">
                Everything you need to know about team rules, problem releases, Impulse Credits, and the offline Delhi arena.
              </p>
            </div>

            <div className="max-w-3xl space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-slate-800 rounded-xl bg-slate-900/40 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 10: REGISTRATION FORM */}
        <section id="register" className="py-20 lg:py-28 border-t border-cyan-900/40 relative bg-gradient-to-b from-[#050610] via-cyan-950/20 to-[#050610]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="font-mono-label text-xs text-cyan-400 tracking-widest uppercase">
                OFFICIAL ENTRY PORTAL
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mt-3">
                Register Your Squad
              </h2>
              <p className="text-slate-300 mt-4 text-base">
                Simple, fast, and free. You do NOT need a project submission now. Lock your team’s spot before entries close.
              </p>
            </div>

            <div className="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-white">Squad Registered!</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Team <span className="text-cyan-300 font-bold">{formData.teamName || 'Builders'}</span> has been confirmed for Shark Hack 2026. Watch your inbox on 20 October when the problem statement drops.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-mono-label rounded hover:bg-slate-700"
                    >
                      Register Another Team
                    </button>
                    <a
                      href="https://discord.gg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-cyan-500 text-slate-950 text-xs font-mono-label font-bold rounded hover:bg-cyan-400"
                    >
                      Join Discord Channel
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-label text-slate-300 mb-1">
                      TEAM NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Neural Sharks, ByteForge"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-label text-slate-300 mb-1">
                        TEAM LEADER NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.leaderName}
                        onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-label text-slate-300 mb-1">
                        LEADER EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.leaderEmail}
                        onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-label text-slate-300 mb-1">
                        COLLEGE / INSTITUTION *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IIT Delhi, BITS, DTU"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-label text-slate-300 mb-1">
                        TEAM SIZE (2–4) *
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                      >
                        <option value="2">2 Members</option>
                        <option value="3">3 Members</option>
                        <option value="4">4 Members</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-label text-slate-300 mb-1">
                      PRIMARY DOMAIN
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded focus:border-cyan-400 focus:outline-none text-sm text-white"
                    >
                      <option value="AI Agents & Autonomous Systems">AI Agents & Autonomous Systems</option>
                      <option value="Systems, Cloud & Edge Infrastructure">Systems, Cloud & Edge Infrastructure</option>
                      <option value="Consumer Product & Next-Gen Web">Consumer Product & Next-Gen Web</option>
                      <option value="FinTech & Smart Deal Flows">FinTech & Smart Deal Flows</option>
                      <option value="Open Source & Developer Tooling">Open Source & Developer Tooling</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 p-3 rounded bg-pink-950/20 border border-pink-900/40 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allWomenTeam}
                        onChange={(e) => setFormData({ ...formData, allWomenTeam: e.target.checked })}
                        className="w-4 h-4 mt-0.5 rounded text-pink-500 bg-slate-900 border-slate-700"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-pink-300 block">Eligible All-Women Builder Team</span>
                        <span className="text-slate-400 text-[11px]">
                          Check this box to be considered for the dedicated ₹15,000+ Women-In-Tech Prize category.
                        </span>
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-mono-label text-xs uppercase font-bold tracking-wider rounded hover:brightness-110 transition shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    Confirm Registration & Enter Shark Hack →
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    No credit card or preliminary pitch deck needed. Problem statement drops on 20 October.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
