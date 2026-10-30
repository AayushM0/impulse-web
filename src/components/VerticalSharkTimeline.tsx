import { Calendar, MapPin } from 'lucide-react';
import type { TimelineStep } from './SharkTimeline';
import './VerticalSharkTimeline.css';

export default function VerticalSharkTimeline({ steps }: { steps: readonly TimelineStep[] }) {
  return (
    <ol className="shark-vertical-timeline" aria-label="Event timeline">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const tone = index === steps.length - 1 ? 'teal' : index % 2 ? 'pink' : 'blue';
        return (
          <li key={step.title} className="shark-vertical-stage" data-tone={tone}>
            <span className="shark-vertical-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <article className="shark-vertical-card">
              <div className="shark-vertical-card-top"><span>Stage {String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /></div>
              <p className="shark-vertical-date"><Calendar aria-hidden="true" />{step.timing}</p>
              <h3>{step.title}</h3>
              <p className="shark-vertical-description">{step.description}</p>
              {step.location && <p className="shark-vertical-location"><MapPin aria-hidden="true" />{step.location}</p>}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
