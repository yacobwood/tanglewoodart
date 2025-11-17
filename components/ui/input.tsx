import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-museum-cream mb-2 font-sans"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-museum-charcoal
            border-2
            ${error ? 'border-red-500' : 'border-museum-slate'}
            rounded-md
            text-museum-cream
            font-sans
            placeholder:text-museum-slate
            focus:outline-none
            focus:border-museum-gold
            focus:ring-2
            focus:ring-museum-gold
            focus:ring-opacity-20
            transition-all
            duration-300
            ease-museum
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-red-500 font-sans"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="mt-2 text-sm text-museum-slate font-sans"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
