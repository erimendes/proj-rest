import axios from 'axios';

export const api = axios.create({ 
  // 3000 é a porta padrão do NestJS. 
  // Se você mudou no seu main.ts do backend, coloque a porta certa aqui.
  baseURL: 'http://localhost:3000' 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Restaurante:token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});