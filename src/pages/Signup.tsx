import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import SignupForm from '@/components/auth/SignupForm';
import { motion } from 'framer-motion';
import { FileText, Zap, Check } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />      <main className="flex-grow flex items-center justify-center py-6 md:py-20 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div 
              className="hidden lg:block relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Background elements */}
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 p-1 inline-flex rounded-full bg-gradient-to-r from-primary-200 to-teal-200">
                  <div className="bg-white px-4 py-1 rounded-full">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-600 text-sm font-medium">
                      Get Started in Minutes
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Track and understand your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-600">health data</span> with ease
                </h1>
                
                <p className="text-gray-600 text-lg mb-8 max-w-lg">
                  Sign up for MediCheck to decode your health reports, get personalized insights, and take control of your health journey.
                </p>
                
                <div className="space-y-5 mb-8">
                  {[
                    "AI analysis of medical reports in seconds",
                    "Track health metrics over time",
                    "Personalized health recommendations",
                    "Secure, private, and encrypted data"
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <motion.div 
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="absolute -top-3 -left-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.52 3.8C10.75 3.29 12.1 3 13.5 3C18.47 3 22.5 7.03 22.5 12C22.5 16.97 18.47 21 13.5 21C8.53 21 4.5 16.97 4.5 12C4.5 10.6 4.79 9.25 5.3 8.02" stroke="#4B56D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.5 4.5L5.25 8.25L9 4.5" stroke="#4B56D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Joined by 7,500+ users</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm italic">
                    "MediCheck has completely transformed how I understand my lab results. No more googling medical terms or waiting for doctor appointments to explain what's going on."
                  </p>
                  
                  <div className="mt-3 flex items-center">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-600 ml-2">4.9/5 from 400+ reviews</span>
                  </div>
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
                  <SignupForm />
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

export default Signup;