import { BrowserRouter } from 'react-router-dom'; // 1. Importe isso
import { AuthProvider } from './app/providers/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter> {/* 2. Envolva toda a aplicação */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
