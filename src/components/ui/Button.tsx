import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-500/20',
      secondary: 'border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]',
      ghost: 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20',
    };

    const sizes = {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
    const sizes = { sm: 'p-1', md: 'p-1.5', lg: 'p-2' };
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('rounded-lg', sizes[size], className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';
