import type { Metadata } from 'next'
import { Inter } from 'next/font/google' // Fonte moderna
import './globals.css' // Certifique-se de que o Tailwind está importado aqui

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurante POS | Mesas',
  description: 'Sistema de Ponto de Venda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50 flex`}>
        {/* Sidebar fixa */}
        <aside className="w-64 bg-white min-h-screen p-6 border-r border-gray-100 flex flex-col">
          <div className="text-2xl font-black text-blue-700 mb-12">Restaurant<span className="text-gray-900">App</span></div>
          
          <nav className="flex flex-col gap-3 flex-1">
            {/* Links de navegação fictícios */}
            {['Dashboard', 'Mesas', 'Pedidos', 'Cardápio', 'Relatórios'].map(item => (
              <a 
                key={item} 
                href="#" 
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${item === 'Mesas' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto p-4 bg-gray-100 rounded-lg text-xs text-gray-500">Logado como: admin@dev.com</div>
        </aside>
        
        {/* Conteúdo principal */}
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  )
}