
import { cn } from '@/lib/utils';

const features = [
  {
    icon: "📊",
    title: "Visual Report Analysis",
    description: "Transform complex medical data into easy-to-understand visual representations that highlight key health indicators.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "🔍",
    title: "Deep Health Insights",
    description: "Our AI analyzes patterns across all your health reports to identify trends and potential concerns that might otherwise be missed.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: "📱",
    title: "Accessible Anywhere",
    description: "Access your health insights from any device, anytime. Your health data is always at your fingertips.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "🔒",
    title: "Bank-Level Security",
    description: "Your health data is encrypted with the highest security standards, ensuring your information remains private and protected.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Monitor your health progress over time with automated tracking of key metrics and personalized improvement suggestions.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description: "Receive timely notifications about important changes in your health metrics that may require attention.",
    color: "bg-red-50 text-red-600",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Better Health Management
          </h2>
          <p className="text-lg text-gray-600">
            Our AI-powered platform helps you understand and manage your health reports with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "p-6 rounded-xl card-hover",
                index % 2 === 0 ? "animate-fade-in" : "animate-slide-in-up"
              )}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4", feature.color)}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
