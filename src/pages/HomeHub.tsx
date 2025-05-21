import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserReports } from '@/services/reportService';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate import
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import HealthTipCard from '@/components/wellness/HealthTipCard';
import BreathingExercise from '@/components/wellness/BreathingExercise';
import WellnessArticles from '@/components/wellness/WellnessArticles';
import MemoryGameCard from '@/components/wellness/MemoryGameCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { CalendarDays, Activity, Film, Brain, MessageSquare, FileUp, BarChart, ClipboardList, PlusCircle } from 'lucide-react';

const HomeHub = () => {
  const { user } = useAuth();
  const [lastReport, setLastReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('wellness');
  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    const fetchLastReport = async () => {
      try {
        const reports = await getUserReports();
        if (reports && reports.length > 0) {
          // Sort by date and get the most recent
          const sortedReports = [...reports].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setLastReport(sortedReports[0]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastReport();
  }, []);

  const formatReportDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Hero */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-teal-700/90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3')] bg-cover opacity-20"></div>
            
            <div className="relative px-6 py-8 md:px-10 md:py-12 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
                    {getGreeting()}, <span className="text-white/90">{user?.name || 'Friend'}</span>
                  </h1>
                  
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingIndicator size="sm" color="white" />
                      <p className="text-white/80">Loading your information...</p>
                    </div>
                  ) : lastReport ? (
                    <p className="text-white/80">
                      Your last health report was uploaded on <span className="font-medium">{formatReportDate(lastReport.date)}</span>
                    </p>
                  ) : (
                    <p className="text-white/80">Welcome to your personal wellness hub</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-lg">
                  <CalendarDays className="h-5 w-5 text-white/80" />
                  <span className="text-white/90 font-medium">
                    {format(new Date(), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer" 
                 onClick={() => navigate('/report-upload')}>
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 mr-4">
                  <FileUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Upload Report</h3>
                  <p className="text-gray-500 text-sm">Add a new health report for analysis</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                 onClick={() => navigate('/dashboard')}>
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-4">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Dashboard</h3>
                  <p className="text-gray-500 text-sm">View your health metrics and insights</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                 onClick={() => navigate('/my-reports')}>
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-teal-100 text-teal-600 mr-4">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">My Reports</h3>
                  <p className="text-gray-500 text-sm">Access all your previous health reports</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="grid grid-cols-2 w-[400px] max-w-full">
                <TabsTrigger value="wellness" className="text-sm md:text-base">
                  <Activity className="h-4 w-4 mr-2" /> Wellness Hub
                </TabsTrigger>
                <TabsTrigger value="entertainment" className="text-sm md:text-base">
                  <Film className="h-4 w-4 mr-2" /> Feel Good Zone
                </TabsTrigger>
              </TabsList>

              <Button variant="outline" size="sm" className="hidden md:flex items-center" onClick={() => window.open('https://medicheck.ai/chat', '_blank')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask MediBot
              </Button>
            </div>

            {/* Rest of the component remains the same */}
            <TabsContent value="wellness" className="space-y-8 mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WellnessArticles />
                </div>
                <div className="space-y-6">
                  <HealthTipCard />
                  <BreathingExercise />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="entertainment" className="mt-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-xl font-medium flex items-center">
                      <Film className="mr-2 h-5 w-5 text-primary-500" />
                      Movie Recommendations
                    </h3>
                  </div>
                  
                  <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://break-your-boredom.vercel.app/embed"
                      className="w-full h-full"
                      title="Movie Recommender"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <p className="text-gray-600 mt-4 text-center">
                    Find the perfect movie to match your mood and boost your wellbeing
                  </p>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <MemoryGameCard />
              </div>
            </TabsContent>
          </Tabs>

          {/* Floating Action Button (Mobile) */}
          <div className="md:hidden fixed bottom-6 left-6 z-10">
            <Button
              className="h-14 w-14 rounded-full shadow-lg bg-primary-500 hover:bg-primary-600"
              onClick={() => navigate('/report-upload')}
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </div>

          {/* AI Chatbot Floating Button (Mobile) */}
          <div className="md:hidden fixed bottom-6 right-6 z-10">
            <Button
              className="h-14 w-14 rounded-full shadow-lg bg-primary-500 hover:bg-primary-600"
              onClick={() => window.open('https://medicheck.ai/chat', '_blank')}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeHub;