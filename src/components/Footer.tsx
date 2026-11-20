import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: 'Explore', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Cohort', path: '/cohort' },
  { label: 'Community', path: '/community' },
  { label: 'SharkHack', path: '/sharkhack' },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    svg: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        className="w-4 h-4 transition-all duration-200 hover:text-white hover:scale-110"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/impulse-community',
    svg: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        className="w-4 h-4 transition-all duration-200 hover:text-white hover:scale-110"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/impulse-community',
    svg: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 496 512"
        className="w-4 h-4 transition-all duration-200 hover:text-white hover:scale-110"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const handleLinkHover = (target: HTMLElement) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = target.querySelectorAll('.footer-nav-char');
    if (!chars.length) return;
    gsap.killTweensOf(chars);
    chars.forEach((char, i) => {
      const tilt = gsap.utils.random(-8, 8);
      gsap.to(char, {
        scale: 1.15,
        rotation: tilt,
        duration: 0.2,
        delay: i * 0.02,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    });
  };

  const handleLinkLeave = (target: HTMLElement) => {
    const chars = target.querySelectorAll('.footer-nav-char');
    if (!chars.length) return;
    gsap.killTweensOf(chars);
    gsap.to(chars, {
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  useEffect(() => {
    const footerEl = footerRef.current;
    const wordmarkEl = wordmarkRef.current;
    const mascotEl = mascotRef.current;
    const headlineEl = headlineRef.current;
    if (!footerEl || !wordmarkEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(wordmarkEl, { scaleY: 1 });
      if (mascotEl) {
        gsap.set(mascotEl, { y: 0, rotation: 0 });
      }
      if (headlineEl) {
        gsap.set(headlineEl, { y: 0, opacity: 1 });
      }
      return;
    }

    const triggerMascotJump = (el: HTMLElement | null) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, {
        y: -14,
        rotation: gsap.utils.random(-8, 8),
        duration: 0.28,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        overwrite: 'auto',
        onComplete: () => {
          gsap.to(el, { y: 0, rotation: 0, duration: 0.2, ease: 'power2.out' });
        },
      });
    };

    let headlineTween: gsap.core.Tween | null = null;
    if (headlineEl) {
      headlineTween = gsap.fromTo(
        headlineEl,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    gsap.set(wordmarkEl, {
      scaleY: 0.15,
      transformOrigin: 'bottom center',
    });

    let hasBounced = false;
    const st = ScrollTrigger.create({
      trigger: footerEl,
      start: 'top bottom',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity() || 0);
        const velStretch = Math.min(vel / 1500, 0.25);

        if (self.progress >= 0.9) {
          if (!hasBounced) {
            hasBounced = true;
            gsap.killTweensOf(wordmarkEl);
            gsap.to(wordmarkEl, {
              scaleY: 1,
              duration: 1.4,
              ease: 'elastic.out(1.2, 0.35)',
              overwrite: 'auto',
            });
            triggerMascotJump(mascotEl);
          }
        } else {
          hasBounced = false;
          const baseTarget =
            self.direction === 1
              ? 0.15 + self.progress * 1.15 + velStretch
              : 0.15 + self.progress * 0.95;
          const targetScaleY = Math.max(0.15, Math.min(baseTarget, 1.4));
          gsap.to(wordmarkEl, {
            scaleY: targetScaleY,
            duration: 0.1,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        }
      },
      onLeave: () => {
        if (!hasBounced) {
          hasBounced = true;
          gsap.killTweensOf(wordmarkEl);
          gsap.to(wordmarkEl, {
            scaleY: 1,
            duration: 1.4,
            ease: 'elastic.out(1.2, 0.35)',
            overwrite: 'auto',
          });
          triggerMascotJump(mascotEl);
        }
      },
      onLeaveBack: () => {
        hasBounced = false;
        gsap.killTweensOf(wordmarkEl);
        gsap.to(wordmarkEl, {
          scaleY: 0.15,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        if (mascotEl) {
          gsap.killTweensOf(mascotEl);
          gsap.to(mascotEl, { y: 0, rotation: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        }
      },
    });

    return () => {
      st.kill();
      if (headlineTween) {
        headlineTween.kill();
        headlineTween.scrollTrigger?.kill();
      }
      gsap.killTweensOf(wordmarkEl);
      if (headlineEl) {
        gsap.killTweensOf(headlineEl);
      }
      if (mascotEl) {
        gsap.killTweensOf(mascotEl);
      }
      const navChars = footerEl.querySelectorAll('.footer-nav-char');
      if (navChars.length) {
        gsap.killTweensOf(navChars);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-space-950 text-white border-t border-white/20 select-none flex flex-col justify-end"
    >
      <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-5 md:pt-6 pb-0 font-sans flex flex-col justify-end">
        {/* Top bar: Editorial headline, nav links, socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300 font-medium pt-1 pb-5 md:pb-6">
          <div className="overflow-hidden mb-2 md:mb-0">
            <div
              ref={headlineRef}
              className="text-lg md:text-xl font-bold tracking-wider uppercase text-white/90 select-none"
              style={{ fontFamily: "'TheSansMono', monospace" }}
            >
              IDEAS IN MOTION.
            </div>
          </div>

          <nav
            className="flex items-center gap-6 md:gap-8 flex-wrap justify-center text-xs md:text-sm font-medium"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="footer-nav-link text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 inline-flex"
                onMouseEnter={(e) => handleLinkHover(e.currentTarget)}
                onMouseLeave={(e) => handleLinkLeave(e.currentTarget)}
              >
                {link.label.split('').map((char, i) => (
                  <span
                    key={i}
                    className="footer-nav-char inline-block will-change-transform"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-gray-300" aria-label="Social media links">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="hover:text-white text-gray-400 p-1"
              >
                {item.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Stretched Solid Lifted Wordmark Stuck to Bottom */}
        <div
          ref={wordmarkRef}
          style={{ transformOrigin: 'bottom center' }}
          className="footer-bottom w-full flex justify-center items-end text-center overflow-hidden pb-0 select-none will-change-transform"
        >
          <h1
            className="text-[clamp(3.8rem,19vw,17rem)] text-[#E2E8F0] overflow-visible leading-[0.82] select-none inline-flex items-center justify-center w-full mb-[-0.04em]"
            style={{
              fontFamily: "'TheSansMono', monospace",
              letterSpacing: '0.05em',
              textShadow:
                '0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.7), 0 16px 32px rgba(0, 0, 0, 0.85), 0 32px 64px rgba(0, 0, 0, 0.95)',
              filter: 'drop-shadow(0 16px 24px rgba(0, 0, 0, 0.8))',
            }}
          >
            <span>IM</span>
            <span className="relative inline-flex items-center justify-center">
              <span>P</span>
              {/* Mascot centered inside the counter loop of letter P */}
              <span
                className="absolute pointer-events-auto cursor-pointer group z-10"
                style={{
                  top: '19%',
                  left: '41%',
                  width: '30%',
                  height: '30%',
                }}
                title="Impulse Mascot"
              >
                <img
                  ref={mascotRef}
                  src="/images/mascot.avif"
                  alt="Impulse mascot"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-contain rounded-full shadow-[0_0_12px_rgba(236,72,153,0.4)] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                />
              </span>
            </span>
            <span>ULSE</span>
          </h1>
        </div>
      </div>
    </footer>
  );
}
