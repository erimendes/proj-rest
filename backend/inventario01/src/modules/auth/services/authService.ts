import { api } from '../../../core/services/api';

export const loginRequest = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const registerRequest = (data: any) => 
  api.post('/auth/register', data);
