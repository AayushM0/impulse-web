import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Calendar, MapPin, X, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import './SharkTimeline.css';
import VerticalSharkTimeline from './VerticalSharkTimeline';

export interface TimelineStep {
  title: string;
  timing: string;
  description: string;
  location?: string;
  icon: LucideIcon;
}

const WIDTH = 1200;
const INSET = 30;
const pointY = (index: number) => index % 2 === 0 ? 35 : 85;
const stageTone = (index: number, count: number) => index === count - 1 ? 'teal' : index % 2 ? 'pink' : 'blue';

export default function SharkTimeline({ steps }: { steps: readonly TimelineStep[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const motion = useRef({ progress: 0 });
  const id = useId();
  const spacing = (WIDTH - INSET * 2) / Math.max(1, steps.length - 1);
  const pointX = (index: number) => steps.length === 1 ? WIDTH / 2 : INSET + spacing * index;
  const path = steps.map((_, index) => {
    const x = pointX(index);
    const y = pointY(index);
    return index === 0 ? `M ${x} ${y}` : `C ${x - spacing * 0.55} ${pointY(index - 1)}, ${x - spacing * 0.45} ${y}, ${x} ${y}`;
  }).join(' ');
  const activeStep = selected === null ? null : steps[selected];

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>('.shark-wave-card');
    const number = card?.querySelector<HTMLElement>('.shark-wave-number');
    if (!scroller || !card || !number) return;
    const placeNumber = () => {
      // Measure from the card, so clamping near an edge cannot overlap the number.
      card.dataset.numberSide = card.offsetLeft >= number.offsetWidth + 20 ? 'left' : 'right';
    };
    placeNumber();
    const observer = new ResizeObserver(placeNumber);
    observer.observe(scroller);
    observer.observe(card);
    return () => observer.disconnect();
  }, [selected]);

  useEffect(() => {
    const curve = pathRef.current;
    if (!curve) return;
    const length = curve.getTotalLength();
    const target = selected === null ? 0 : selected / Math.max(1, steps.length - 1);
    const paint = () => {
      const position = curve.getPointAtLength(motion.current.progress * length);
      travelerRef.current?.setAttribute('transform', `translate(${position.x} ${position.y})`);
      const offset = String(1 - motion.current.progress);
      progressRef.current?.setAttribute('stroke-dashoffset', offset);
      glowRef.current?.setAttribute('stroke-dashoffset', offset);
    };
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tween = gsap.to(motion.current, {
      progress: target,
      duration: media.matches || selected === null ? 0 : 0.85,
      ease: 'power2.inOut',
      onUpdate: paint,
    });
    const finish = () => { if (media.matches) tween.progress(1); };
    media.addEventListener('change', finish);
    paint();
    return () => { tween.kill(); media.removeEventListener('change', finish); };
  }, [selected, steps.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>('.shark-wave-card');
    if (!scroller || !card || scroller.clientWidth >= scroller.scrollWidth) return;
    // Keep the whole detail card readable when a stage is tapped near a mobile edge.
    scroller.scrollTo({ left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2, behavior: 'instant' });
  }, [selected]);

  const close = () => {
    if (selected !== null) buttonsRef.current[selected]?.focus({ preventScroll: true });
    setSelected(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + steps.length) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttonsRef.current[next]?.focus({ preventScroll: true });
    buttonsRef.current[next]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
  };

  if (!steps.length) return null;

  return (
    <div className="shark-wave-timeline" data-tone={stageTone(selected ?? 0, steps.length)}
      onKeyDown={event => { if (event.key === 'Escape' && selected !== null) { event.stopPropagation(); close(); } }}>
      <VerticalSharkTimeline steps={steps} />
      <p className="shark-wave-hint">Select a stage to explore the journey.<span> Swipe to see all stages.</span></p>
      <div ref={scrollerRef} className="shark-wave-scroll" data-lenis-prevent>
        <div className="shark-wave-canvas">
          <svg className="shark-wave-road" viewBox={`0 0 ${WIDTH} 130`} preserveAspectRatio="none" aria-hidden="true">
            <path className="shark-wave-road-edge" d={path} />
            <path className="shark-wave-road-surface" d={path} />
            <path ref={pathRef} className="shark-wave-road-dashes" d={path} />
            <path ref={glowRef} className="shark-wave-progress-glow" d={path} pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
            <path ref={progressRef} className="shark-wave-progress" d={path} pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
            {steps.map((step, index) => <circle key={step.title} cx={pointX(index)} cy={pointY(index)} r="2" fill="#68758e" />)}
            <g ref={travelerRef} className="shark-wave-traveler" opacity={selected === null ? 0 : 1}>
              <circle className="shark-wave-traveler-halo" r="10" />
              <circle r="4" fill="var(--wave-accent)" />
              <circle r="2" fill="white" />
            </g>
          </svg>
          <ol className="shark-wave-stages" aria-label="Event timeline stages">
            {steps.map((step, index) => (
              <li key={step.title} className={'shark-wave-stage' + (index % 2 ? ' is-lower' : '')}
                data-tone={stageTone(index, steps.length)}
                style={{ left: `${pointX(index) / WIDTH * 100}%`, top: 260 + pointY(index) }}>
                <button ref={element => { buttonsRef.current[index] = element; }} type="button"
                  id={`${id}-stage-${index}`} aria-label={`Stage ${index + 1}: ${step.title}`}
                  aria-expanded={selected === index} aria-controls={`${id}-detail`}
                  className="shark-wave-stage-button" onClick={() => setSelected(index)}
                  onKeyDown={event => handleKeyDown(event, index)}>
                  <span>Stage</span><strong>{index + 1}</strong>
                </button>
              </li>
            ))}
          </ol>
          <div id={`${id}-detail`} role="region" aria-label="Selected stage details" aria-live="polite" aria-atomic="true">
            {activeStep && selected !== null && (() => {
              const Icon = activeStep.icon;
              return <div key={selected} className="shark-wave-selection" style={{ '--stage-x': `${pointX(selected) / WIDTH * 100}%`, '--stem-height': `${35 + pointY(selected)}px` } as CSSProperties}>
                <span className="shark-wave-stem" aria-hidden="true" />
                <article className="shark-wave-card" aria-labelledby={`${id}-title`}>
                  <span className="shark-wave-number" aria-hidden="true">{String(selected + 1).padStart(2, '0')}</span>
                  <button type="button" className="shark-wave-close" aria-label="Close stage details" onClick={close}><X aria-hidden="true" /></button>
                  <div className="shark-wave-card-heading"><span className="shark-wave-icon"><Icon aria-hidden="true" /></span><div><p>Stage {String(selected + 1).padStart(2, '0')}</p><h3 id={`${id}-title`}>{activeStep.title}</h3></div></div>
                  <p className="shark-wave-date"><Calendar aria-hidden="true" /><strong>{activeStep.timing}</strong></p>
                  <p className="shark-wave-description">{activeStep.description}</p>
                  {activeStep.location && <p className="shark-wave-location"><MapPin aria-hidden="true" />{activeStep.location}</p>}
                </article>
              </div>;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
