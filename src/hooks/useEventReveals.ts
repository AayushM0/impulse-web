import { useLayoutEffect, type RefObject } from 'react';
import './eventReveals.css';

// Headings slide from the left; cards rise after entering the viewport.
// Observe the cards, never the timeline rows used to measure the water path.
export function useEventReveals(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return;
    const selectors = [
      '.shark-hero-content > *', '.shark-fact-card', '.shark-section-heading',
      '.shark-room-choice', '.shark-room-detail', '.shark-prize-card',
      '.shark-special-prizes > h3', '.shark-special-prize-card',
      '.shark-partner-card', '.shark-faq-layout > div:first-child', '.shark-faq-item',
      '.shark-ocean-card',
      '.events-list-heading', '.event-card', '.events-future-note',
    ].join(',');
    const elements = Array.from(page.querySelectorAll<HTMLElement>(selectors));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let resetObserver: IntersectionObserver | undefined;
    const show = (element: HTMLElement) => {
      element.dataset.scrollReveal = 'visible';
    };
    const setup = () => {
      observer?.disconnect();
      resetObserver?.disconnect();
      if (motion.matches) {
        elements.forEach(show);
        return;
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) show(element);
        });
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
      // Reset beyond the viewport, so translating an element cannot repeatedly
      // move it across the reveal threshold and cause flicker while scrolling.
      resetObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting && !element.contains(document.activeElement)) element.dataset.scrollReveal = 'pending';
        });
      }, { rootMargin: '150px 0px' });
      elements.forEach(element => {
        // Reading order is also the reveal order; short delays keep it responsive.
        const siblings = Array.from(element.parentElement?.children ?? []).filter(sibling => sibling.matches(selectors));
        element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * 130}ms`);
        element.dataset.revealKind = element.matches('.shark-section-heading, .shark-special-prizes > h3, .shark-faq-layout > div:first-child, .events-list-heading') ? 'heading' : 'card';
        element.dataset.scrollReveal = 'pending';
        observer?.observe(element);
        resetObserver?.observe(element);
      });
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      // Keyboard navigation must never land on an invisible control or section.
      elements.forEach(element => {
        if (element.contains(target)) show(element);
      });
    };
    setup();
    motion.addEventListener('change', setup);
    page.addEventListener('focusin', onFocus);
    return () => {
      observer?.disconnect();
      resetObserver?.disconnect();
      motion.removeEventListener('change', setup);
      page.removeEventListener('focusin', onFocus);
      elements.forEach(element => { delete element.dataset.scrollReveal; delete element.dataset.revealKind; element.style.removeProperty('--reveal-delay'); });
    };
  }, [ref]);
}
