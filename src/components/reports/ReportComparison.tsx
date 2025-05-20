import { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ReportComparison = ({ reports }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['glucose']);
  const [filteredReports, setFilteredReports] = useState([]);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    if (!reports || !reports.length) return;
    
    // Filter reports based on time range
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case '3months':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '1year':
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case 'all':
        cutoffDate = new Date(0); // Beginning of time
        break;
      default: // 6months
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
    }
    
    // Only include blood work reports with the necessary data points
    const filtered = reports.filter(report => 
      report.type === 'blood_work' && 
      report.biomarkers && 
      new Date(report.date) >= cutoffDate
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setFilteredReports(filtered);
  }, [reports, timeRange]);

  // Transform the report data into a format suitable for Recharts
  const chartData = filteredReports.map(report => {
    const dataPoint = {
      date: new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    
    // Add each selected metric to the data point
    selectedMetrics.forEach(metric => {
      if (report.biomarkers && report.biomarkers[metric]) {
        dataPoint[metric] = parseFloat(report.biomarkers[metric]);
      }
    });
    
    return dataPoint;
  });

  // Get available metrics from reports
  const availableMetrics = [
    { id: 'glucose', name: 'Glucose (mg/dL)' },
    { id: 'hemoglobin', name: 'Hemoglobin (g/dL)' },
    { id: 'totalCholesterol', name: 'Total Cholesterol (mg/dL)' },
    { id: 'hdl', name: 'HDL Cholesterol (mg/dL)' },
    { id: 'ldl', name: 'LDL Cholesterol (mg/dL)' },
    { id: 'triglycerides', name: 'Triglycerides (mg/dL)' },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Health Metrics Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1 block">Select Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1 block">Select Metrics</label>
              <Select 
                value={selectedMetrics[0]} 
                onValueChange={(value) => setSelectedMetrics([value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {availableMetrics.map(metric => (
                    <SelectItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Not enough data to display trends.</p>
            <p className="text-sm mt-2">Upload more blood work reports to see your metrics over time.</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedMetrics.map((metric, index) => (
                  <Line 
                    key={metric}
                    type="monotone" 
                    dataKey={metric} 
                    stroke={colors[index % colors.length]} 
                    activeDot={{ r: 8 }}
                    name={availableMetrics.find(m => m.id === metric)?.name || metric}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Track how your health metrics change over time
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportComparison;