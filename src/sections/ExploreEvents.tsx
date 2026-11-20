import { SectionKicker } from '@/components/ui';
import SharkHackTicket from '@/components/SharkHackTicket';

export default function ExploreEvents() {
  return (
    <section id="events" className="relative pt-3.5 sm:pt-4 md:pt-5 pb-16 md:pb-24 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionKicker label="01 // COMPETITIONS" className="mb-7" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight">
              EVENTS & HACKATHONS
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base font-sans leading-relaxed">
            From 36-hour high-stakes hackathons to technical workshops and demo days.
          </p>
        </div>

        {/* Featured SharkHack Admit One Ticket Pass */}
        <SharkHackTicket />
      </div>
    </section>
  );
}
