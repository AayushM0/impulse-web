import { useEffect, useRef } from 'react';

/** Slow, outlined editorial type; decorative and outside the reading order. */
export default function EventsTypeBackground() {
  const background = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = background.current;
    if (!element) return;
    let visible = false;
    const sync = () => { element.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <div className="events-type-background" ref={background} aria-hidden="true">
    {[
      ['DISCOVER.', 'BUILD.', 'CONNECT.'],
      ['IDEAS.', 'PEOPLE.', 'POSSIBILITIES.'],
    ].map((words, row) => <div className={'events-type-row events-type-row-' + row} key={row}>
      <div className="events-type-track">
        {[0, 1].map(copy => <div className="events-type-group" key={copy}>
          {words.map(word => <span key={word}>{word}</span>)}
        </div>)}
      </div>
    </div>)}
  </div>;
}
