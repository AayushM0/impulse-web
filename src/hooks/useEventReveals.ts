import { useLayoutEffect, type RefObject } from 'react';
import { observeEventReveals } from './observeEventReveals';
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
    elements.forEach(element => {
        // Reading order is also the reveal order; short delays keep it responsive.
        const siblings = Array.from(element.parentElement?.children ?? []).filter(sibling => sibling.matches(selectors));
        element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * 130}ms`);
        element.dataset.revealKind = element.matches('.shark-section-heading, .shark-special-prizes > h3, .shark-faq-layout > div:first-child, .events-list-heading') ? 'heading' : 'card';
        element.dataset.scrollReveal = 'pending';
    });
    const stopObserving = observeEventReveals(page, elements);
    return () => {
      stopObserving();
      elements.forEach(element => { delete element.dataset.scrollReveal; delete element.dataset.revealKind; element.style.removeProperty('--reveal-delay'); });
    };
  }, [ref]);
}
