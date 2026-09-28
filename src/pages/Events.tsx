import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Trophy, Coins } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';
import CTASection from '@/components/CTASection';
import { events } from '@/data/content';

const categories = ['ALL', 'HACKATHONS', 'BUILD SPRINTS', 'AI LABS', 'DEMO NIGHTS', 'COMMUNITY'];

// Keep homepage demo events out of the Events page.
const publishedEvents = events.filter((event) => event.id === 'shark-hack-2026');

const statusColors: Record<string, string> = {
  'UPCOMING': 'text-impulse-blue-bright',
  'REGISTRATION OPEN': 'text-impulse-magenta',
  'SOON': 'text-impulse-coral',
  'TBA': 'text-impulse-gray-light/50',
};

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredEvents = activeCategory === 'ALL'
    ? publishedEvents
    : publishedEvents.filter((e) => e.type === activeCategory);

  const showSharkBanner = activeCategory === 'ALL' || activeCategory === 'HACKATHONS';

  return (
    <div className="bg-space-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden impulse-bg-gradient pt-20">
        <ImpulseField
          density="low"
          showParticles={true}
          showOrbital={true}
          centralImpulse={false}
          interactive={true}
          accentColor="blue"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/50 to-transparent" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full pb-16">
          <div className="flex items-center gap-3 font-mono-label text-impulse-blue-bright/70 mb-6">
            <span className="text-impulse-blue-bright/50">EVENTS</span>
            <span className="w-8 h-px bg-impulse-blue/30" />
            <span>EXPERIENCES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold tracking-tight leading-[0.95] text-impulse-white max-w-3xl">
            Experiences in<br />
            <span className="text-gradient-impulse">motion.</span>
          </h1>
          <p className="mt-6 text-lg text-impulse-gray-light/70 max-w-xl">
            Hackathons, build sprints, AI labs, demo nights and community experiences.
          </p>
        </div>
      </section>

      {/* Filters + Events */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono-label px-4 py-2.5 border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-impulse-blue/60 bg-impulse-blue/15 text-impulse-white'
                    : 'border-space-600 text-impulse-gray-light/60 hover:border-impulse-blue/40 hover:text-impulse-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Flagship Spotlight Banner (Shark Hack) */}
          {showSharkBanner && (
            <div className="mb-16 relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-purple-950/30 shadow-[0_0_35px_rgba(6,182,212,0.15)]">
              <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-label text-[10px] px-3 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-300 rounded-full font-bold">
                      FLAGSHIP ALL-INDIA EVENT
                    </span>
                    <span className="font-mono-label text-[10px] px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-full flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      ₹1,00,000+ PRIZE POOL
                    </span>
                    <span className="font-mono-label text-[10px] px-3 py-1 bg-pink-500/15 border border-pink-500/30 text-pink-300 rounded-full">
                      WOMEN-IN-TECH PRIZE
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                    🦈 SHARK HACK 2026
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Don’t just build. Make them believe. An All-India hackathon where technical execution meets pitching, product thinking, and live negotiation inside the Shark Room in Delhi.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-xs font-mono-label text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      30 - 31 OCT 2026
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      DELHI · OFFLINE GRAND ROUND
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Coins className="w-4 h-4 text-amber-400" />
                      IMPULSE CREDITS DEAL ROOM
                    </span>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to="/shark-hack"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono-label text-xs uppercase font-bold rounded hover:brightness-110 transition shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      Explore Shark Hack Page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/shark-hack#register"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-cyan-500/40 text-cyan-300 font-mono-label text-xs uppercase rounded hover:bg-cyan-500/10 transition"
                    >
                      Register Team (2–4 Builders)
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-cyan-500/30 aspect-[16/9] shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                  <img
                    src="/images/shark-hack-banner.jpg"
                    alt="Shark Hack 2026"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 font-mono-label text-[11px] text-cyan-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                    DELHI GRAND FINALE
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredEvents.length === 0 ? (
            <div className="relative border border-space-600 hover:border-impulse-blue/30 transition-colors duration-500 p-16 lg:p-24 text-center overflow-hidden">
              <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
              <div className="relative">
                <div className="inline-flex mb-8">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
                    <rect x="20" y="25" width="60" height="55" rx="4" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
                    <line x1="20" y1="40" x2="80" y2="40" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
                    <line x1="35" y1="18" x2="35" y2="30" stroke="#6366F1" strokeWidth="2" opacity="0.5" />
                    <line x1="65" y1="18" x2="65" y2="30" stroke="#6366F1" strokeWidth="2" opacity="0.5" />
                    <circle cx="50" cy="58" r="3" fill="#EC4899" opacity="0.6" />
                  </svg>
                </div>
                <p className="font-mono-label text-impulse-blue-bright/50 mb-4">
                  NO EVENTS SCHEDULED
                </p>
                <h2 className="text-2xl lg:text-4xl font-sans text-impulse-white mb-4">
                  The calendar is being assembled.
                </h2>
                <p className="text-sm lg:text-base text-impulse-gray-light/50 max-w-md mx-auto leading-relaxed">
                  Events will appear here as they are planned. Join the community to be the first to know.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-px bg-space-700/30">
              {filteredEvents.map((event) => {
                const RowContent = (
                  <div className="grid grid-cols-12 gap-4 lg:gap-8 px-6 lg:px-10 py-8 lg:py-10 items-center">
                    <div className="col-span-12 lg:col-span-2">
                      <div className="flex items-center gap-2 text-impulse-blue-bright/60">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono-label">{event.date}</span>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-2">
                      <span className="font-mono-label text-impulse-magenta/60">{event.type}</span>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                      <h3 className="text-xl lg:text-2xl font-sans font-medium text-impulse-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        {event.title}
                        {event.link && (
                          <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        )}
                      </h3>
                      <p className="mt-2 text-sm text-impulse-gray-light/50 leading-relaxed">{event.description}</p>
                    </div>
                    <div className="col-span-6 lg:col-span-2">
                      <div className="flex items-center gap-2 text-impulse-gray-light/50 text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </div>
                    </div>
                    <div className="col-span-6 lg:col-span-2 flex lg:justify-end items-center gap-3">
                      <span className={`font-mono-label ${statusColors[event.status] || 'text-impulse-gray-light/50'}`}>
                        {event.status}
                      </span>
                      {event.link && (
                        <span className="hidden lg:inline-flex text-xs font-mono-label text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 rounded">
                          DETAILS →
                        </span>
                      )}
                    </div>
                  </div>
                );

                if (event.link) {
                  return (
                    <Link
                      key={event.id}
                      to={event.link}
                      className="block group bg-space-950 hover:bg-space-900 transition-colors duration-500"
                    >
                      {RowContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={event.id}
                    className="group bg-space-950 hover:bg-space-900 transition-colors duration-500"
                  >
                    {RowContent}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection
        headline="Want to host an event?"
        description="If you have an idea for a build sprint, AI lab or community experience, bring it to Impulse."
        buttonText="JOIN THE COMMUNITY"
        buttonTo="/join"
      />

      <Footer />
    </div>
  );
}
