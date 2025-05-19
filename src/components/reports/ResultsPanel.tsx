
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for charts
const trendsData = [
  { month: 'Jan', cholesterol: 220, glucose: 95 },
  { month: 'Feb', cholesterol: 210, glucose: 92 },
  { month: 'Mar', cholesterol: 205, glucose: 90 },
  { month: 'Apr', cholesterol: 195, glucose: 88 },
  { month: 'May', cholesterol: 185, glucose: 86 },
  { month: 'Jun', cholesterol: 180, glucose: 85 },
];

const biomarkersData = [
  { name: 'Hemoglobin', value: 14.2, reference: '13.5-17.5 g/dL', status: 'normal' },
  { name: 'White Blood Cells', value: 8.2, reference: '4.5-11.0 x10^9/L', status: 'normal' },
  { name: 'Platelets', value: 250, reference: '150-450 x10^9/L', status: 'normal' },
  { name: 'Total Cholesterol', value: 180, reference: '<200 mg/dL', status: 'normal' },
  { name: 'HDL Cholesterol', value: 65, reference: '>40 mg/dL', status: 'optimal' },
  { name: 'LDL Cholesterol', value: 110, reference: '<100 mg/dL', status: 'borderline' },
  { name: 'Triglycerides', value: 95, reference: '<150 mg/dL', status: 'normal' },
  { name: 'Glucose', value: 85, reference: '70-100 mg/dL', status: 'normal' },
];

const riskAssessmentData = [
  { name: 'Heart Disease', value: 15 },
  { name: 'Diabetes', value: 8 },
  { name: 'Hypertension', value: 12 },
  { name: 'Other', value: 65 },
];

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

const ResultsPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'optimal':
        return 'text-green-700 bg-green-100';
      case 'normal':
        return 'text-blue-700 bg-blue-100';
      case 'borderline':
        return 'text-yellow-700 bg-yellow-100';
      case 'high':
        return 'text-orange-700 bg-orange-100';
      case 'critical':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['overview', 'biomarkers', 'trends', 'recommendations'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Report Analysis</h2>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                Healthy
              </span>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Summary</h3>
              <p className="text-gray-600">
                Your report shows good overall health with most biomarkers within normal ranges. Your cholesterol levels have improved compared to previous results, and your blood pressure is well-controlled. Continue with your current healthy lifestyle habits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Key Metrics</h3>
                <div className="space-y-4">
                  {biomarkersData.slice(3, 7).map((marker, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{marker.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{marker.value}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(marker.status)}`}>
                          {marker.status.charAt(0).toUpperCase() + marker.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Risk Assessment</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskAssessmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskAssessmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Download PDF
              </Button>
              <Button className="bg-primary-500 hover:bg-primary-600">
                Share with Doctor
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'biomarkers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Biomarkers Analysis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Biomarker
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Your Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference Range
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {biomarkersData.map((marker, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {marker.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {marker.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {marker.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(marker.status)}`}>
                          {marker.status.charAt(0).toUpperCase() + marker.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Health Trends</h2>
            <p className="text-gray-600">
              Track how your key health metrics have changed over the past 6 months.
            </p>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="glucose" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Improvement Analysis</h3>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-green-800 font-medium">Positive Trend Detected</h4>
                    <p className="mt-1 text-green-700">
                      Your cholesterol levels have improved by 18% over the past 6 months, which is excellent progress. Continue with your current diet and exercise regimen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Personalized Recommendations</h2>
            <p className="text-gray-600">
              Based on your report analysis, our AI has generated these personalized health recommendations.
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Diet Recommendations</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Continue with your diet rich in fruits, vegetables and whole grains
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Consider increasing omega-3 rich foods like fatty fish and walnuts
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Maintain your water intake of 8 glasses per day
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-800 mb-2">Exercise Recommendations</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Continue with your 30+ minutes of daily moderate activity
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Consider adding 2-3 days of strength training per week
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Try incorporating more flexibility exercises like yoga
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h3 className="text-lg font-medium text-purple-800 mb-2">Follow-up Recommendations</h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Schedule your next blood test in 6 months
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Continue annual check-ups with your primary care physician
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Consider a stress management evaluation at your next visit
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-primary-500 hover:bg-primary-600">
                Email Recommendations
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
