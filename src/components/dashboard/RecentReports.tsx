import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getUserReports } from '@/services/dashboardService';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Report {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'processing' | 'failed' | 'uploaded' | 'analyzed' | 'error';
  type: string;
}

interface RecentReportsProps {
  isLoading?: boolean;
}

const RecentReports = ({ isLoading = false }: RecentReportsProps) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(isLoading);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(5); // Initially show 5 reports

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getUserReports();
        
        // Transform the API data to match our component's format
        const formattedReports = data.map((report: any) => ({
          id: report._id,
          name: report.title,
          date: report.date,
          status: report.status,
          type: report.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
        }));
        
        setAllReports(formattedReports); // Store all reports
        setReports(formattedReports.slice(0, displayCount)); // Display initial set of reports
        setError(null);
      } catch (err: any) {
        console.error('Error fetching reports:', err);
        setError(err.message || 'Failed to load reports');
        toast({
          title: "Error",
          description: err.message || "Failed to load reports",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (!isLoading) {
      fetchReports();
    }
  }, [isLoading, displayCount]);
  
  // Function to load more reports
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prevCount => prevCount + 5);
      setReports(allReports.slice(0, displayCount + 5));
      setLoadingMore(false);
    }, 500); // Simulate loading delay
  };

  const getStatusStyles = (status: Report['status']) => {
    switch (status) {
      case 'completed':
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'uploaded':
        return 'bg-blue-100 text-blue-800 animate-pulse-gentle';
      case 'failed':
      case 'error':
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
              Add New Report
            </Button>
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="p-6 space-y-4">
          <ReportSkeleton />
          <ReportSkeleton />
          <ReportSkeleton />
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      ) : reports.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No reports found. Upload your first report!</p>
          <Link to="/report-upload">
            <Button className="mt-4 bg-primary-500 hover:bg-primary-600">
              Upload Report
            </Button>
          </Link>
        </div>
      ) : (
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
      )}
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {allReports.length > displayCount ? (
          <button 
            onClick={handleLoadMore} 
            disabled={loadingMore}
            className="text-sm text-primary-600 font-medium hover:text-primary-800 flex items-center"
          >
            {loadingMore ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>View More Reports</>
            )}
          </button>
        ) : (
          <Link to="/my-reports" className="text-sm text-primary-600 font-medium hover:text-primary-800">
            View All Reports →
          </Link>
        )}
      </div>
    </div>
  );
};

// Skeleton component for loading state
const ReportSkeleton = () => (
  <div className="flex justify-between items-center">
    <div className="space-y-2 w-full">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-3 bg-gray-100 rounded w-1/4"></div>
    </div>
    <div className="h-4 w-16 bg-gray-200 rounded"></div>
  </div>
);

export default RecentReports;
