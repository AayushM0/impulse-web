import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLinkActive = (path: string) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path) || (path === '/events' && location.pathname === '/shark-hack');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-space-950/80 backdrop-blur-xl border-b border-impulse-blue/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div className="hidden sm:inline-flex items-center gap-1.5 font-mono-label text-[10px] text-impulse-blue-bright/80 border border-impulse-blue/25 bg-space-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CHAPTER ONE</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-mono-label transition-colors duration-300 relative group ${
                    isActive ? 'text-impulse-white' : 'text-impulse-gray-light/70 hover:text-impulse-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-impulse-blue transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              to="/join"
              className="group inline-flex items-center gap-2 font-mono-label text-impulse-white border border-impulse-blue/30 bg-impulse-blue/5 hover:bg-impulse-blue/15 hover:border-impulse-blue/50 transition-all duration-300 px-5 py-2.5 energy-sweep"
            >
              Join Impulse
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            className="lg:hidden text-impulse-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
              aria-current={isLinkActive(link.path) ? 'page' : undefined}
              className={`font-sans text-2xl tracking-wide transition-all duration-500 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isLinkActive(link.path) ? 'text-impulse-white' : 'text-impulse-gray-light'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/join"
            className={`mt-4 inline-flex items-center gap-2 font-mono-label text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 px-7 py-3.5 transition-all duration-500 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Join Impulse <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
