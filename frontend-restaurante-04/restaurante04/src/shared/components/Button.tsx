export function Button({ children, loading, ...props }: any) {
  return (
    <button {...props} className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 transition p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-white cursor-pointer shadow-lg shadow-orange-900/20">
      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
    </button>
  );
}
