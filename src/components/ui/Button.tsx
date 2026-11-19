import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  external?: boolean;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      to,
      external = false,
      href,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono-label tracking-wider transition-all duration-300 select-none outline-none focus-visible:outline-2 focus-visible:outline-[#60A5FA] focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-lg';

    const sizeStyles = {
      sm: 'text-[11px] px-3.5 py-2 min-h-[36px] gap-1.5',
      md: 'text-xs px-5 py-2.5 min-h-[44px] gap-2',
      lg: 'text-sm px-8 py-3.5 min-h-[50px] gap-3',
    };

    const variantStyles = {
      primary:
        'text-white bg-gradient-to-r from-[#2563EB] to-[#EC4899] hover:from-blue-500 hover:to-pink-500 shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_22px_rgba(236,72,153,0.4)] border-0 energy-sweep',
      secondary:
        'text-[#F2F6FF] bg-[#0E1626] border border-[#1E2A44] hover:border-[#60A5FA]/60 hover:bg-[#141D30] hover:shadow-[0_0_16px_rgba(37,99,235,0.2)]',
      ghost:
        'text-[#9AA8C2] bg-transparent border border-transparent hover:text-[#F2F6FF] hover:bg-[#0E1626]/60',
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
      fullWidth ? 'w-full' : ''
    } ${className}`.trim();

    if (to) {
      return (
        <Link
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          aria-disabled={disabled}
        >
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-disabled={disabled}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
