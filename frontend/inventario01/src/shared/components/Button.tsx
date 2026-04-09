export function Button({ children, loading, ...props }: any) {
  return (
    <button
      {...props}
      className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 transition p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-white cursor-pointer"
    >
      {loading ? "Processando..." : children}
    </button>
  );
}
