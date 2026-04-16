import { Navigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthContext";
import React from "react"; // Certifique-se de importar o React

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    // O 'replace' impede que o usuário volte para a rota protegida ao clicar em "Voltar"
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
