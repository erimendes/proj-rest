import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';

import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';
import ProductsPage from '../modules/products/pages/ProductsPage';
import CategoriesPage from '../modules/categories/pages/CategoriesPage';
import UsersPage from '../modules/users/pages/UsersPage';
import TablesPage from '../modules/tables/pages/TablesPage';

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <AuthPage /> : <Navigate to="/" />} />

        <Route element={token ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/mesas" element={<TablesPage />} />
          <Route path="/mesas" element={<TablesPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
