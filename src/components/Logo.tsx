import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function Logo({
  size = 'md',
  showText = true,
  className = '',
  asLink = true,
}: LogoProps) {
  const dimensions = {
    sm: { box: 'w-8 h-8', text: 'text-base font-semibold' },
    md: { box: 'w-10 h-10', text: 'text-xl font-bold' },
    lg: { box: 'w-16 h-16', text: 'text-3xl font-extrabold' },
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <div className={`${dimensions[size].box} relative flex-shrink-0 flex items-center justify-center`}>
        <picture>
          <source srcSet="/images/impulse-logo.webp" type="image/webp" />
          <img
            src="/images/impulse-logo.png"
            alt="IMPULSE"
            width={size === 'sm' ? 32 : size === 'lg' ? 64 : 40}
            height={size === 'sm' ? 32 : size === 'lg' ? 64 : 40}
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(96,165,250,0.45)] group-hover:drop-shadow-[0_0_14px_rgba(244,114,182,0.7)] group-hover:scale-105 transition-all duration-300 pointer-events-none"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </picture>
      </div>
      {showText && (
        <span className={`${dimensions[size].text} font-sans tracking-[0.1em] text-impulse-white group-hover:text-white transition-colors duration-200`}>
          IMPULSE
        </span>
      )}
    </div>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link to="/" className="inline-flex items-center" aria-label="IMPULSE home">
      {content}
    </Link>
  );
}
