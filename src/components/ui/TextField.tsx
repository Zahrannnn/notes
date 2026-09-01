import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, error, className, ...inputProps },
  ref,
) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={
          className ??
          'min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-600'
        }
        ref={ref}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} className="text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
});
