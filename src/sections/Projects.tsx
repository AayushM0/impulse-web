import { useState, useRef } from 'react';
import { ArrowRight, Github, ExternalLink, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard3D from '@/components/3d/TiltCard3D';
import { projects } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const categories = ['ALL', 'AI', 'PRODUCT', 'RESEARCH', 'OPEN SOURCE', 'EXPERIMENTAL'];

const statusBadgeStyles: Record<string, string> = {
  'SHIPPED': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'BUILDING': 'text-impulse-blue-bright border-impulse-blue/30 bg-impulse-blue/10',
  'EXPERIMENT': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  'OPEN SOURCE': 'text-violet-400 border-violet-500/30 bg-violet-500/10',
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-28 lg:py-36 bg-space-950 border-t border-space-800/80 overflow-hidden"
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-label text-[11px] text-impulse-blue-bright/70 border border-space-700/80 bg-space-900/60 backdrop-blur-md px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-impulse-blue" />
              <span>PROJECTS // PROTOTYPES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-impulse-white tracking-tight leading-tight">
              Ideas that made it <span className="text-impulse-blue-bright">into the wild.</span>
            </h2>
          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-mono-label text-xs text-impulse-blue-bright hover:text-impulse-white transition-colors self-start lg:self-end"
          >
            <span>VIEW REPOSITORY</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono-label text-xs px-4 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-impulse-blue/70 bg-impulse-blue/15 text-impulse-white'
                  : 'border-space-800 bg-space-900/60 text-impulse-gray-light/60 hover:border-space-700 hover:text-impulse-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Tilt Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <TiltCard3D maxTilt={8} className="h-full">
                <div className="h-full relative flex flex-col justify-between p-8 bg-space-900/95 border border-space-800 hover:border-impulse-blue/40 transition-colors duration-300">
                  <div>
                    {/* Category & Status pill */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="font-mono-label text-xs text-impulse-blue-bright/70">
                        {project.category}
                      </span>

                      <span
                        className={`font-mono-label text-[10px] px-2.5 py-0.5 border rounded-full ${
                          statusBadgeStyles[project.status] || 'text-impulse-gray-light border-space-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-2xl font-sans font-semibold text-impulse-white tracking-tight mb-3">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-impulse-gray-light/70 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    {project.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-mono-label text-impulse-gray-light/60 bg-space-800/60 border border-space-700/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer with Contributors & Action Links */}
                  <div className="pt-6 border-t border-space-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono-label text-impulse-gray-light/50">
                      <span>by {project.contributors[0]}</span>
                      {project.contributors.length > 1 && (
                        <span className="text-[10px] text-impulse-blue-bright">
                          +{project.contributors.length - 1}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.stars && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono-label text-impulse-gray-light/60">
                          <Star className="w-3 h-3 text-amber-400" />
                          {project.stars}
                        </span>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-impulse-gray-light/60 hover:text-impulse-white transition-colors"
                          aria-label={`${project.name} GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-impulse-blue-bright hover:text-impulse-white transition-colors"
                          aria-label={`${project.name} Live Demo`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
