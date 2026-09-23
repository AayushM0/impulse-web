import type { ReactNode } from 'react';
import SectionLabel from './SectionLabel';

interface SectionHeaderProps {
  index: string;
  label: string;
  headline: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({ index, label, headline, description, align = 'left', className = '' }: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      <SectionLabel index={index} label={label} className={align === 'center' ? 'justify-center' : ''} />
      <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-sans text-impulse-white leading-[1.05] tracking-tight">
        {headline}
      </h2>
      {description && (
        <p className="mt-6 text-base lg:text-lg text-impulse-gray-light/60 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
