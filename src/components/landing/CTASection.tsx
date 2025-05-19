
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-500 to-teal-600 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-16 -mr-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-8 -ml-8 blur-xl"></div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your health understanding?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of users who are taking control of their health with MediCheck's AI-powered analysis. Get started today with our free plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <Button className="bg-white text-primary-600 hover:bg-gray-100 py-6 px-8 text-lg font-medium">
                  Sign Up for Free
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 py-6 px-8 text-lg font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
