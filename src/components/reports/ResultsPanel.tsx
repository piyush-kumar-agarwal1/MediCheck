import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

// Update the component to accept report data as props
const ResultsPanel = ({ report }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [biomarkersData, setBiomarkersData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [riskAssessmentData, setRiskAssessmentData] = useState([]);
  
  useEffect(() => {
    // Process report data when it changes
    if (report) {
      processReportData();
    }
  }, [report]);

  // Format report data for display
  const processReportData = () => {
    // Create biomarkers data
    let biomarkers = [];
    if (report?.type === 'blood_work' && report.biomarkers) {
      // Extract and format blood work data
      if (report.biomarkers.hemoglobin) {
        biomarkers.push({
          name: 'Hemoglobin',
          value: parseFloat(report.biomarkers.hemoglobin),
          reference: '13.5-17.5 g/dL',
          status: getStatusForValue('hemoglobin', parseFloat(report.biomarkers.hemoglobin))
        });
      }
      if (report.biomarkers.wbc) {
        biomarkers.push({
          name: 'White Blood Cells',
          value: parseFloat(report.biomarkers.wbc),
          reference: '4.5-11.0 x10^9/L',
          status: getStatusForValue('wbc', parseFloat(report.biomarkers.wbc))
        });
      }
      if (report.biomarkers.platelets) {
        biomarkers.push({
          name: 'Platelets',
          value: parseFloat(report.biomarkers.platelets),
          reference: '150-450 x10^9/L',
          status: getStatusForValue('platelets', parseFloat(report.biomarkers.platelets))
        });
      }
      if (report.biomarkers.totalCholesterol) {
        biomarkers.push({
          name: 'Total Cholesterol',
          value: parseFloat(report.biomarkers.totalCholesterol),
          reference: '<200 mg/dL',
          status: getStatusForValue('cholesterol', parseFloat(report.biomarkers.totalCholesterol))
        });
      }
      if (report.biomarkers.hdl) {
        biomarkers.push({
          name: 'HDL Cholesterol',
          value: parseFloat(report.biomarkers.hdl),
          reference: '>40 mg/dL',
          status: getStatusForValue('hdl', parseFloat(report.biomarkers.hdl))
        });
      }
      if (report.biomarkers.ldl) {
        biomarkers.push({
          name: 'LDL Cholesterol',
          value: parseFloat(report.biomarkers.ldl),
          reference: '<100 mg/dL',
          status: getStatusForValue('ldl', parseFloat(report.biomarkers.ldl))
        });
      }
      if (report.biomarkers.glucose) {
        biomarkers.push({
          name: 'Glucose',
          value: parseFloat(report.biomarkers.glucose),
          reference: '70-100 mg/dL',
          status: getStatusForValue('glucose', parseFloat(report.biomarkers.glucose))
        });
      }
      // Add other biomarkers as needed
    } else if (report?.type === 'physical_exam' && report.examination) {
      // Extract physical examination data
      if (report.examination.systolicBP && report.examination.diastolicBP) {
        biomarkers.push({
          name: 'Blood Pressure',
          value: `${report.examination.systolicBP}/${report.examination.diastolicBP}`,
          reference: '<120/80 mmHg',
          status: getStatusForBP(report.examination.systolicBP, report.examination.diastolicBP)
        });
      }
      if (report.examination.weight) {
        biomarkers.push({
          name: 'Weight',
          value: parseFloat(report.examination.weight),
          reference: 'kg',
          status: 'normal'
        });
      }
      // Add other examination data
    }

    // If we have no biomarkers data but we have analysis, create summary items
    if (biomarkers.length === 0 && report?.analysis?.findings) {
      report.analysis.findings.forEach((finding, index) => {
        if (index < 7) { // Limit to 7 findings for display
          biomarkers.push({
            name: `Finding ${index+1}`,
            value: finding,
            reference: '',
            status: finding.includes('Normal') || finding.includes('Healthy') ? 'normal' : 
                   finding.includes('Low') ? 'borderline' : 
                   finding.includes('Elevated') || finding.includes('High') ? 'high' : 'normal'
          });
        }
      });
    }

    // Use fallback if still no data
    if (biomarkers.length === 0) {
      biomarkers = [
        { name: 'No detailed biomarker data', value: 'N/A', reference: 'N/A', status: 'normal' }
      ];
    }
    
    setBiomarkersData(biomarkers);

    // Create risk assessment data from report analysis
    let riskData = [];
    if (report?.analysis?.riskFactors && report.analysis.riskFactors.length > 0) {
      // Group risks by level
      const highRisks = report.analysis.riskFactors.filter(r => r.level === 'high').length;
      const mediumRisks = report.analysis.riskFactors.filter(r => r.level === 'medium').length;
      
      if (highRisks > 0) {
        riskData.push({ name: 'High Risk Factors', value: highRisks });
      }
      if (mediumRisks > 0) {
        riskData.push({ name: 'Medium Risk Factors', value: mediumRisks });
      }
      
      // Add a "healthy" section if there are few risks
      const healthyValue = Math.max(100 - (highRisks * 15) - (mediumRisks * 8), 30);
      riskData.push({ name: 'Healthy', value: healthyValue });
    } else {
      // Default data if no risk factors
      riskData = [{ name: 'Healthy', value: 90 }, { name: 'Minor Concerns', value: 10 }];
    }
    
    setRiskAssessmentData(riskData);
    
    // Just use mock trend data for now
    // In a real app, you'd fetch historical data from the backend
    setTrendsData([
      { month: 'Jan', cholesterol: 220, glucose: 95 },
      { month: 'Feb', cholesterol: 210, glucose: 92 },
      { month: 'Mar', cholesterol: 205, glucose: 90 },
      { month: 'Apr', cholesterol: 195, glucose: 88 },
      { month: 'May', cholesterol: 185, glucose: 86 },
      { month: 'Jun', cholesterol: 180, glucose: 85 },
    ]);
  };

  // Helper to determine status for biomarker values
  const getStatusForValue = (type, value) => {
    if (!value) return 'normal';
    
    switch (type) {
      case 'glucose':
        if (value < 70) return 'borderline';
        if (value <= 100) return 'normal';
        if (value <= 125) return 'borderline';
        return 'high';
      
      case 'cholesterol':
        if (value < 200) return 'normal';
        if (value <= 240) return 'borderline';
        return 'high';
        
      case 'hdl':
        if (value < 40) return 'borderline';
        if (value >= 60) return 'optimal';
        return 'normal';
        
      case 'ldl':
        if (value < 100) return 'normal';
        if (value <= 130) return 'borderline';
        return 'high';
        
      case 'hemoglobin':
        if (value < 12) return 'borderline';
        if (value <= 18) return 'normal';
        return 'high';
        
      default:
        return 'normal';
    }
  };
  
  const getStatusForBP = (systolic, diastolic) => {
    if (systolic >= 140 || diastolic >= 90) return 'high';
    if (systolic >= 120 || diastolic >= 80) return 'borderline';
    return 'normal';
  };
  
  const getStatusColor = (status) => {
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

  // Get overall health status
  const getHealthStatus = () => {
    if (!report?.analysis?.healthScore) return 'Loading...';
    
    const score = report.analysis.healthScore;
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Healthy';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Attention';
  };
  
  // Get status color for overall health
  const getHealthStatusColor = () => {
    if (!report?.analysis?.healthScore) return 'bg-gray-100 text-gray-800';
    
    const score = report.analysis.healthScore;
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-cyan-100 text-cyan-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
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
              <span className={`px-3 py-1 rounded-full ${getHealthStatusColor()} text-sm font-medium`}>
                {getHealthStatus()}
              </span>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Summary</h3>
              <p className="text-gray-600">
                {report?.analysis?.findings?.[0] || 'Your report is being analyzed. This may take a moment.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Key Metrics</h3>
                <div className="space-y-4">
                  {biomarkersData.slice(0, 4).map((marker, index) => (
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
              Track how your key health metrics have changed over time.
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
            
            {report?.analysis?.healthScore && report.analysis.healthScore > 80 ? (
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
                      <h4 className="text-green-800 font-medium">Positive Health Indicators</h4>
                      <p className="mt-1 text-green-700">
                        Your health indicators look positive. Continue with your current health practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Attention Areas</h3>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-amber-800 font-medium">Areas for Improvement</h4>
                      <p className="mt-1 text-amber-700">
                        There are some health metrics that could use attention. Review the recommendations tab for suggested actions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                  {report?.analysis?.recommendations?.filter(rec => 
                    rec.toLowerCase().includes('diet') || 
                    rec.toLowerCase().includes('eat') || 
                    rec.toLowerCase().includes('nutrition')
                  ).map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {rec}
                    </li>
                  )) || (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Maintain a balanced diet rich in fruits, vegetables and whole grains
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-800 mb-2">Exercise Recommendations</h3>
                <ul className="space-y-2 text-green-700">
                  {report?.analysis?.recommendations?.filter(rec => 
                    rec.toLowerCase().includes('exercise') || 
                    rec.toLowerCase().includes('physical') || 
                    rec.toLowerCase().includes('activity')
                  ).map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {rec}
                    </li>
                  )) || (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Aim for at least 30 minutes of moderate exercise most days of the week
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h3 className="text-lg font-medium text-purple-800 mb-2">Follow-up Recommendations</h3>
                <ul className="space-y-2 text-purple-700">
                  {report?.analysis?.recommendations?.filter(rec => 
                    rec.toLowerCase().includes('follow') || 
                    rec.toLowerCase().includes('consult') || 
                    rec.toLowerCase().includes('doctor') ||
                    rec.toLowerCase().includes('monitor')
                  ).map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {rec}
                    </li>
                  )) || (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Schedule your next check-up in 6 months
                    </li>
                  )}
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
