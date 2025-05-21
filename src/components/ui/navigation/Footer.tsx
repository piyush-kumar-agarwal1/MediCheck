import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gradient">MediCheck</span>
            </Link>
            <p className="text-sm text-gray-600 mb-6">
              Translating complex medical reports into clear, actionable insights with AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.057 10.057 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.882 4.882 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.097a4.9 4.9 0 01-2.228-.616v.061a4.925 4.925 0 003.95 4.829 4.931 4.931 0 01-2.224.084 4.935 4.935 0 004.596 3.42 9.863 9.863 0 01-6.1 2.107 10.08 10.08 0 01-1.173-.068 13.918 13.918 0 007.548 2.225c9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-gray-500 hover:text-primary-600 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-500 hover:text-primary-600 text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-500 hover:text-primary-600 text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-primary-600 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-primary-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-primary-600 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-500 hover:text-primary-600 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-primary-600 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-primary-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-primary-600 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-500 hover:text-primary-600 text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-500 hover:text-primary-600 text-sm">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MediCheck. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link to="/login" className="text-gray-500 hover:text-primary-600 text-sm">
                  Log In
                </Link>
                <Link to="/signup" className="text-gray-500 hover:text-primary-600 text-sm">
                  Sign Up
                </Link>
                <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">
                  Help Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
