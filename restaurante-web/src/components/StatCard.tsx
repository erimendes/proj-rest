// Adicionamos a palavra 'type' antes do nome do ícone
import type { LucideIcon } from 'lucide-react'; 

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon; // Agora o TS aceita o uso do tipo aqui
  colorClass: string;
}

export function StatCard({ label, value, icon: Icon, colorClass }: StatCardProps) {
  return (
    <div className={`bg-slate-900 p-10 rounded-[3.5rem] border-b-[12px] ${colorClass} shadow-2xl relative overflow-hidden`}>
      {/* O ícone renderiza normalmente como um componente */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Icon size={80} />
      </div>
      <p className="mb-4 font-black uppercase tracking-widest text-xs flex items-center gap-2 opacity-80">
        <Icon size={16} /> {label}
      </p>
      <h2 className="text-5xl font-black italic font-mono tracking-tighter">
        {value}
      </h2>
    </div>
  );
}