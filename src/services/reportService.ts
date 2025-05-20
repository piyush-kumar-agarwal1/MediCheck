import { API_BASE_URL } from '@/config/api';
import { axios } from '@/lib/axios';

// Upload a report file
export const uploadReport = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    // Change from /reports/upload to /reports
    console.log('Uploading report to:', `${API_BASE_URL}/api/reports`);
    
    const response = await axios.post(`${API_BASE_URL}/api/reports`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to upload report');
    }
    throw new Error('Failed to upload report');
  }
};

// Update the manual report submission function
export const uploadManualReport = async (reportData: any) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Submitting manual report, data:', reportData);
    
    // Check required fields before sending
    if (!reportData.title || !reportData.type) {
      throw new Error('Title and type are required');
    }
    
    // Instead of FormData, send as JSON which is easier to debug
    const response = await axios.post(`${API_BASE_URL}/api/reports/manual`, reportData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Manual report submission error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to submit report data');
    }
    throw new Error('Network error occurred');
  }
};

// Get a report by ID
export const getReportById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch report');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching report ${id}:`, error);
    throw error;
  }
};

// Add this function to get user reports
export const getUserReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch reports');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user reports:', error);
    throw error;
  }
};