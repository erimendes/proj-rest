"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [tables, setTables] = useState([])

  // Simulando dados enquanto o backend não está pronto
  useEffect(() => {
    // Quando o backend estiver rodando, use esta linha:
    // fetch("http://localhost:3001/tables").then(res=>res.json()).then(setTables)
    
    // Dados fictícios para teste visual
    setTables([
      { id: "1", number: 1, status: "LIVRE" },
      { id: "2", number: 2, status: "OCUPADA" },
      { id: "3", number: 3, status: "RESERVADA" },
      { id: "4", number: 4, status: "LIVRE" },
    ])
  }, [])

  return (
    // Container principal: padding, fundo cinza claro, tela cheia
    <main className="p-8 bg-gray-50 min-h-screen text-gray-900">
      
      {/* Título: fonte grande, negrito, margem inferior */}
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight text-gray-950">
        Mesas
      </h1>

      {/* Grid: 1 coluna no celular, 2 em tablets, 4 em computadores, espaçamento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {tables.map((t: any) => (
          // Cartão da mesa: sombra, borda arredondada, fundo branco, padding, hover effect
          <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col gap-3 group">
            
            <div className="flex justify-between items-center">
              {/* Número da mesa destacado */}
              <span className="text-xl font-bold text-gray-800">Mesa</span>
              <span className="text-5xl font-black text-blue-600 transition-transform group-hover:scale-110">
                {t.number}
              </span>
            </div>
            
            {/* Status com cor condicional */}
            <div className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
              t.status === 'LIVRE' ? 'bg-green-100 text-green-700' :
              t.status === 'OCUPADA' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {t.status}
            </div>

            {/* Botão de ação (exemplo) */}
            <button className="mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg text-sm transition-colors">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}