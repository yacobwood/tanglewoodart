import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sm px-2.5 py-0.5 text-xs font-sans font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-museum-gold focus:ring-offset-2',
  {
    variants: {
      variant: {
        sold: 'bg-red-900 bg-opacity-80 text-red-200 border border-red-700',
        new: 'bg-museum-gold bg-opacity-20 text-museum-gold border border-museum-gold',
        featured:
          'bg-museum-gold text-museum-dark border border-museum-gold-light shadow-gold-glow',
        gold: 'bg-museum-gold text-museum-dark border border-museum-gold-light shadow-gold-glow',
        secondary:
          'bg-museum-slate/30 text-museum-cream/80 border border-museum-slate',
        muted:
          'bg-museum-charcoal text-museum-cream/60 border border-museum-slate/50',
        default:
          'bg-museum-charcoal text-museum-cream border border-museum-slate',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, className })}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
