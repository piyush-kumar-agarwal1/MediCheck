import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, LineChart } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload Your Report",
    description: "Simply upload your medical reports in PDF or image format, or manually enter your test results.",
    color: "bg-blue-500"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your data, identifies patterns, and translates medical terminology into plain language.",
    color: "bg-purple-500"
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Get Personalized Insights",
    description: "Receive easy-to-understand explanations, personalized insights, and actionable recommendations.",
    color: "bg-teal-500"
  }
];

const HowItWorks = forwardRef((props, ref) => {
  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Three simple steps to transform complex medical reports into clear, actionable insights.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex-1 relative"
            >
              <div className="bg-white rounded-xl p-8 h-full border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 relative z-10">
                <div className={`w-14 h-14 rounded-full ${step.color} text-white flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-0 transform -translate-y-1/2">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L40 20L20 40L17.5 37.5L32.5 22.5H0V17.5H32.5L17.5 2.5L20 0Z" fill="#E5E7EB"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 max-w-3xl">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-500 font-medium">Demo Preview</div>
            </div>
            <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" 
                title="MediCheck Demo"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
});

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;