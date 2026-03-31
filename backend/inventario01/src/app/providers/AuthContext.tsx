import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem('@Inventario:token'));

  const login = (newToken: string) => {
    localStorage.setItem('@Inventario:token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('@Inventario:token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
