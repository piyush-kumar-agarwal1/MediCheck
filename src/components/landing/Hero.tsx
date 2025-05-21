import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Check } from 'lucide-react';

const Hero = forwardRef((props, ref) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden pt-24 pb-16 sm:pb-24 lg:pb-32"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50 to-teal-50 opacity-50 -z-10"></div>
      <div className="absolute -top-24 right-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-4">
              <span className="animate-pulse mr-2">●</span> AI-Powered Health Analytics
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Understand Your <span className="text-gradient">Health Reports</span> Like Never Before
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              MediCheck translates complex medical jargon into plain English, helping you understand what your test results really mean for your health.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-6 text-lg font-medium group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50 px-6 py-6 text-lg font-medium">
                  Log In
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-6 w-6 rounded-full bg-green-100 text-green-600 items-center justify-center mr-2">
                  <Check className="h-4 w-4" />
                </span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-6 w-6 rounded-full bg-green-100 text-green-600 items-center justify-center mr-2">
                  <Check className="h-4 w-4" />
                </span>
                <span>Free health report analysis</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex h-6 w-6 rounded-full bg-green-100 text-green-600 items-center justify-center mr-2">
                  <Check className="h-4 w-4" />
                </span>
                <span>AI-powered insights</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-xl p-2 md:p-4 lg:p-6 overflow-hidden border border-gray-100">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-70"></div>
              
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="MediCheck Dashboard" 
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Cholesterol Analysis</h3>
                      <p className="text-xs text-gray-600 mt-1">Your LDL levels are slightly elevated at 142 mg/dL (optimal: &lt;100). This may increase cardiovascular risk.</p>
                      <div className="mt-2 text-xs font-medium text-primary-600">View AI recommendations →</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -right-3 transform rotate-6 bg-teal-500 text-white text-xs px-6 py-2 rounded-full shadow-md">
                AI-analyzed in seconds
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500 mb-3">Trusted by healthcare providers and patients</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70 hover:opacity-100 transition-opacity">
            <img src="https://placehold.co/200x60?text=Hospital+Logo" alt="Partner" className="h-12 object-contain" />
            <img src="https://placehold.co/200x60?text=Clinic+Logo" alt="Partner" className="h-12 object-contain" />
            <img src="https://placehold.co/200x60?text=Lab+Logo" alt="Partner" className="h-12 object-contain" />
            <img src="https://placehold.co/200x60?text=Research+Logo" alt="Partner" className="h-12 object-contain" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
