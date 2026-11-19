import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl border transition-all duration-300 relative overflow-hidden';

    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4 sm:p-5',
      md: 'p-6 sm:p-8',
      lg: 'p-8 sm:p-10 lg:p-12',
    };

    const variantStyles = {
      default: 'bg-[#0E1626] border-[#1E2A44] text-[#F2F6FF]',
      interactive:
        'bg-[#0E1626] border-[#1E2A44] hover:border-[#60A5FA]/50 hover:bg-[#141D30] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(37,99,235,0.15)] text-[#F2F6FF] cursor-pointer',
      glass:
        'bg-[#0E1626]/75 backdrop-blur-xl border-[#1E2A44] hover:border-[#60A5FA]/40 text-[#F2F6FF]',
    };

    const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
