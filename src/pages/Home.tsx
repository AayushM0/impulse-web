import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExploreHero from '@/sections/ExploreHero';
import ExploreEvents from '@/sections/ExploreEvents';
import ExploreCohort from '@/sections/ExploreCohort';
import ExploreCommunity from '@/sections/ExploreCommunity';

export default function Home() {
  return (
    <div className="bg-space-950 min-h-screen text-impulse-white overflow-x-clip">
      <Navbar />
      <main className="relative">
        {/* Layer 1: Sticky Hero (pinned at top during initial scroll) */}
        <div className="sticky top-0 h-[100svh] min-h-[640px] z-0 overflow-hidden">
          <ExploreHero />
        </div>

        {/* Layer 2: Rising Obsidian Sheet with Peeking Top Rim */}
        <div className="relative z-10 -mt-[clamp(100px,13svh,136px)] rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] bg-[#070B14] border-t border-white/12 shadow-[0_-24px_50px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* Ambient glass rim specular reflection */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-[48px]"
            aria-hidden="true"
          />

          {/* Section 2: Events & Flagship Competitions Showcase */}
          <ExploreEvents />

          {/* Section 3: Builder Cohort 5-Month Incubator */}
          <ExploreCohort />

          {/* Section 4: Impulse Builder Community & Ecosystem */}
          <ExploreCommunity />
        </div>
      </main>
      <Footer />
    </div>
  );
}
