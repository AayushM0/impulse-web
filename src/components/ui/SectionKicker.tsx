import React from 'react';

export interface SectionKickerProps {
  number?: string;
  label: string;
  className?: string;
}

export const SectionKicker: React.FC<SectionKickerProps> = ({
  number,
  label,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#93C5FD] border border-[#2563EB]/40 bg-[#070B14]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-3 shadow-[0_2px_14px_rgba(7,11,20,0.8)] ${className}`.trim()}
      aria-label={number ? `Section ${number}: ${label}` : label}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_10px_#60A5FA] animate-pulse"
        aria-hidden="true"
      />
      <span>{number ? `${number} // ${label}` : label}</span>
    </div>
  );
};
