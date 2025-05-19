import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Join thousands of users</h3>
                      <p className="text-sm text-gray-500">Get insights about your health instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SignupForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;