import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-sm',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'text-impulse-white border border-impulse-blue/40 bg-impulse-blue/10 hover:bg-impulse-blue/20 hover:border-impulse-blue/60 energy-sweep backdrop-blur-sm',
  secondary: 'text-impulse-gray-light border border-space-600 hover:border-impulse-blue/40 hover:text-impulse-white transition-colors',
  ghost: 'text-impulse-gray-light hover:text-impulse-white transition-colors',
  link: 'text-impulse-blue-bright hover:text-impulse-white transition-colors group',
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-mono-label font-medium tracking-extra-wide uppercase rounded-none transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
