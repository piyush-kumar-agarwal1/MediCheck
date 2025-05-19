
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -left-16 -top-16 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-70 animate-pulse-gentle"></div>
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-70"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Woman using laptop" 
                  className="rounded-2xl shadow-xl object-cover w-full max-h-96"
                />
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Bank-Level Security</p>
                      <p className="text-sm text-gray-600">Your data is encrypted and secure</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Instant Results</p>
                      <p className="text-sm text-gray-600">Get analysis in seconds, not days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
