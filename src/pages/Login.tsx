import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import LoginForm from '@/components/auth/LoginForm';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Brain, MessageSquare } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-6 md:py-20 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -left-8 -top-8 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute left-1/4 top-16 w-12 h-12 bg-yellow-300 rounded-full blur-xl opacity-40 animate-float"></div>
                <div className="absolute right-1/3 bottom-12 w-16 h-16 bg-blue-300 rounded-full blur-xl opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
                
                {/* Device mockup */}
                <div className="relative z-10 bg-white rounded-2xl p-3 shadow-2xl border border-gray-200 backdrop-blur-sm">
                  <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Medical Dashboard" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* UI overlay elements */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-50">
                      <div className="flex items-center space-x-2 mb-2 text-primary-600 text-sm font-medium">
                        <Activity size={16} />
                        <span>MediCheck Dashboard</span>
                      </div>
                      <h3 className="text-base font-medium text-gray-900 mb-1">Your latest health metrics at a glance</h3>
                      <div className="flex space-x-3 mt-3">
                        <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Healthscore: 87%</div>
                        <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">3 Reports</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature cards */}
                <motion.div 
                  className="mt-8 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FeatureCard 
                    icon={<ShieldCheck className="w-5 h-5" />}
                    title="Bank-Level Security"
                    description="Your data is encrypted and secure"
                    color="bg-green-50 text-green-700 border-green-100"
                  />
                  
                  <FeatureCard 
                    icon={<Brain className="w-5 h-5" />}
                    title="AI-Powered Insights"
                    description="Smart analysis of your health data"
                    color="bg-purple-50 text-purple-700 border-purple-100"
                  />
                  
                  <FeatureCard 
                    icon={<Activity className="w-5 h-5" />}
                    title="Track Your Progress"
                    description="Monitor health improvement over time"
                    color="bg-blue-50 text-blue-700 border-blue-100"
                  />
                  
                  <FeatureCard 
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Ask Health Questions"
                    description="Chat with our AI assistant anytime"
                    color="bg-amber-50 text-amber-700 border-amber-100"
                  />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              {/* Form background effects */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-30 lg:hidden"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-30 lg:hidden"></div>
              
              <div className="bg-white/60 backdrop-blur-xl p-1 rounded-3xl shadow-xl border border-white/40">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                  <LoginForm />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper component for feature cards
const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className={`p-4 rounded-xl border ${color} transition-all duration-200 hover:shadow-md hover:scale-105`}>
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${color} p-2 rounded-lg`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
