import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  return (
    <div
      className={`relative ${sizeMap[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paint dab style circles */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          className="text-museum-slate opacity-20"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          className="text-museum-gold"
          strokeLinecap="round"
          strokeDasharray="70 212"
          strokeDashoffset="0"
          style={{
            transformOrigin: 'center',
          }}
        />
        {/* Small paint dab accents */}
        <circle
          cx="50"
          cy="5"
          r="6"
          fill="currentColor"
          className="text-museum-gold-light opacity-80"
        />
        <circle
          cx="92"
          cy="50"
          r="4"
          fill="currentColor"
          className="text-museum-gold opacity-60"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
