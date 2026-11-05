import { useLayoutEffect, type RefObject } from 'react';
import { observeEventReveals } from './observeEventReveals';
import './eventReveals.css';

// Events-only targets, with the same replay behavior and motion as Shark Hack.
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
    elements.forEach(element => {
        const siblings = Array.from(element.parentElement?.children ?? [])
          .filter(sibling => sibling.matches(selectors));
        const insideCard = !!element.parentElement?.closest('.event-card');
        element.style.setProperty('--reveal-delay', `${(insideCard ? 180 : 0) + Math.min(siblings.indexOf(element), 3) * 130}ms`);
        element.dataset.revealKind = element.matches('.event-card') ? 'drop' : element.matches('h1, h2, h3, .events-list-heading > *, .events-future-note h3, footer > .relative > div:first-child')
          ? 'heading' : 'card';
        element.dataset.scrollReveal = 'pending';
    });
    const stopObserving = observeEventReveals(page, elements);
    return () => {
      stopObserving();
      elements.forEach(element => {
        delete element.dataset.scrollReveal;
        delete element.dataset.revealKind;
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [ref]);
}
