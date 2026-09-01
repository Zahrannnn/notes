import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white hover:bg-brand-700 focus-visible:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500',
        secondary:
          'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
        ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
      },
      size: {
        sm: 'min-h-9 px-3 text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonBaseProps & {
    asChild?: false;
  };

type ButtonAsChildProps = ButtonBaseProps & {
  asChild: true;
  children: ReactElement<{ className?: string }>;
  className?: string;
};

export function Button(props: ButtonProps | ButtonAsChildProps) {
  const { variant, size } = props;
  const className = cn(buttonVariants({ variant, size }), props.className);

  if ('asChild' in props && props.asChild) {
    return isValidElement(props.children)
      ? cloneElement(props.children, {
          className: cn(className, props.children.props.className),
        })
      : null;
  }

  const { children, ...restProps } = props;
  const buttonProps = { ...restProps } as Record<string, unknown>;
  delete buttonProps.variant;
  delete buttonProps.size;
  delete buttonProps.asChild;

  return (
    <button className={className} {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children as ReactNode}
    </button>
  );
}
