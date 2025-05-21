import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CTASection = forwardRef((props, ref) => {
  const { user } = useAuth();

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-600 to-teal-600 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-16 -mr-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-8 -ml-8 blur-xl"></div>
          <div className="absolute bottom-0 right-0 h-40 w-40 bg-primary-400 rounded-full opacity-20 blur-2xl -mb-20 -mr-20"></div>
          
          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {user 
                ? "Ready to explore your health insights?" 
                : "Ready to understand your health reports like never before?"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {user 
                ? "Continue to your dashboard to see your latest health analysis and personalized recommendations."
                : "Join thousands of users who are taking control of their health with MediCheck's AI-powered analysis. Get started today for free."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {user ? (
                <Link to="/home">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 py-6 px-8 text-lg font-medium group">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 py-6 px-8 text-lg font-medium group">
                      Sign Up for Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 py-6 px-8 text-lg font-medium">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {!user && (
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                <div className="flex items-center text-sm text-white/90">
                  <Check className="h-5 w-5 mr-2 text-teal-300" />
                  <span>Free report analysis</span>
                </div>
                <div className="flex items-center text-sm text-white/90">
                  <Check className="h-5 w-5 mr-2 text-teal-300" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center text-sm text-white/90">
                  <Check className="h-5 w-5 mr-2 text-teal-300" />
                  <span>Bank-level security</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
