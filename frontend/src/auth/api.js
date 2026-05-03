import axios from 'axios';
import { useAuth } from './AuthContext';

// Axios instance with auth header and base URL for proxy
export function getApi(auth) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 10000,
  });
  
  instance.interceptors.request.use(config => {
    // Remove authentication since backend doesn't require it
    return config;
  });
  
  return instance;
}