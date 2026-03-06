import { jsx as _jsx } from "react/jsx-runtime";
const baseButtonClasses = 'inline-flex items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
const variantClasses = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 border-transparent',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-slate-200',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 border-transparent',
};
export const Button = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
    const variantClass = variantClasses[variant];
    const sizeClass = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4';
    return _jsx("button", { className: `${baseButtonClasses} ${variantClass} ${sizeClass} ${className}`, ...props });
};
export const Card = ({ className = '', ...props }) => (_jsx("div", { className: `rounded-xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800 ${className}`, ...props }));
export const CardHeader = ({ className = '', ...props }) => (_jsx("div", { className: `px-4 py-3 border-b border-slate-100 flex items-center justify-between ${className}`, ...props }));
export const CardBody = ({ className = '', ...props }) => (_jsx("div", { className: `p-4 ${className}`, ...props }));
