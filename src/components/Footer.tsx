import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { footerLinks, socialLinks } from '@/data/content';

export default function Footer() {
  return (
    <footer className="relative bg-space-950 border-t border-impulse-blue/10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-impulse-blue/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Large wordmark */}
        <div className="mb-16 lg:mb-24">
          <p aria-hidden="true" className="text-[14vw] lg:text-[10rem] font-sans font-bold tracking-tight leading-none text-impulse-white/10 select-none">
            IMPULSE
          </p>
          <p className="font-mono-label text-impulse-blue-bright/60 mt-4">
            IDEAS IN MOTION.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Links */}
          <div>
            <p className="font-mono-label text-impulse-blue-bright/70 mb-6">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-impulse-gray-light/80 hover:text-impulse-white transition-colors duration-300 text-sm tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono-label text-impulse-blue-bright/70 mb-6">Connect</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-impulse-gray-light/80 hover:text-impulse-white transition-colors duration-300 text-sm tracking-wide"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono-label text-impulse-blue-bright/70 mb-6">Contact</p>
            <a
              href="mailto:community.impulseteam@gmail.com"
              className="text-impulse-gray-light/80 hover:text-impulse-white transition-colors duration-300 text-sm tracking-wide break-all"
            >
              community.impulseteam@gmail.com
            </a>
            <div className="mt-8">
              <Logo size="sm" showText={false} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-space-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-label text-impulse-blue-bright/70">
            CHAPTER ONE / 2026
          </p>
          <p className="font-mono-label text-impulse-blue-bright/70">
            IMPULSE - AI BUILDER COMMUNITY
          </p>
        </div>
      </div>
    </footer>
  );
}
