import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const dimensions = {
    sm: { box: 'w-7 h-7', text: 'text-base' },
    md: { box: 'w-9 h-9', text: 'text-xl' },
    lg: { box: 'w-14 h-14', text: 'text-3xl' },
  };

  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="IMPULSE home">
      <div className={`${dimensions[size].box} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Starburst lines */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#3B82F6" strokeWidth="2" opacity="0.7" className="group-hover:opacity-100 transition-opacity" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#3B82F6" strokeWidth="2" opacity="0.7" className="group-hover:opacity-100 transition-opacity" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#6366F1" strokeWidth="1.5" opacity="0.5" className="group-hover:opacity-80 transition-opacity" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#6366F1" strokeWidth="1.5" opacity="0.5" className="group-hover:opacity-80 transition-opacity" />
          {/* Outer extensions */}
          <line x1="50" y1="2" x2="50" y2="10" stroke="#EC4899" strokeWidth="1" opacity="0.4" />
          <line x1="50" y1="90" x2="50" y2="98" stroke="#EC4899" strokeWidth="1" opacity="0.4" />
          <line x1="2" y1="50" x2="10" y2="50" stroke="#EC4899" strokeWidth="1" opacity="0.4" />
          <line x1="90" y1="50" x2="98" y2="50" stroke="#EC4899" strokeWidth="1" opacity="0.4" />
          {/* Nodes */}
          <circle cx="50" cy="50" r="5" fill="#F8FAFC" />
          <circle cx="50" cy="50" r="2.5" fill="#60A5FA" />
          <circle cx="50" cy="10" r="2.5" fill="#3B82F6" />
          <circle cx="50" cy="90" r="2.5" fill="#3B82F6" />
          <circle cx="10" cy="50" r="2.5" fill="#3B82F6" />
          <circle cx="90" cy="50" r="2.5" fill="#3B82F6" />
          <circle cx="22" cy="22" r="2" fill="#6366F1" />
          <circle cx="78" cy="78" r="2" fill="#6366F1" />
          <circle cx="78" cy="22" r="2" fill="#6366F1" />
          <circle cx="22" cy="78" r="2" fill="#6366F1" />
        </svg>
      </div>
      {showText && (
        <span className={`${dimensions[size].text} font-sans font-semibold tracking-wide-sm text-impulse-white tracking-[0.1em]`}>
          IMPULSE
        </span>
      )}
    </Link>
  );
}
