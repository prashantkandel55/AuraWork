import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}

const baseButtonClasses =
  'inline-flex items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700 border-transparent',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-slate-200',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 border-transparent',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
  const variantClass = variantClasses[variant];
  const sizeClass = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4';
  return <button className={`${baseButtonClasses} ${variantClass} ${sizeClass} ${className}`} {...props} />;
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', ...props }) => (
  <div
    className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 ${className}`}
    {...props}
  />
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`px-4 py-3 border-b border-slate-100 flex items-center justify-between ${className}`} {...props} />
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props} />
);

