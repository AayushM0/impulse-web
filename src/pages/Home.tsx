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
      <main>
        {/* Section 1: Lightweight Typography-Focused Hero */}
        <ExploreHero />

        {/* Section 2: Events & Flagship Competitions Showcase */}
        <ExploreEvents />

        {/* Section 3: Builder Cohort 5-Month Incubator */}
        <ExploreCohort />

        {/* Section 4: Impulse Builder Community & Ecosystem */}
        <ExploreCommunity />
      </main>
      <Footer />
    </div>
  );
}
