
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  type: string;
}

const reports: Report[] = [
  {
    id: '1',
    name: 'Blood Test Results',
    date: '2023-05-12',
    status: 'completed',
    type: 'Blood Work',
  },
  {
    id: '2',
    name: 'Annual Physical Checkup',
    date: '2023-04-28',
    status: 'completed',
    type: 'Physical',
  },
  {
    id: '3',
    name: 'Cholesterol Panel',
    date: '2023-03-15',
    status: 'completed',
    type: 'Blood Work',
  },
  {
    id: '4',
    name: 'COVID-19 Test',
    date: '2023-02-22',
    status: 'completed',
    type: 'Diagnostic',
  },
  {
    id: '5',
    name: 'MRI Scan Results',
    date: '2023-05-15',
    status: 'processing',
    type: 'Imaging',
  },
];

const RecentReports = () => {
  const getStatusStyles = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800 animate-pulse-gentle';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
          <Link to="/report-upload">
            <Button variant="outline" size="sm" className="text-primary-600 border-primary-300 hover:bg-primary-50">
              Upload New Report
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{report.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{report.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {new Date(report.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/report/${report.id}`} className="text-primary-600 hover:text-primary-800">
                    View Results
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <Link to="/reports" className="text-sm text-primary-600 font-medium hover:text-primary-800">
          View All Reports →
        </Link>
      </div>
    </div>
  );
};

export default RecentReports;
