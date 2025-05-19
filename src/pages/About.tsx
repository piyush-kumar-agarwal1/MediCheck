
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import TeamSection from '@/components/about/TeamSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  About <span className="text-gradient">MediCheck</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  MediCheck was founded with a simple mission: make complex medical reports easy to understand for everyone. We believe that health literacy is a fundamental right, not a privilege.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our AI-powered platform bridges the gap between medical terminology and everyday language, empowering you to take control of your health journey with confidence and clarity.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/login">
                    <Button className="bg-primary-500 hover:bg-primary-600">
                      Get Started Free
                    </Button>
                  </Link>
                  <a href="#our-story">
                    <Button variant="outline" className="border-gray-300 text-gray-700">
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="relative animate-slide-in-up order-first lg:order-last">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Person using laptop with medical data" 
                  className="relative z-10 rounded-2xl shadow-lg w-full max-h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section id="our-story" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  MediCheck began in 2021 when our founder, Dr. Sarah Johnson, witnessed firsthand how many patients struggled to understand their medical reports. Despite being a skilled physician, she found it challenging to explain complex medical terminology in the limited time available during consultations.
                </p>
                <p>
                  Partnering with AI expert Michael Chang, they developed a prototype that could analyze medical reports and translate them into clear, actionable information. The initial tests showed remarkable results - patients reported feeling significantly more informed and empowered about their health.
                </p>
                <p>
                  Today, MediCheck has grown into a comprehensive platform that serves thousands of users daily. Our team of medical professionals, data scientists, and user experience experts work together to continuously improve our AI algorithms and ensure the highest standards of accuracy and clarity.
                </p>
                <p>
                  We remain committed to our founding mission: democratizing access to health information and building a world where everyone can make informed decisions about their wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine medical expertise with cutting-edge AI technology to deliver insights that are both accurate and accessible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Analysis</h3>
                <p className="text-gray-600">
                  Our AI system has been trained on millions of medical reports to accurately identify and interpret key health markers, patterns, and potential concerns.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-in" style={{animationDelay: "0.1s"}}>
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl mb-4">
                  👨‍⚕️
                </div>
                <h3 className="text-xl font-semibold mb-3">Medical Oversight</h3>
                <p className="text-gray-600">
                  All our algorithms are developed with input from practicing physicians and healthcare professionals to ensure medical accuracy and relevance.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-in" style={{animationDelay: "0.2s"}}>
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4">
                  🔐
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  We employ bank-level encryption and strict data handling protocols to ensure your sensitive health information remains private and secure.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <TeamSection />
        
        <section className="py-16 bg-gradient-to-r from-primary-500 to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to understand your health better?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users who are taking control of their health journey with MediCheck.
              </p>
              <Link to="/login">
                <Button className="bg-white text-primary-600 hover:bg-gray-100 py-6 px-8 text-lg font-medium">
                  Try MediCheck for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
