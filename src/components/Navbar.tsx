import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '@/data/content';
import { getLenis } from '@/providers/SmoothScrollProvider';

const threeTabs = [
  { label: 'Events', path: '/events' },
  { label: 'Cohort', path: '/cohort' },
  { label: 'Community', path: '/community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isSharkHack = location.pathname === '/shark-hack' || location.pathname === '/events/shark-hack';

  const isLinkActive = (path: string) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path) || (path === '/events' && location.pathname.includes('shark-hack'));

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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
      }
    };
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
          isSharkHack && scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Top ambient vignette when unscrolled to guarantee crisp legibility on ANY page/hero */}
        <div
          className={`absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-space-950/90 via-space-950/40 to-transparent transition-opacity duration-500 -z-10 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />

        {/* 3-Island Navigation Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-4 flex items-center justify-between relative">
          {/* Island 1: Brand Logo */}
          <div
            className={`pointer-events-auto flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'h-12 md:h-14 px-4 sm:px-5 rounded-full bg-[#070B14]/90 backdrop-blur-2xl border border-white/12 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
                : 'h-12 md:h-14 px-1 bg-transparent border border-transparent shadow-none'
            }`}
          >
            <Link
              to="/"
              onClick={() => handleNavClick('/')}
              className="flex items-center group"
              aria-label="Impulse Home"
            >
              <Logo size="sm" asLink={false} />
            </Link>
          </div>

          {/* Island 2: Three Tabs (Events, Cohort, Community) - Mathematically Centered */}
          <nav
            aria-label="Main navigation"
            className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'h-12 md:h-14 px-3 sm:px-4 rounded-full bg-[#070B14]/90 backdrop-blur-2xl border border-white/12 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
                : 'h-12 md:h-14 px-2 bg-transparent border border-transparent shadow-none'
            }`}
          >
            {threeTabs.map((link) => {
              const isActive = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-mono text-xs font-bold tracking-wider transition-all duration-300 relative py-2 px-4 rounded-full inline-flex items-center drop-shadow-[0_2px_8px_rgba(7,11,20,0.8)] ${
                    isActive
                      ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(96,165,250,0.25)]'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-impulse-blue rounded-full shadow-[0_0_8px_rgba(96,165,250,0.95)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Island 3: Action Button & Mobile Menu Trigger */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              to="/events"
              className="group hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-space-950 hover:bg-[#F2F6FF] font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)] select-none h-11 md:h-12"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </Link>

            <button
              className={`md:hidden text-impulse-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 ${
                scrolled
                  ? 'bg-[#070B14]/90 backdrop-blur-2xl border border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.8)]'
                  : 'bg-space-900/60 backdrop-blur-md border border-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
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
