import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Calendar, CalendarDays, Clock3, MapPin, Trophy, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsMeshBackground from '@/components/EventsMeshBackground';
import { useEventsPageReveals } from '@/hooks/useEventsPageReveals';
import './Events.css';
import './EventsLayout.css';

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
  useEventsPageReveals(pageRef);
  return (
    <div className="events-page" ref={pageRef}>
      <Navbar />
      <main className="events-content">
        <header className="events-intro">
          <EventsMeshBackground />
          <div className="events-hero-copy">
            <p className="events-eyebrow"><span /> DISCOVER · PARTICIPATE · BUILD</p>
            <h1>Events at Impulse.</h1>
            <p className="events-hero-description">Explore our events and find your next challenge. New events will appear here as they’re announced.</p>
            <a className="events-explore-link" href="#upcoming-events">Explore events <ArrowDown aria-hidden="true" /></a>
            <Link className="events-hero-feature" to={upcomingEvents[0].href}>
              <span className="events-feature-label"><span /> NEXT UP</span>
              <strong>{upcomingEvents[0].title}</strong>
              <span className="events-feature-date">{upcomingEvents[0].date} · {upcomingEvents[0].location}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <a className="events-scroll-cue" href="#upcoming-events"><span className="events-scroll-line" aria-hidden="true" />Scroll to discover<ArrowDown aria-hidden="true" /></a>
        </header>
        <section id="upcoming-events" aria-labelledby="upcoming-events-title" className="events-directory">
          <div className="events-list-heading">
            <h2 id="upcoming-events-title">Upcoming events <span>{upcomingEvents.length}</span></h2>
            <p>Find the details. Make your next move.</p>
          </div>
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="event-card" aria-labelledby={'event-title-' + event.id}>
                <Link to={event.href} className="event-card-image" aria-label={'Explore ' + event.title}>
                  <img src={event.image} alt={event.imageAlt} />
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
      </main>
      <Footer />
    </div>
  );
}
