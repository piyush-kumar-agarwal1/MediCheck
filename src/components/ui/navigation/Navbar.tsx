
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-gradient">MediCheck</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium animated-underline pb-1 hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/about" className="font-medium animated-underline pb-1 hover:text-primary-600 transition-colors">About</Link>
          <Link to="/dashboard" className="font-medium animated-underline pb-1 hover:text-primary-600 transition-colors">Dashboard</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-primary-500 hover:bg-primary-600">
              Sign up
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <hr className="border-gray-200" />
          <div className="flex flex-col space-y-3 px-4">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-primary-500 text-primary-600">
                Log in
              </Button>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary-500 hover:bg-primary-600">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
