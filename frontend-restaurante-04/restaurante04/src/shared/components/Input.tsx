<<<<<<< HEAD
export function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />}
      <input {...props} className={`w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-orange-500 outline-none text-white transition-all ${Icon ? 'pl-10' : 'pl-4'}`} />
=======
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
>>>>>>> e678f64ebc5163927a86c79db1b3813e2b46f83f
    </div>
  );
}
