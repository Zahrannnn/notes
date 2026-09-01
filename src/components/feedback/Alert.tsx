import type { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const alertVariants = cva('rounded-md border px-4 py-3 text-sm', {
  variants: {
    variant: {
      info: 'border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100',
      error:
        'border-red-200 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
      success:
        'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type AlertProps = PropsWithChildren<VariantProps<typeof alertVariants> & { className?: string }>;

export function Alert({ children, variant, className }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} role="status">
      {children}
    </div>
  );
}
