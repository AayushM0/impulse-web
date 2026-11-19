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
      className={`inline-flex items-center gap-2 font-mono-label text-[11px] text-[#60A5FA]/80 border border-[#1E2A44] bg-[#0E1626]/70 backdrop-blur-md px-3.5 py-1 rounded-full mb-3 shadow-[0_2px_8px_rgba(7,11,20,0.6)] ${className}`.trim()}
      aria-label={number ? `Section ${number}: ${label}` : label}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shadow-[0_0_8px_#2563EB] animate-pulse"
        aria-hidden="true"
      />
      <span>{number ? `${number} // ${label}` : label}</span>
    </div>
  );
};
