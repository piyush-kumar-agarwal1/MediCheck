// Configuration for API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Ensure the URL ends with a trailing slash if your API endpoints don't start with /
export const getApiUrl = (endpoint: string) => {
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${baseUrl}${cleanEndpoint}`;
};