import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Add this import
import StatCard from '@/components/dashboard/StatCard';
import RecentReports from '@/components/dashboard/RecentReports';
import { toast } from '@/components/ui/sonner';
import { getDashboardStats, DashboardStats, DashboardError } from '@/services/dashboardService';


const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });
  
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardStats();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err as DashboardError);
        toast({
          title: "Error",
          description: (err as DashboardError).message || "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
              {greeting}, <span className="text-primary-600">{user?.name || 'User'}</span>
            </h1>
            <p className="text-gray-600">Welcome to your health dashboard. Here's your latest health overview.</p>
          </div>
          
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <StatCard 
                    title="Total Reports" 
                    value={dashboardData?.totalReports || 0} 
                    change="+2" 
                    isPositive={true} 
                    icon="📄"
                    colorClass="from-blue-500 to-blue-600" 
                  />
                  <StatCard 
                    title="Health Score" 
                    value={`${dashboardData?.healthScore || 0}/100`} 
                    change="+5" 
                    isPositive={true} 
                    icon="❤️"
                    colorClass="from-green-500 to-green-600" 
                  />
                  <StatCard 
                    title="Risk Factors" 
                    value={dashboardData?.riskFactors || 0} 
                    change="-1" 
                    isPositive={true} 
                    icon="⚠️"
                    colorClass="from-yellow-500 to-yellow-600" 
                  />
                  <StatCard 
                    title="Next Checkup" 
                    value={`${dashboardData?.nextCheckup || 0} days`} 
                    icon="📅"
                    colorClass="from-purple-500 to-purple-600" 
                  />
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentReports isLoading={isLoading} />
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 card-hover">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary-500 hover:bg-primary-600 justify-start"
                    onClick={() => navigate('/report-upload')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload New Report
                  </Button>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 justify-start"
                    onClick={() => navigate('/my-reports')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View All Reports
                  </Button>
                  
                  {/* Rest of the buttons remain the same */}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Health Document Repository</h3>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/my-reports')}
                    className="text-primary-600 border-primary-300"
                  >
                    View All
                  </Button>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Store and access all your medical records securely in one place. Upload lab reports, imaging results, prescriptions, and more.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card className="text-center p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/report-upload')}>
                    <div className="text-3xl mb-2">🔬</div>
                    <h4 className="font-medium">Lab Results</h4>
                    <p className="text-sm text-gray-500">Blood work, urine tests</p>
                  </Card>
                  
                  <Card className="text-center p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/report-upload')}>
                    <div className="text-3xl mb-2">🩻</div>
                    <h4 className="font-medium">Imaging</h4>
                    <p className="text-sm text-gray-500">X-rays, MRIs, CT scans</p>
                  </Card>
                  
                  <Card className="text-center p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/report-upload')}>
                    <div className="text-3xl mb-2">👨‍⚕️</div>
                    <h4 className="font-medium">Physical Exam</h4>
                    <p className="text-sm text-gray-500">Annual Check-ups, Doctor Visits</p>
                  </Card>
                </div>
              </div>
              
              {/* Health Reminders section remains the same */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Skeleton component for loading state
const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="w-full">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export default Dashboard;
