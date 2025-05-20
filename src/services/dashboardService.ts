import axios from 'axios';

// Change this line - add /api if it's not included in VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL ? 
  `${import.meta.env.VITE_API_URL}/api` : 
  '/api';

export interface DashboardStats {
  totalReports: number;
  healthScore: number;
  riskFactors: number;
  nextCheckup: number;
}

export interface DashboardError {
  message: string;
  status?: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const token = localStorage.getItem('token');
    console.log('Requesting dashboard stats from:', `${API_URL}/reports/stats`);
    
    const response = await axios.get(`${API_URL}/reports/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Dashboard stats error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message || 'Failed to fetch dashboard data',
        status: error.response.status
      };
    }
    throw { message: 'Network error occurred' };
  }
};

export const getUserReports = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Requesting user reports from:', `${API_URL}/reports`);
    
    const response = await axios.get(`${API_URL}/reports`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('User reports error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message || 'Failed to fetch reports',
        status: error.response.status
      };
    }
    throw { message: 'Network error occurred' };
  }
};