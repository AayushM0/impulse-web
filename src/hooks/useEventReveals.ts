import { useLayoutEffect, type RefObject } from 'react';
import './eventReveals.css';

const selectors = [
  '.shark-hero-content > *', '.shark-fact-card', '.shark-section-heading',
  '.shark-room-choice', '.shark-room-detail', '.shark-prize-card',
  '.shark-special-prizes > h3', '.shark-special-prize-card',
  '.shark-partner-card', '.shark-faq-layout > div:first-child', '.shark-faq-item',
  '.shark-ocean-card',
  '.events-hero-copy > *', '.events-list-heading', '.events-list-heading > *',
  '.event-card', '.event-card-image', '.event-card-heading > *',
  '.event-card-facts > div', '.event-card-highlights > li',
  '.event-card-link', '.event-card-registration', '.events-future-icon',
  '.events-future-note', '.events-future-note > div > *',
].join(',');

export function useEventReveals(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(page.querySelectorAll<HTMLElement>(selectors));

    if (prefersReducedMotion) {
      elements.forEach(element => { element.dataset.scrollReveal = 'visible'; });
      return;
    }

    elements.forEach(element => {
      const siblings = Array.from(element.parentElement?.children ?? []).filter(sibling => sibling.matches(selectors));
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * 130}ms`);
      element.dataset.revealKind = element.matches('.shark-section-heading, .shark-special-prizes > h3, .shark-faq-layout > div:first-child, .events-list-heading, h1, h2, h3')
        ? 'heading'
        : element.matches('.event-card')
          ? 'drop'
          : 'card';
      element.dataset.scrollReveal = 'pending';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.dataset.scrollReveal = 'visible';
          observer.unobserve(el);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    });

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      elements.forEach(element => {
        delete element.dataset.scrollReveal;
        delete element.dataset.revealKind;
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [ref]);
}
