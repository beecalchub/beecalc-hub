import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export function Card({ children, className = '', interactive = false, padding = 'md' }: CardProps) {
  return (
    <div className={`${interactive ? 'card-interactive' : 'card-base'} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
