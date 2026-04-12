import { useAuth } from '../app/providers/AuthContext';
import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';

export function AppRoutes() {
  const { token } = useAuth();
  return token ? <HomePage key={token} /> : <AuthPage />;
}
