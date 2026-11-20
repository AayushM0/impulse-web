import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, CalendarDays, Clock3, MapPin, Trophy, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsMeshBackground from '@/components/EventsMeshBackground';
import { SectionKicker } from '@/components/ui';
import { useEventReveals } from '@/hooks/useEventReveals';
import './Events.css';

// Add announced events here; homepage demo events stay out of this listing.
// Shark Hack details follow the document and the user's confirmed updates.
const upcomingEvents = [
  {
    id: 'shark-hack',
    title: 'Shark Hack',
    category: 'All-India hackathon',
    description: 'Build a solution to a surprise problem. Shortlisted teams pitch to the Sharks in Delhi.',
    image: '/images/shark-hack-banner.jpg',
    imageAlt: 'A shark lit in electric blue and pink',
    date: '23 Jan 2027',
    dateTime: '2027-01-23',
    dateNote: 'Grand finale',
    location: 'Delhi',
    locationNote: 'Venue to be confirmed',
    team: '2–4 per team',
    rewards: '₹1 lakh+ prize pool (in-kind + cash)',
    registrationNote: 'Registration opens 1 Nov 2026 · Link to be announced',
    href: '/events/shark-hack',
  },
];

export default function Events() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  useEventReveals(pageRef);

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

  return (
    <div className="events-page" ref={pageRef}>
      <Navbar />
      <main className="relative overflow-x-clip">
        {/* Layer 1: Sticky Pinned Hero */}
        <header ref={heroLayerRef} className="events-intro sticky top-0 h-[100svh] min-h-[640px] z-0 overflow-hidden flex flex-col justify-center transition-opacity duration-300">
          <EventsMeshBackground paused={isScrolledPast} />
          <div ref={contentRef} className="events-hero-copy will-change-transform max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
            <div className="flex justify-center mb-4 hero-stagger-1">
              <SectionKicker label="DISCOVER · PARTICIPATE · BUILD" />
            </div>
            <h1 className="hero-stagger-2">Events at <span className="animate-gradient-flow">Impulse.</span></h1>
            <p className="events-hero-description hero-stagger-3">Explore our events and find your next challenge. New events will appear here as they’re announced.</p>
            <div className="flex justify-center mt-6 hero-stagger-4">
              <Link className="events-hero-feature hero-ambient-float group hover:border-[#60A5FA]/80 hover:shadow-[0_0_25px_rgba(96,165,250,0.25)] transition-all duration-300" to={upcomingEvents[0].href}>
                <span className="events-feature-label"><span className="animate-pulse" /> NEXT UP</span>
                <strong>{upcomingEvents[0].title}</strong>
                <span className="events-feature-date">{upcomingEvents[0].date} · {upcomingEvents[0].location}</span>
                <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Layer 2: Rising Obsidian Sheet with Peeking Top Rim */}
        <div className="relative z-10 -mt-14 sm:-mt-15 md:-mt-16 rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] bg-[#070B14] border-t border-[#2563EB]/40 shadow-[0_-12px_36px_-6px_rgba(37,99,235,0.15),0_-24px_50px_-12px_rgba(0,0,0,0.95)]">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 pt-5 sm:pt-6 md:pt-7">
            <SectionKicker label="01 · DIRECTORY" className="mb-2" />
          </div>
          <section id="upcoming-events" aria-labelledby="upcoming-events-title" className="events-directory">
            <div className="events-list-heading">
              <h2 id="upcoming-events-title">Upcoming events <span>{upcomingEvents.length}</span></h2>
              <p>Find the details. Make your next move.</p>
            </div>
            <div className="events-grid">
              {upcomingEvents.map((event) => (
                <article key={event.id} className="event-card" aria-labelledby={'event-title-' + event.id}>
                  <Link to={event.href} className="event-card-image" aria-label={'Explore ' + event.title}>
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      width={1600}
                      height={639}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="event-card-status"><Clock3 aria-hidden="true" /> Upcoming</span>
                    <span className="event-banner-preview" aria-hidden="true"><span><small>{event.date} · {event.location}</small><strong>Explore event</strong></span><ArrowUpRight /></span>
                  </Link>
                  <div className="event-card-body">
                    <div className="event-card-heading">
                      <p className="event-card-category">{event.category}</p>
                      <h3 id={'event-title-' + event.id}>{event.title}</h3>
                      <p className="event-card-description">{event.description}</p>
                    </div>
                    <dl className="event-card-facts">
                      <div className="event-card-date">
                        <dt><Calendar aria-hidden="true" /> Grand finale</dt>
                        <dd><time dateTime={event.dateTime}>{event.date}</time><span>{event.dateNote}</span></dd>
                      </div>
                      <div className="event-card-location">
                        <dt><MapPin aria-hidden="true" /> Offline final</dt>
                        <dd><strong>{event.location}</strong><span>{event.locationNote}</span></dd>
                      </div>
                    </dl>
                    <ul className="event-card-highlights" aria-label="Event highlights">
                      <li><Users aria-hidden="true" />{event.team}</li>
                      <li><Trophy aria-hidden="true" />{event.rewards}</li>
                    </ul>
                    <Link to={event.href} className="event-card-link" aria-label={'View ' + event.title + ' details'}>View event <ArrowUpRight aria-hidden="true" /></Link>
                    <p className="event-card-registration">{event.registrationNote}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="events-future-note">
              <span className="events-future-icon"><CalendarDays aria-hidden="true" /></span>
              <div><h3>More events, one place.</h3><p>Future Impulse events will join this listing. Check back for new announcements.</p></div>
            </div>
          </section>
        </div>
      </main>
      <div className="relative z-10 bg-[#070B14]">
        <Footer />
      </div>
    </div>
  );
}
