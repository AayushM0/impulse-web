/** Replay entrances from either viewport edge without measuring the animated offset. */
export function observeEventReveals(page: HTMLElement, elements: HTMLElement[]) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = new Set(elements);
  const ancestors = new Map(elements.map(element => {
    const chain: HTMLElement[] = [];
    for (let parent = element.parentElement; parent && parent !== page; parent = parent.parentElement) {
      if (targets.has(parent)) chain.push(parent);
    }
    return [element, chain];
  }));
  let frame: number | null = null;

  const show = (element: HTMLElement) => { element.dataset.scrollReveal = 'visible'; };
  const update = () => {
    frame = null;
    if (motion.matches) {
      elements.forEach(show);
      return;
    }

    const height = window.innerHeight;
    const inset = Math.min(80, height * .1);
    const atStart = window.scrollY <= 1;
    const atEnd = window.scrollY + height >= document.documentElement.scrollHeight - 2;
    const offsets = new Map<HTMLElement, number>();
    const offset = (element: HTMLElement) => {
      if (!offsets.has(element)) {
        const translate = getComputedStyle(element).translate.split(/\s+/);
        offsets.set(element, parseFloat(translate[1] ?? '0') || 0);
      }
      return offsets.get(element)!;
    };

    // Read first, then write. Subtract both the element's and its card's CSS
    // translate so the entrance itself cannot cause a hide/show loop.
    const states = elements.map(element => {
      const rect = element.getBoundingClientRect();
      const translation = offset(element) + ancestors.get(element)!.reduce((sum, parent) => sum + offset(parent), 0);
      const top = rect.top - translation;
      const bottom = rect.bottom - translation;
      if (element.contains(document.activeElement)) return 'visible';
      if (!rect.height || bottom <= 0 || top >= height) return 'pending';
      const footer = !!element.closest('footer');
      const enters = bottom > (atStart || footer ? 0 : inset) && top < (atEnd || footer ? height : height - inset);
      return enters ? 'visible' : element.dataset.scrollReveal;
    });
    elements.forEach((element, index) => {
      const state = states[index];
      if (state && state !== element.dataset.scrollReveal) element.dataset.scrollReveal = state;
    });
  };
  const schedule = () => {
    if (frame === null) frame = requestAnimationFrame(update);
  };
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target;
    elements.forEach(element => { if (element.contains(target)) show(element); });
  };
  const resize = new ResizeObserver(schedule);
  resize.observe(page);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  page.addEventListener('focusin', onFocus);
  page.addEventListener('focusout', schedule);
  update();

  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    resize.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    motion.removeEventListener('change', schedule);
    page.removeEventListener('focusin', onFocus);
    page.removeEventListener('focusout', schedule);
  };
}
