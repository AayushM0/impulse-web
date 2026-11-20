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
        <div className="relative z-10 -mt-12 sm:-mt-14 md:-mt-16 rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] bg-[#070B14] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.9)]">
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
