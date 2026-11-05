import { useLayoutEffect, type RefObject } from 'react';
import './eventReveals.css';

// Events-only targets; reuse Shark Hack's motion styles without changing its hook.
export function useEventsPageReveals(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return;
    const selectors = [
      '.events-hero-copy > *', '.events-list-heading > *',
      '.event-card',
      '.event-card-image', '.event-card-heading > *', '.event-card-facts > div',
      '.event-card-highlights > li', '.event-card-link', '.event-card-registration',
      '.events-future-icon', '.events-future-note > div > *',
      'footer > .relative > div:first-child', 'footer > .relative > .grid > div',
      'footer > .relative > div:last-child',
    ].join(',');
    const elements = Array.from(page.querySelectorAll<HTMLElement>(selectors));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let footerObserver: IntersectionObserver | undefined;
    let resetObserver: IntersectionObserver | undefined;
    const show = (element: HTMLElement) => { element.dataset.scrollReveal = 'visible'; };
    const setup = () => {
      observer?.disconnect();
      footerObserver?.disconnect();
      resetObserver?.disconnect();
      if (motion.matches) {
        elements.forEach(show);
        return;
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
      // The footer can reach the end of the document before the usual 10% trigger.
      footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      }, { threshold: 0 });
      resetObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting && !element.contains(document.activeElement)) {
            element.dataset.scrollReveal = 'pending';
          }
        });
      }, { rootMargin: '150px 0px' });
      elements.forEach(element => {
        const siblings = Array.from(element.parentElement?.children ?? [])
          .filter(sibling => sibling.matches(selectors));
        const insideCard = !!element.parentElement?.closest('.event-card');
        element.style.setProperty('--reveal-delay', `${(insideCard ? 180 : 0) + Math.min(siblings.indexOf(element), 3) * 130}ms`);
        element.dataset.revealKind = element.matches('.event-card') ? 'drop' : element.matches('h1, h2, h3, .events-list-heading > *, .events-future-note h3, footer > .relative > div:first-child')
          ? 'heading' : 'card';
        element.dataset.scrollReveal = 'pending';
        (element.closest('footer') ? footerObserver : observer)?.observe(element);
        resetObserver?.observe(element);
      });
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      elements.forEach(element => { if (element.contains(target)) show(element); });
    };
    setup();
    motion.addEventListener('change', setup);
    page.addEventListener('focusin', onFocus);
    return () => {
      observer?.disconnect();
      footerObserver?.disconnect();
      resetObserver?.disconnect();
      motion.removeEventListener('change', setup);
      page.removeEventListener('focusin', onFocus);
      elements.forEach(element => {
        delete element.dataset.scrollReveal;
        delete element.dataset.revealKind;
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [ref]);
}
