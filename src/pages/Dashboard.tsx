
import { useState } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import StatCard from '@/components/dashboard/StatCard';
import RecentReports from '@/components/dashboard/RecentReports';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });
  
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in">
              {greeting}, <span className="text-primary-600">Alex</span>
            </h1>
            <p className="text-gray-600">Welcome to your health dashboard. Here's your latest health overview.</p>
          </div>
          
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Total Reports" 
                value="8" 
                change="+2" 
                isPositive={true} 
                icon="📄"
                colorClass="from-blue-500 to-blue-600" 
              />
              <StatCard 
                title="Health Score" 
                value="87/100" 
                change="+5" 
                isPositive={true} 
                icon="❤️"
                colorClass="from-green-500 to-green-600" 
              />
              <StatCard 
                title="Risk Factors" 
                value="2" 
                change="-1" 
                isPositive={true} 
                icon="⚠️"
                colorClass="from-yellow-500 to-yellow-600" 
              />
              <StatCard 
                title="Next Checkup" 
                value="15 days" 
                icon="📅"
                colorClass="from-purple-500 to-purple-600" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentReports />
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
                  
                  <Button variant="outline" className="w-full text-gray-700 border-gray-200 justify-start">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule Checkup
                  </Button>
                  
                  <Button variant="outline" className="w-full text-gray-700 border-gray-200 justify-start">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Health History
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-lg">Health Reminders</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-gray-800">Annual Physical</p>
                      <span className="text-sm text-orange-600 font-medium">2 weeks</span>
                    </div>
                    <p className="text-sm text-gray-600">Schedule with Dr. Smith</p>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-gray-800">Blood Work</p>
                      <span className="text-sm text-green-600 font-medium">Completed</span>
                    </div>
                    <p className="text-sm text-gray-600">Results available</p>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-gray-800">Dental Checkup</p>
                      <span className="text-sm text-red-600 font-medium">Overdue</span>
                    </div>
                    <p className="text-sm text-gray-600">Last visit: 8 months ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
