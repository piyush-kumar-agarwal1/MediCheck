import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import ResultsPanel from '@/components/reports/ResultsPanel';
import { Button } from '@/components/ui/button';
import { getReportById } from '@/services/reportService';
import { toast } from '@/components/ui/sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ReportResults = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getReportById(id);
        console.log('Fetched report data:', data);
        setReportData(data);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError(err.message || 'Failed to load report');
        toast({
          title: "Error",
          description: "Failed to load report data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
                    Loading Report...
                  </h1>
                  <p className="text-gray-600">
                    Please wait while we fetch your data
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading report data...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Report</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="flex justify-center space-x-3">
                  <Link to="/dashboard">
                    <Button variant="outline" className="text-gray-700 border-gray-300">
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-primary-500 hover:bg-primary-600"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
                  Report Analysis Results
                </h1>
                <p className="text-gray-600">
                  {reportData?.title || 'Medical Report'} | {new Date(reportData?.date || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="text-gray-700 border-gray-300">
                    Back to Dashboard
                  </Button>
                </Link>
                <Link to="/report-upload">
                  <Button variant="outline" className="text-primary-600 border-primary-300 hover:bg-primary-50">
                    Upload New Report
                  </Button>
                </Link>
              </div>
            </div>
            
            <ResultsPanel report={reportData} />

            {reportData?.fileUrl && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Original Document</h2>
                <div className="flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50">
                  {reportData.fileUrl.endsWith('.pdf') ? (
                    <div className="w-full overflow-hidden rounded-md border">
                      <iframe 
                        src={`${API_BASE_URL}${reportData.fileUrl}`} 
                        className="w-full h-[500px]"
                        title="PDF Document"
                      ></iframe>
                    </div>
                  ) : reportData.fileUrl.match(/\.(jpg|jpeg|png)$/i) ? (
                    <div className="w-full">
                      <img 
                        src={`${API_BASE_URL}${reportData.fileUrl}`} 
                        alt="Medical Report" 
                        className="max-w-full rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="mb-3 text-3xl">📄</div>
                      <p className="mb-4">This file type can't be previewed</p>
                      <a 
                        href={`${API_BASE_URL}/api/reports/${reportData._id}/download`} 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                      >
                        Download Original Document
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    {reportData.originalFileName || 'Document'} 
                    {reportData.fileSize && ` (${(reportData.fileSize / 1024 / 1024).toFixed(2)} MB)`}
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`${API_BASE_URL}/api/reports/${reportData._id}/download`, '_blank')}
                    className="text-primary-600 border-primary-300"
                  >
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportResults;