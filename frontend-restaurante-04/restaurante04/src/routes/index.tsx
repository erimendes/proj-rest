import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';

import AuthPage from '../modules/auth/pages/AuthPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import HomePage from '../modules/home/pages/HomePage';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* privada */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
