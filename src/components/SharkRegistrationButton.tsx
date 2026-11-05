import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function SharkRegistrationButton({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const noticeId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="shark-nav-registration" ref={wrapper} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={trigger} type="button" className="shark-section-register shark-focus" aria-expanded={open} aria-controls={noticeId} onClick={() => { if (!open) onOpen?.(); setOpen(value => !value); }}>
        Registration <ArrowUpRight aria-hidden="true" />
      </button>
      {open && <div id={noticeId} className="shark-registration-notice">
        <div><strong>Registration link to be announced</strong><button type="button" className="shark-focus" aria-label="Close notice" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X aria-hidden="true" /></button></div>
        <p role="status">The official registration link will be available here once announced.</p>
      </div>}
    </div>
  );
}
