// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/api/contact`,
  partner: `${API_BASE_URL}/api/partner`,
};
