import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-orange-500 text-white transition-colors placeholder:text-slate-600 ${className}`}
      />
    </div>
  );
}
