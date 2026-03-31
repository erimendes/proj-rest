export function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-3 text-slate-500" size={20} />}
      <input
        {...props}
        className={`w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-orange-500 outline-none text-white transition-all ${Icon ? 'pl-10' : ''}`}
      />
    </div>
  );
}
