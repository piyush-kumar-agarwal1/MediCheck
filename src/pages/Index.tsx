import { useEffect, useRef } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import AIShowcase from '@/components/landing/AIShowcase';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/ui/navigation/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sectionsRef = useRef({});
  
  // Redirect logged-in users to their home page
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onScrollTo={scrollToSection} />
      
      <main className="flex-grow">
        <Hero 
          ref={el => sectionsRef.current.hero = el}
        />
        
        <HowItWorks 
          ref={el => sectionsRef.current.howItWorks = el}
        />
        
        <AIShowcase 
          ref={el => sectionsRef.current.aiShowcase = el}
        />
        
        <Features 
          ref={el => sectionsRef.current.features = el}
        />
        
        <Testimonials 
          ref={el => sectionsRef.current.testimonials = el}
        />
        
        <FAQ 
          ref={el => sectionsRef.current.faq = el}
        />
        
        <CTASection 
          ref={el => sectionsRef.current.cta = el}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
