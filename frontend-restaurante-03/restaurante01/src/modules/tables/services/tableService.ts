import { api } from '../../../core/services/api';

export const getTablesRequest = () => api.get('/tables');

// O seu backend espera { "number": 1 } conforme o log do POST
export const createTableRequest = (number: number) => 
  api.post('/tables', { number });
