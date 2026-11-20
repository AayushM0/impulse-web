import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '@/data/content';
import { getLenis } from '@/providers/SmoothScrollProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isSharkHack = location.pathname === '/shark-hack' || location.pathname === '/events/shark-hack';

  const isLinkActive = (path: string) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path) || (path === '/events' && location.pathname === '/shark-hack');

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleMobileNavClick = (path: string) => {
    setMobileOpen(false);
    handleNavClick(path);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setScrolled(window.scrollY > 40);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled && isSharkHack ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Top ambient vignette when unscrolled to guarantee crisp legibility on ANY page/hero */}
        <div
          className={`absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-space-950/90 via-space-950/40 to-transparent transition-opacity duration-500 -z-10 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />

        <nav
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            scrolled
              ? 'mt-3 md:mt-4 w-[calc(100%-24px)] md:w-[calc(100%-48px)] max-w-7xl h-14 md:h-16 px-5 lg:px-8 py-2 rounded-2xl md:rounded-full bg-[#070B14]/90 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
              : 'mt-0 w-full max-w-7xl h-16 md:h-20 px-6 lg:px-10 py-0 rounded-none bg-transparent border border-transparent shadow-none'
          }`}
        >
          <div className="flex items-center gap-4">
            <Logo size="sm" />
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-mono text-xs font-bold tracking-wider transition-colors duration-300 relative group py-2 px-3 min-h-[40px] inline-flex items-center drop-shadow-[0_2px_8px_rgba(7,11,20,0.8)] ${
                    isActive ? 'text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1.5 left-3 right-3 h-px bg-impulse-blue transition-all duration-300 origin-left ${
                      isActive ? 'scale-x-100 shadow-[0_0_8px_rgba(96,165,250,0.85)]' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="group hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl md:rounded-full bg-white text-space-950 hover:bg-[#F2F6FF] font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.35)] select-none"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </Link>

            <button
              className="lg:hidden text-impulse-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 rounded-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-space-950/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-8 pt-16">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => handleMobileNavClick(link.path)}
              aria-current={isLinkActive(link.path) ? 'page' : undefined}
              className={`font-sans text-2xl tracking-wide transition-all duration-500 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isLinkActive(link.path) ? 'text-impulse-white' : 'text-impulse-gray-light'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 w-full max-w-xs px-4">
            <Link
              to="/events"
              onClick={() => setMobileOpen(false)}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-space-950 font-sans font-bold text-xs tracking-wider uppercase shadow-[0_2px_12px_rgba(255,255,255,0.25)] w-full"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
