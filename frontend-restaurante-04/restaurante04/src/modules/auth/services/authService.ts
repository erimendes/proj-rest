import { api } from '../../../core/services/api';

export const registerRequest = async (name: string, email: string, password: string) => {
  // Ajuste a URL e os campos conforme o seu backend (ex: /auth/register ou /users)
  return await api.post('/register', { name, email, password });
};

export const loginRequest = async (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};
