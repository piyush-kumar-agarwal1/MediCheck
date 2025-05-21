import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  ShieldCheck, 
  Smartphone, 
  MessageSquare, 
  FileText, 
  Bell 
} from 'lucide-react';

const features = [
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Visual Report Analysis",
    description: "Interactive visual breakdowns that make complex medical data easy to understand at a glance.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Works with Any Report",
    description: "Compatible with lab reports, imaging reports, and even manual entry for flexibility.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI Health Assistant",
    description: "Ask questions about your reports and get clear, medically accurate answers in simple language.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Bank-Level Security",
    description: "Your health data is encrypted with the highest security standards to keep your information private.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Trend Monitoring",
    description: "Track your health metrics over time with automated monitoring and personalized insights.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Access Anywhere",
    description: "Check your health reports and insights from any device, no technical expertise required.",
    color: "bg-indigo-50 text-indigo-600",
  },
];

const Features = forwardRef((props, ref) => {
  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Better Health Understanding
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to take control of your health data and make informed decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.color)}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});

Features.displayName = 'Features';

export default Features;
