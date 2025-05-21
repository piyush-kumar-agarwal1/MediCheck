import axios from '@/lib/axios';
import { API_BASE_URL, getApiUrl } from '@/config/api';

// Upload a report file
export const uploadReport = async (formData: FormData) => {  try {
    console.log('Uploading to:', `${API_BASE_URL}/api/reports`);
    
    // For development/demo, simulate a successful response
    // Comment this for production
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ 
    //       success: true, 
    //       reportId: 'demo-' + Math.random().toString(36).substring(2, 10),
    //       message: 'Report uploaded successfully'
    //     });
    //   }, 2000);
    // });
    
    // Use this for production
    const response = await axios.post('/api/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Report upload error:', error);
    throw error;
  }
};

// Update the manual report submission function
export const uploadManualReport = async (reportData: Record<string, unknown>) => {
  try {
    // Use this for production
    const response = await axios.post('/api/reports/manual', reportData);
    return response.data;
    
    /* If you need a demo mode, uncomment this:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          reportId: 'manual-' + Math.random().toString(36).substring(2, 10),
          message: 'Manual report data saved successfully'
        });
      }, 1500);
    });
    */
  } catch (error) {
    console.error('Manual report submission error:', error);
    throw error;
  }
};

// Get a report by ID
export const getReportById = async (id: string) => {
  try {
    console.log(`Fetching report with ID ${id}`);
    
    const response = await axios.get(`/api/reports/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

// Add this function to get user reports
export const getUserReports = async () => {
  try {
    const response = await axios.get('/api/reports');
    return response.data;
  } catch (error) {
    console.error('Error fetching user reports:', error);
    throw error;
  }
};

// Add other report-related services like fetching reports, etc.
export const getReport = async (reportId: string) => {
  try {
    // For development/demo, you can simulate a successful response
    // or use the real API endpoint
    
    // Use this for production
    const response = await axios.get(`/api/reports/${reportId}`);
    return response.data;
    
    /* If you need a demo mode, uncomment this:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          id: reportId,
          title: 'Demo Report',
          type: 'blood_work',
          date: new Date().toISOString(),
          status: 'completed',
          results: {
            summary: 'This is a demo report summary.',
            details: 'Details would go here in a real report.',
            recommendations: ['Recommendation 1', 'Recommendation 2']
          }
        });
      }, 1000);
    });
    */
  } catch (error) {
    console.error('Report fetch error:', error);
    throw error;
  }
};