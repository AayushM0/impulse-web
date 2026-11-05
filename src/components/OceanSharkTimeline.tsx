import { useId, useLayoutEffect, useRef, type CSSProperties } from 'react';
import { Calendar, MapPin, type LucideIcon } from 'lucide-react';
export interface TimelineStep {
  title: string;
  timing: string;
  description: string;
  location?: string;
  icon: LucideIcon;
}

import './OceanSharkTimeline.css';

function WaterSurface({ id, landing = false }: { id: string; landing?: boolean }) {
  return <g className={`shark-ocean-surface ${landing ? 'shark-ocean-landing-pool' : 'shark-ocean-entry-pool'}`}>
    <use href={`#${id}-pool-shape`} fill={`url(#${id}-surface)`} />
    <g clipPath={`url(#${id}-pool-clip)`}>
      <path className="shark-ocean-pool-depth" d="M-64 5 Q-28 -14 8 -3 T77 6 Q38 30 -7 23 T-64 5Z" />
      <g className="shark-ocean-surface-flow">
        <path d="M-81 -4 Q-61 -13 -40 -7 T-2 -9 M12 -12 Q34 -18 59 -9 M-69 12 Q-44 2 -23 9 T20 11 M33 8 Q52 0 77 8 M-35 22 Q-10 14 9 20 T47 20" />
        <path d="M-60 -2 Q-40 -7 -23 -2 M0 2 Q16 -4 34 1 M-13 15 Q6 9 21 14 M46 14 L58 12" />
      </g>
      <g className="shark-ocean-surface-ripples">
        <path d="M-18 -1 C-35 1 -35 9 -15 12 M-6 -3 C23 -6 34 2 25 8 M-27 -8 C-58 -4 -54 14 -24 18 M4 -11 C48 -12 58 5 39 14" />
      </g>
    </g>
  </g>;
}

function WaterSplash({ delay }: { delay: number }) {
  return <g className="shark-ocean-finish-scale">
    <path className="shark-ocean-splash-crown" d="M-26 2 Q-30 -14 -35 -22 Q-18 -18 -13 -4 Q-15 -30 -10 -38 Q-2 -25 0 -7 Q7 -32 16 -31 Q14 -12 15 -4 Q27 -21 34 -17 Q24 -8 26 2Z" style={{ animationDelay: `${delay}s` }} />
    {[0, 1, 2].map(index => <ellipse key={index} className="shark-ocean-finish-ring" rx="22" ry="8" style={{ animationDelay: `${delay + index * 0.16}s` }} />)}
    {Array.from({ length: 10 }, (_, index) => {
      const angle = index * Math.PI / 5;
      return <circle key={index} className="shark-ocean-finish-drop" r={index % 2 ? 3 : 2} style={{
        '--splash-x': `${Math.cos(angle) * (48 + index % 3 * 8)}px`,
        '--splash-y': `${-25 - Math.abs(Math.sin(angle)) * 45}px`,
        animationDelay: `${delay + index % 3 * 0.06}s`,
      } as CSSProperties} />;
    })}
  </g>;
}

export default function OceanSharkTimeline({ steps }: { steps: readonly TimelineStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const svg = root.querySelector<SVGSVGElement>('.shark-ocean-water')!;
    const path = root.querySelector<SVGPathElement>('.shark-ocean-current')!;
    const progress = root.querySelector<SVGPathElement>('.shark-ocean-progress')!;
    const wake = root.querySelector<SVGPathElement>('.shark-ocean-wake')!;
    const bubbles = Array.from(root.querySelectorAll<SVGGElement>('.shark-ocean-bubble'));
    const swimmer = root.querySelector<SVGGElement>('.shark-ocean-swimmer')!;
    const finish = root.querySelector<SVGGElement>('.shark-ocean-finish')!;
    const entry = root.querySelector<SVGGElement>('.shark-ocean-entry')!;
    const stages = Array.from(root.querySelectorAll<HTMLElement>('.shark-ocean-stage'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let length = 0;
    let startY = 0;
    let endY = 0;
    let checkpoints: number[] = [];
    let finished = false;
    let entered = false;
    root.dataset.entry = 'waiting';

    // Solve for path length at document Y: the swimmer and reveals share one
    // scroll position, even when text wrapping changes the height of a stage.
    const lengthAtY = (y: number) => {
      let low = 0;
      let high = length;
      for (let i = 0; i < 18; i++) {
        const middle = (low + high) / 2;
        if (path.getPointAtLength(middle).y < y) low = middle;
        else high = middle;
      }
      return (low + high) / 2;
    };
    const paint = () => {
      frame = 0;
      if (!length) return;
      const top = root.getBoundingClientRect().top;
      const scrollY = window.innerHeight * 0.58 - top;
      if (reducedMotion.matches || scrollY > checkpoints[0] + 70) {
        entered = true;
        root.dataset.entry = 'complete';
      } else if (top + startY > window.innerHeight + 100) {
        entered = false;
        root.dataset.entry = 'waiting';
      } else if (!entered && top + startY < window.innerHeight * .82 && top + startY > 140) {
        entered = true;
        root.dataset.entry = 'playing';
      }
      // Land on the water before handing control back to scrolling. Fast scrolls
      // skip the entrance, so reading and anchor navigation are never blocked.
      const y = root.dataset.entry === 'playing' ? startY : Math.max(startY, Math.min(endY, scrollY));
      const distance = lengthAtY(y);
      const point = path.getPointAtLength(distance);
      const before = path.getPointAtLength(Math.max(0, distance - 2));
      const after = path.getPointAtLength(Math.min(length, distance + 2));
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI - 90;
      swimmer.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
      progress.style.strokeDashoffset = String(1 - distance / length);
      // Keep a bright, continuous record of the route behind the swimmer.
      // A short foamy wake and bubbles follow the same curve, including bends.
      const wakePoints = Array.from({ length: 18 }, (_, index) => {
        const p = path.getPointAtLength(Math.max(0, distance - 38 - index * 8));
        return `${index ? 'L' : 'M'} ${p.x} ${p.y}`;
      });
      wake.setAttribute('d', wakePoints.join(' '));
      wake.style.opacity = distance > 55 ? '1' : '0';
      bubbles.forEach((bubble, index) => {
        const behind = 60 + index * 19;
        const p = path.getPointAtLength(Math.max(0, distance - behind));
        const spread = (index % 2 ? 1 : -1) * (5 + index * 1.5);
        bubble.setAttribute('transform', `translate(${p.x + spread} ${p.y})`);
        bubble.style.opacity = distance > behind ? String(1 - index * .1) : '0';
      });
      let current = -1;
      checkpoints.forEach((checkpoint, index) => { if (checkpoint <= y + 1) current = index; });
      stages.forEach((stage, index) => {
        stage.dataset.reached = String(reducedMotion.matches || index <= current);
        stage.dataset.current = String(!reducedMotion.matches && index === current);
        // Let the shark pass over a checkpoint without the dot covering its body.
        stage.querySelector<HTMLElement>('.shark-ocean-marker')!.style.opacity =
          !reducedMotion.matches && Math.abs(checkpoints[index] - y) < 46 ? '0' : '1';
      });
      // A little backward scrolling must not repeatedly restart the splash.
      // Rearm only after leaving the endpoint by a meaningful distance.
      if (reducedMotion.matches || y < endY - 100) {
        finished = false;
        root.dataset.finished = 'false';
      } else if (!finished && y >= endY - 2) {
        finished = true;
        root.dataset.finished = 'true';
      }
      root.dataset.ready = 'true';
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const onEntryEnd = (event: AnimationEvent) => {
      if (event.animationName !== 'shark-entry-flight') return;
      root.dataset.entry = 'complete';
      onScroll();
    };
    const measure = () => {
      const width = root.clientWidth;
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const center = mobile ? 29 : width / 2;
      const amplitude = mobile ? 8 : 54;
      const rootTop = root.getBoundingClientRect().top;
      startY = mobile ? 112 : 140;
      checkpoints = stages.map(stage => stage.getBoundingClientRect().top - rootTop + 42);
      endY = root.clientHeight - 48;
      root.dataset.startY = String(startY);
      root.dataset.endY = String(endY);
      const points = [startY, ...checkpoints, endY].map((y, index) => ({
        x: center + (index === 0 || index === checkpoints.length + 1 ? 0 : (index % 2 ? -1 : 1) * amplitude), y,
      }));
      const d = points.map((point, index) => {
        if (!index) return `M ${point.x} ${point.y}`;
        const previous = points[index - 1];
        const middle = (previous.y + point.y) / 2;
        return `C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.y}`;
      }).join(' ');
      svg.setAttribute('viewBox', `0 0 ${width} ${root.clientHeight}`);
      root.querySelectorAll('.shark-ocean-flow').forEach(flow => flow.setAttribute('d', d));
      length = path.getTotalLength();
      const endpoint = path.getPointAtLength(length);
      finish.setAttribute('transform', `translate(${endpoint.x} ${endpoint.y})`);
      const startpoint = path.getPointAtLength(0);
      entry.setAttribute('transform', `translate(${startpoint.x} ${startpoint.y})`);
      root.querySelectorAll<SVGGElement>('.shark-ocean-wavelet').forEach((wave, index) => {
        const stageIndex = Math.floor(index / 2);
        const start = checkpoints[stageIndex];
        const end = checkpoints[stageIndex + 1] ?? endY;
        const point = path.getPointAtLength(lengthAtY(start + (end - start) * (index % 2 ? 0.72 : 0.34)));
        wave.setAttribute('transform', `translate(${point.x} ${point.y})`);
      });
      stages.forEach((stage, index) => {
        stage.querySelector<HTMLElement>('.shark-ocean-marker')!.style.left = `${points[index + 1].x}px`;
      });
      paint();
    };
    const observer = new ResizeObserver(measure);
    const visibility = new IntersectionObserver(([entry]) => {
      root.dataset.inView = String(entry.isIntersecting);
    });
    visibility.observe(root);
    observer.observe(root);
    stages.forEach(stage => observer.observe(stage));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', paint);
    root.addEventListener('animationend', onEntryEnd);
    measure();
    return () => {
      observer.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', paint);
      root.removeEventListener('animationend', onEntryEnd);
    };
  }, [steps]);

  return (
    <div className="shark-ocean-timeline" ref={rootRef}>
      <svg className="shark-ocean-water" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <radialGradient id={`${id}-surface`}>
            <stop stopColor="#314d73" stopOpacity=".95" /><stop offset=".5" stopColor="#17395b" stopOpacity=".9" /><stop offset=".85" stopColor="#10203a" stopOpacity=".7" /><stop offset="1" stopColor="#10203a" stopOpacity="0" />
          </radialGradient>
          <path id={`${id}-pool-shape`} d="M-79 -1 C-69 -14 -45 -12 -29 -18 C-5 -25 16 -16 32 -18 C54 -21 70 -10 78 -4 C91 6 75 16 58 19 C39 31 16 25 -2 29 C-25 32 -35 23 -52 23 C-71 23 -88 12 -79 -1Z" />
          <clipPath id={`${id}-pool-clip`}><use href={`#${id}-pool-shape`} /></clipPath>
          <clipPath id={`${id}-breach-clip`}><rect x="-250" y="-300" width="500" height="312" /></clipPath>
          <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#93c5fd" /><stop offset="0.55" stopColor="#60a5fa" /><stop offset="1" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id={`${id}-shark`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#60a5fa" /><stop offset="0.45" stopColor="#dbeafe" /><stop offset="0.8" stopColor="#93c5fd" /><stop offset="1" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id={`${id}-depth`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#10203a" /><stop offset="0.5" stopColor="#17395b" /><stop offset="1" stopColor="#10203a" />
          </linearGradient>
          <linearGradient id={`${id}-air-skin`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#314d73" /><stop offset=".4" stopColor="#60a5fa" /><stop offset=".72" stopColor="#93c5fd" /><stop offset="1" stopColor="#dbeafe" />
          </linearGradient>
          <g id={`${id}-air-shark`} stroke="#93c5fd" strokeWidth=".8" strokeLinejoin="round">
            <path className="shark-ocean-side-tail" d="M-30 -2 Q-42 -9 -52 -24 L-47 -5 L-54 17 Q-41 13 -30 5Z" fill="#60a5fa" />
            <path d="M-8 -10 Q-4 -27 5 -31 L10 -9 M-4 8 L10 29 L17 10" fill="#2563eb" />
            <path d="M-35 0 C-17 -18 16 -20 42 -6 L54 1 Q37 7 30 12 C4 24 -19 12 -35 0Z" fill={`url(#${id}-air-skin)`} />
            <path d="M-29 4 Q11 17 48 2 Q32 14 12 15 Q-10 15 -29 4Z" fill="#dbeafe" stroke="none" />
            <path className="shark-ocean-side-fin" d="M4 7 L-4 28 L20 10Z" fill="#60a5fa" />
            <path d="M16 -5 L13 5 M21 -4 L18 6 M26 -3 L23 6" fill="none" stroke="#314d73" strokeWidth="1.2" />
            <circle cx="37" cy="-4" r="2" fill="#06070b" stroke="none" />
            <path d="M42 5 Q46 5 50 2" fill="none" stroke="#314d73" />
          </g>
        </defs>
        <path className="shark-ocean-flow shark-ocean-bank" />
        <path className="shark-ocean-flow shark-ocean-current" stroke={`url(#${id}-depth)`} />
        <path className="shark-ocean-flow shark-ocean-progress" pathLength="1" stroke={`url(#${id}-water)`} />
        {steps.flatMap((_, index) => [0, 1].map(wave => (
          <g className="shark-ocean-wavelet" key={`${index}-${wave}`}>
            <path d="M-15 -4 Q-8 -9 -1 -4 T13 -4 M-9 5 Q-3 1 3 5 T15 5" />
          </g>
        )))}
        <path className="shark-ocean-wake" />
        {Array.from({ length: 7 }, (_, index) => (
          <g className="shark-ocean-bubble" key={index}>
            <circle r={2 + index % 3} style={{ animationDelay: `${index * -0.23}s` }} />
          </g>
        ))}
        <g className="shark-ocean-entry">
          <WaterSurface id={id} />
          <WaterSplash delay={.98} />
          <g className="shark-ocean-entry-fish"><use className="shark-ocean-air-shape" href={`#${id}-air-shark`} /></g>
        </g>
        <g className="shark-ocean-finish">
          <WaterSurface id={id} landing />
          <g className="shark-ocean-takeoff"><WaterSplash delay={.18} /></g>
          <g className="shark-ocean-touchdown"><WaterSplash delay={1.3} /></g>
          <g clipPath={`url(#${id}-breach-clip)`}><g className="shark-ocean-exit-fish"><use className="shark-ocean-air-shape" href={`#${id}-air-shark`} /></g></g>
        </g>
        <g className="shark-ocean-swimmer">
          <g className="shark-ocean-arrival">
          <g className="shark-ocean-bow-wave" fill="none" stroke="#dbeafe" strokeWidth="1.3">
            <path d="M-24 -12 Q-28 20 0 44 Q28 20 24 -12" />
            <path d="M-30 -8 Q-34 27 0 52 Q34 27 30 -8" opacity="0.35" />
          </g>
          <g className="shark-ocean-fish"><g className="shark-ocean-body"><use href={`#${id}-air-shark`} transform="rotate(90)" /></g></g>
          </g>
        </g>
      </svg>
      <ol className="shark-ocean-stages" aria-label="Event timeline">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li className="shark-ocean-stage" key={step.title} data-tone={index % 2 ? 'pink' : 'blue'}>
              <span className="shark-ocean-marker" aria-hidden="true" />
              <article className="shark-ocean-card">
                <h3>{step.title}</h3>
                <div className="shark-ocean-details">
                  <p className="shark-ocean-date"><Calendar aria-hidden="true" />{step.timing}</p>
                  <p className="shark-ocean-description">{step.description}</p>
                  {step.location && <p className="shark-ocean-location"><MapPin aria-hidden="true" />{step.location}</p>}
                  <Icon className="shark-ocean-stage-icon" aria-hidden="true" />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
