interface TechnicalLabelProps {
  text: string;
  x?: string;
  y?: string;
  className?: string;
}

export default function TechnicalLabel({ text, x, y, className = '' }: TechnicalLabelProps) {
  return (
    <span
      className={`absolute font-mono-label text-[10px] text-impulse-blue-bright/40 pointer-events-none ${className}`}
      style={x || y ? { left: x, top: y } : undefined}
    >
      {text}
    </span>
  );
}
