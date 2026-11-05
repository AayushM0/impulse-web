import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImpulseField from '@/components/ImpulseField';
import CTASection from '@/components/CTASection';
import { projects } from '@/data/content';

const filters = ['ALL', 'AI', 'PRODUCT', 'RESEARCH', 'OPEN SOURCE', 'EXPERIMENTAL'];

const statusColors: Record<string, string> = {
  'EXPERIMENT': 'text-impulse-blue-bright',
  'BUILDING': 'text-impulse-coral',
  'SHIPPED': 'text-impulse-magenta',
  'OPEN SOURCE': 'text-impulse-violet',
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-space-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden impulse-bg-gradient pt-20">
        <ImpulseField
          density="low"
          showParticles={true}
          showOrbital={true}
          centralImpulse={true}
          interactive={true}
          accentColor="magenta"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/50 to-transparent" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full pb-16">
          <div className="flex items-center gap-3 font-mono-label text-impulse-blue-bright/70 mb-6">
            <span className="text-impulse-blue-bright/50">PROJECTS</span>
            <span className="w-8 h-px bg-impulse-blue/30" />
            <span>BUILT HERE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold tracking-tight leading-[0.95] text-impulse-white max-w-3xl">
            Ideas that<br />
            made it <span className="text-gradient-impulse">out.</span>
          </h1>
          <p className="mt-6 text-lg text-impulse-gray-light/70 max-w-xl">
            Products, experiments, research and open-source tools built by the Impulse community.
          </p>
        </div>
      </section>

      {/* Filters + Projects */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-mono-label px-4 py-2.5 border transition-all duration-300 ${
                  activeFilter === filter
                    ? 'border-impulse-blue/60 bg-impulse-blue/15 text-impulse-white'
                    : 'border-space-600 text-impulse-gray-light/60 hover:border-impulse-blue/40 hover:text-impulse-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="relative border border-space-600 hover:border-impulse-blue/30 transition-colors duration-500 p-16 lg:p-24 text-center overflow-hidden">
              <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
              <div className="relative">
                <div className="inline-flex mb-8">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#3B82F6" strokeWidth="2" opacity="0.6" />
                    <line x1="22" y1="22" x2="78" y2="78" stroke="#6366F1" strokeWidth="1.5" opacity="0.4" />
                    <line x1="78" y1="22" x2="22" y2="78" stroke="#6366F1" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="50" cy="50" r="4" fill="#F8FAFC" />
                    <circle cx="50" cy="10" r="2" fill="#3B82F6" />
                    <circle cx="50" cy="90" r="2" fill="#3B82F6" />
                    <circle cx="10" cy="50" r="2" fill="#3B82F6" />
                    <circle cx="90" cy="50" r="2" fill="#3B82F6" />
                  </svg>
                </div>
                <p className="font-mono-label text-impulse-blue-bright/50 mb-4">
                  NO PROJECTS IN {activeFilter.toUpperCase()} YET
                </p>
                <h2 className="text-2xl lg:text-4xl font-sans text-impulse-white mb-4">
                  The first build starts here.
                </h2>
                <p className="text-sm lg:text-base text-impulse-gray-light/50 max-w-md mx-auto mb-10 leading-relaxed">
                  Be the first to build something in this category. Projects built by our community will appear here.
                </p>
                <Link
                  to="/join"
                  className="group inline-flex items-center gap-3 font-mono-label text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue/60 transition-all duration-300 px-8 py-4 energy-sweep"
                >
                  START BUILDING
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-space-700/30">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-space-950 p-8 hover:bg-space-900 transition-colors duration-500 group">
                  <div className="flex items-start justify-between mb-6">
                    <span className={`font-mono-label ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <span className="font-mono-label text-impulse-blue-bright/30">{project.category}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-sans font-medium text-impulse-white mb-3 group-hover:text-gradient-impulse transition-all">
                    {project.name}
                  </h3>
                  <p className="text-sm text-impulse-gray-light/60 leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.contributors.map((c) => (
                      <span key={c} className="font-mono-label text-[10px] text-impulse-gray-light/40 border border-space-600 px-2 py-1">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.github && (
                      <a href={project.github} className="text-impulse-gray-light/50 hover:text-impulse-white transition-colors" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className="text-impulse-gray-light/50 hover:text-impulse-white transition-colors" aria-label="Live demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        headline="Built something?"
        description="If you've built something — a prototype, an experiment, a tool — showcase it here."
        buttonText="START BUILDING"
        buttonTo="/join"
      />

      <Footer />
    </div>
  );
}
