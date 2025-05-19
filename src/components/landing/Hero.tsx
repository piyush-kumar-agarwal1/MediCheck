
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 sm:pb-24 lg:pb-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50 to-teal-50 opacity-50 -z-10"></div>
      <div className="absolute -top-24 right-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-4">
              AI-Powered Health Analytics
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Understand Your <span className="text-gradient">Health Reports</span> Like Never Before
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              MediCheck analyzes your medical reports using advanced AI to provide clear insights, personalized recommendations, and track your health progress over time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white py-6 px-8 text-lg font-medium btn-pulse">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50 py-6 px-8 text-lg font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                    {item}
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm text-gray-600">
                <span className="font-medium">1,000+</span> health reports analyzed today
              </span>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative bg-white rounded-2xl shadow-xl p-2 md:p-4 lg:p-6 overflow-hidden border border-gray-100">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="MediCheck Dashboard" 
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-100 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Analysis Complete</p>
                    <p className="text-sm font-medium">Your report is ready!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
