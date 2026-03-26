import { Star } from 'lucide-react';

interface RankingItemProps {
  name: string;
  total: number;
  index: number;
}

export function RankingItem({ name, total, index }: RankingItemProps) {
  return (
    <div className="group flex items-center justify-between bg-black/40 p-8 rounded-[2.5rem] hover:bg-orange-600 transition-all border border-white/5">
      <div className="flex items-center gap-10">
        <span className="text-4xl font-black italic text-slate-800 group-hover:text-white/30">
          {index === 0 ? <Star className="text-yellow-500 fill-yellow-500" /> : `#0${index + 1}`}
        </span>
        <span className="text-3xl font-black uppercase italic tracking-tighter text-white">
          {name}
        </span>
      </div>
      <div className="text-right">
        <span className="block text-5xl font-black text-orange-500 group-hover:text-white italic leading-none font-mono">
          {total}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-white/70">
          Unidades
        </span>
      </div>
    </div>
  );
}