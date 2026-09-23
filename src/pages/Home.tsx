import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Experiences from '@/sections/Experiences';
import Projects from '@/sections/Projects';
import Community from '@/sections/Community';
import ImpulseLoop from '@/sections/ImpulseLoop';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <div className="bg-space-950 min-h-screen text-impulse-white overflow-x-clip">
      <Navbar />
      <main>
        {/* Section 1: 3D Origin Hero (Centered IMPULSE with Logo Emerging from Behind) */}
        <Hero />

        {/* Section 2: Events in Motion (Interactive Horizontal Scroll) */}
        <Experiences />

        {/* Section 3: Projects Showcase ("Ideas that made it out") */}
        <Projects />

        {/* Section 4: Teams & Builder Constellation */}
        <Community />

        {/* Section 5: The Impulse Loop Flywheel */}
        <ImpulseLoop />

        {/* Section 6: Enter Impulse CTA */}
        <CTASection
          headline="Ready to build?"
          description="You don't need to know everything. You just need to be curious enough to start."
          buttonText="ENTER IMPULSE"
          buttonTo="/join"
          microcopy="CHAPTER ONE STARTS HERE."
        />
      </main>
      <Footer />
    </div>
  );
}
