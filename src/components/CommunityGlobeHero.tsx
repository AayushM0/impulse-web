import { useEffect, useRef } from 'react';
import { Handshake, Lightbulb, Network, MoveDownRight, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CommunityGlobeHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityGlobeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pill = pillRef.current;
    const globe = globeRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const action = actionRef.current;
    const hero = heroRef.current;
    if (!hero || !pill || !globe || !title || !tagline || !action) return;

    const travel = Math.max(0, (pill.clientWidth - globe.clientWidth) / 2 - 1);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      gsap.set(globe, { x: travel });
      gsap.set([title, tagline, action], { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(globe, { x: -travel });
    gsap.set(title, { autoAlpha: 0, y: 18 });
    gsap.set(tagline, { autoAlpha: 0, y: 12 });
    gsap.set(action, { autoAlpha: 0, y: 12 });

    const timeline = gsap.timeline({ paused: true });
    timeline.to(globe, { x: travel, duration: 0.72, ease: 'power2.inOut' });
    timeline.to(title, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out' });
    timeline.to(tagline, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.12');
    timeline.to(action, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.08');

    const reset = () => {
      timeline.pause(0);
      gsap.set(globe, { x: -travel });
      gsap.set(title, { autoAlpha: 0, y: 18 });
      gsap.set(tagline, { autoAlpha: 0, y: 12 });
      gsap.set(action, { autoAlpha: 0, y: 12 });
    };
    const play = () => {
      reset();
      timeline.play(0);
    };

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: play,
      onEnterBack: play,
      onLeave: reset,
      onLeaveBack: reset,
      onRefresh: (self) => { if (self.isActive) play(); },
    });

    // The page can load with the hero already inside the viewport, so ScrollTrigger
    // may not emit an enter event until the first scroll. Start the intro in that case.
    const heroBounds = hero.getBoundingClientRect();
    if (heroBounds.top < window.innerHeight && heroBounds.bottom > 0) play();

    return () => {
      trigger.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="globe-hero" aria-labelledby="community-title">
      <div className="globe-hero-motion" aria-hidden="true">
        <div className="globe-hero-ridges">
          <span className="globe-hero-ridge globe-hero-ridge-pink" />
          <span className="globe-hero-ridge globe-hero-ridge-purple" />
        </div>
        <div className="globe-hero-wave-field" />
        <div className="globe-hero-sparkles">
          <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>
      </div>
      <div className="globe-hero-panel">
        <div ref={pillRef} className="globe-hero-pill">
          <div className="globe-hero-heading-lockup">
            <h1 ref={titleRef} id="community-title" className="globe-hero-title">COMMUNITY</h1>
            <p ref={taglineRef} className="globe-hero-tagline">IDEAS IN MOTION</p>
          </div>
          <div ref={globeRef} className="globe-hero-globe">
            <svg viewBox="0 0 120 120" role="presentation" focusable="false">
              <circle cx="60" cy="60" r="49" />
              <ellipse cx="60" cy="60" rx="23" ry="49" />
              <ellipse cx="60" cy="60" rx="49" ry="21" />
              <path d="M15 42h90M13 78h94" />
            </svg>
          </div>
        </div>
      </div>

      <div className="globe-hero-content">
        <div ref={actionRef} className="globe-hero-support">
          <p className="globe-hero-eyebrow">WHERE PASSION MEETS PURPOSE.</p>
          <p className="globe-hero-description">
            A creative space where curious minds connect, innovative ideas grow, and passionate individuals come together to create meaningful experiences.
          </p>
          <div className="globe-hero-actions">
            <a className="globe-hero-button globe-hero-button-outline" href="#flashcards">
              EXPLORE OUR COMMUNITY <MoveDownRight aria-hidden="true" />
            </a>
            <a className="globe-hero-button globe-hero-button-primary" href="#community-connect-title">
              CONNECT WITH US <MoveUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="globe-hero-society-cards" aria-label="What our society does">
            <article className="globe-hero-society-card">
              <span className="globe-hero-society-icon"><Network aria-hidden="true" /></span>
              <div><h2>CONNECT</h2><p>Bringing creative minds together.</p></div>
            </article>
            <article className="globe-hero-society-card">
              <span className="globe-hero-society-icon"><Handshake aria-hidden="true" /></span>
              <div><h2>COLLABORATE</h2><p>Turning ideas into teamwork.</p></div>
            </article>
            <article className="globe-hero-society-card">
              <span className="globe-hero-society-icon"><Lightbulb aria-hidden="true" /></span>
              <div><h2>INNOVATE</h2><p>Creating possibilities through ideas.</p></div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
