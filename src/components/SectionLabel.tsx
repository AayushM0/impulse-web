interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionLabel({ index, label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 font-mono-label text-impulse-blue-bright/80 ${className}`}>
      <span className="text-impulse-blue-bright/50">{index}</span>
      <span className="w-8 h-px bg-impulse-blue/30" />
      <span>{label}</span>
    </div>
  );
}
