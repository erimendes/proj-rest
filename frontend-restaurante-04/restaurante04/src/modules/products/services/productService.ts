import { api } from '../../../core/services/api';

export const getProductsRequest = () => api.get('/products');
export const getCategoriesRequest = () => api.get('/categories');
