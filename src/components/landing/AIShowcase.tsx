import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, AlertCircle, TrendingUp } from 'lucide-react';

const AIShowcase = forwardRef((props, ref) => {
  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-gradient">AI Health Assistant</span>
          </h2>
          <p className="text-lg text-gray-600">
            Powered by advanced machine learning to interpret medical data and answer your health questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="md:col-span-5 md:order-2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <MessageSquare className="text-primary-500 mr-2 h-5 w-5" />
                  MediBot
                </h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Online</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    You
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-3 text-sm">
                    What does it mean if my hemoglobin A1C is 6.2%?
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 bg-primary-50 rounded-lg p-3 text-sm">
                    <p>A hemoglobin A1C of 6.2% is considered <strong>prediabetic</strong> (normal is below 5.7%, diabetic is 6.5% or higher).</p>
                    <p className="mt-2">This suggests your average blood sugar has been slightly elevated over the past 2-3 months. While not yet diabetic, it's a warning sign that you should consider lifestyle changes to prevent progression to diabetes.</p>
                    <div className="mt-3 pt-3 border-t border-primary-100 flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Medical Context</span>
                      <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">Risk Assessment</span>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">Preventive Advice</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Ask Another Question
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-7 md:order-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Your Personal Medical Translator</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Complex Terms Simplified</h4>
                  <p className="text-gray-600">MediBot translates complex medical terminology into language you can understand and take action on.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Track Health Trends</h4>
                  <p className="text-gray-600">Get insights on how your health metrics are changing over time and what those changes might mean.</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                    Try MediBot Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

AIShowcase.displayName = 'AIShowcase';

export default AIShowcase;