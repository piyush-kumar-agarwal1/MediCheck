
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import ResultsPanel from '@/components/reports/ResultsPanel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReportResults = () => {
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
                  Blood Test Results | May 15, 2023
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
            
            <ResultsPanel />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportResults;
