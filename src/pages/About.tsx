import { useState } from 'react';
import Navbar from '@/components/ui/navigation/Navbar';
import Footer from '@/components/ui/navigation/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Code, Shield, MessageCircle, FileText, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState('story');
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-4">
                  Our Mission
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Making Health <span className="text-gradient">Understandable</span> For Everyone
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  MediCheck was founded with a simple mission: transform complex medical reports into clear, actionable insights. We believe that health literacy is a fundamental right, not a privilege.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our AI-powered platform bridges the gap between medical terminology and everyday language, empowering you to take control of your health journey with confidence and clarity.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/signup">
                    <Button className="bg-primary-500 hover:bg-primary-600">
                      Get Started Free
                    </Button>
                  </Link>
                  <a href="#our-story">
                    <Button variant="outline" className="border-gray-300 text-gray-700">
                      Learn Our Story
                    </Button>
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative order-1 lg:order-2"
              >
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Person analyzing medical report" 
                  className="relative z-10 rounded-2xl shadow-lg w-full object-cover"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg z-20 border border-gray-100 max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Lightbulb size={18} />
                    </div>
                    <span className="text-sm font-medium">LPU Innovation</span>
                  </div>
                  <p className="text-sm text-gray-600">Created by students, for everyone</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-8 py-4 no-scrollbar">
              <button 
                onClick={() => setActiveSection('story')} 
                className={`whitespace-nowrap px-1 py-2 font-medium text-sm transition ${activeSection === 'story' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Our Story
              </button>
              <button 
                onClick={() => setActiveSection('approach')} 
                className={`whitespace-nowrap px-1 py-2 font-medium text-sm transition ${activeSection === 'approach' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Our Approach
              </button>
              <button 
                onClick={() => setActiveSection('difference')} 
                className={`whitespace-nowrap px-1 py-2 font-medium text-sm transition ${activeSection === 'difference' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Why We're Different
              </button>
              <button 
                onClick={() => setActiveSection('team')} 
                className={`whitespace-nowrap px-1 py-2 font-medium text-sm transition ${activeSection === 'team' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Our Team
              </button>
            </div>
          </div>
        </div>
        
        {/* Our Story Section */}
        <section id="our-story" className={`py-16 ${activeSection === 'story' ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  MediCheck began when our founder, Piyush Agarwal, a BTECH CSE student at Lovely Professional University, witnessed his parents struggling to interpret complex medical reports after a routine health checkup.
                </p>
                
                <p>
                  "My father received blood work results with dozens of parameters, reference ranges, and medical abbreviations," Piyush recalls. "Despite having internet access, my parents spent hours searching online, only to end up more confused and anxious than before."
                </p>
                
                <div className="my-10 bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <div className="flex items-start">
                    <div className="text-5xl mr-4">❝</div>
                    <div>
                      <p className="text-lg font-medium text-gray-800 italic mb-4">
                        That's when it hit me – if my parents, who are educated professionals, struggle this much with medical reports, countless others must face the same problem. Google searches often lead to worst-case scenarios and medical jargon that's just as confusing as the report itself.
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-3">
                          PA
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Piyush Agarwal</p>
                          <p className="text-sm text-gray-500">Founder & Team Lead</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p>
                  Inspired to solve this problem, Piyush shared his idea with fellow BTECH CSE students Shakshi Agrawal and Anupriya Singh. Together, they combined their skills in AI, machine learning, and application development to create a solution that could translate medical jargon into plain language.
                </p>
                
                <p>
                  What started as a university project quickly evolved into something more meaningful. They integrated advanced AI models, trained on medical literature and report formats, with a user-friendly interface accessible to people of all ages and technical backgrounds.
                </p>
                
                <p>
                  Today, MediCheck represents the team's vision for democratizing health information – making medical reports understandable for everyone, regardless of their background or technical expertise.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">AI-Powered</div>
                  <p className="text-gray-600">Medical Interpretation</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">User-First</div>
                  <p className="text-gray-600">Design Approach</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">Secure</div>
                  <p className="text-gray-600">Privacy Protection</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach Section */}
        <section id="our-approach" className={`py-16 bg-gray-50 ${activeSection === 'approach' ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We combine technical innovation with user-centered design to make health information accessible to everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Medical Report Analysis</h3>
                <p className="text-gray-600">
                  Our algorithms can process diverse report formats and extract key information, focusing on what matters most to patients.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Support for major lab test formats</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Identification of abnormal values</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Trend analysis across multiple reports</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Code className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Advanced AI Technology</h3>
                <p className="text-gray-600">
                  Built with cutting-edge NLP and machine learning techniques to understand medical terminology and translate it into simple language.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Trained on medical literature and terminology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Contextual understanding of health metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Continuously improving algorithms</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Privacy & Security</h3>
                <p className="text-gray-600">
                  We've prioritized data protection from day one, implementing comprehensive security measures to safeguard your sensitive health information.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">End-to-end encryption for all data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Strict access controls and permissions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance with data protection standards</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why We're Different Section */}
        <section id="difference" className={`py-16 ${activeSection === 'difference' ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why We're Different</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                MediCheck provides advantages that generic search engines and traditional AI platforms simply can't match.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-red-500 to-orange-500">
                  <div className="bg-white p-6 rounded-t-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Google & General Search</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✖</span>
                        <span className="text-gray-700">Generic information not specific to your results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✖</span>
                        <span className="text-gray-700">Often leads to worst-case scenarios and anxiety</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✖</span>
                        <span className="text-gray-700">No context for what's normal for your age or health history</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✖</span>
                        <span className="text-gray-700">Information overload with contradictory sources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">✖</span>
                        <span className="text-gray-700">No privacy - your health concerns become part of your search history</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-primary-500 to-teal-500">
                  <div className="bg-white p-6 rounded-t-lg">
                    <h3 className="text-xl font-bold text-primary-600 mb-6">MediCheck</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Personalized explanations based on your exact results</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Balanced information that avoids unnecessary alarm</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Contextualizes results for your specific information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Consistent, clear information from a single trusted source</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Secure platform with privacy protection for your health data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <MessageCircle className="h-8 w-8 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">The MediCheck Difference</h4>
                  <p className="text-gray-700">
                    Unlike generic AI platforms, MediCheck was built specifically for medical report analysis by students who understand the challenges faced by everyday people. Our focus is on simplicity, accessibility, and accurate information that empowers rather than overwhelms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section id="team" className={`py-16 bg-gray-50 ${activeSection === 'team' ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The brilliant minds behind MediCheck - BTECH CSE students at Lovely Professional University bringing innovation to healthcare.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <TeamMember 
                name="Piyush Agarwal"
                role="Founder & Team Lead"
                bio="Piyush leads the MediCheck team, bringing his expertise in AI/ML and application architecture. His personal experience with medical reports inspired the creation of MediCheck."
                initials="PA"
                bgColor="bg-primary-100"
                textColor="text-primary-600"
              />
              
              <TeamMember 
                name="Shakshi Agrawal"
                role="AI Development"
                bio="Shakshi specializes in natural language processing and leads the development of our medical text analysis algorithms and interpretation engine."
                initials="SA"
                bgColor="bg-teal-100"
                textColor="text-teal-600"
              />
              
              <TeamMember 
                name="Anupriya Singh"
                role="UX/UI Design & Frontend"
                bio="Anupriya creates the intuitive user interface that makes MediCheck accessible to everyone, regardless of their technical background."
                initials="AS"
                bgColor="bg-purple-100"
                textColor="text-purple-600"
              />
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold mb-6">LPU Innovation Project</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                MediCheck is being developed as part of our BTECH Computer Science and Engineering program at Lovely Professional University, combining our technical education with real-world problem solving.
              </p>
              
              <div className="mt-8 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">
                <Users className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">BTECH CSE Students</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                Ready to understand your health reports better?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/90 mb-8"
              >
                Try MediCheck today and experience the difference of truly understanding your health information.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Get Started For Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper component for team members
const TeamMember = ({ name, role, bio, initials, bgColor, textColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300"
    >
      <div className="mx-auto w-24 h-24 rounded-full mb-4 flex items-center justify-center text-2xl font-bold" className={bgColor + " " + textColor}>
        {initials}
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-primary-600 font-medium text-sm mb-4">{role}</p>
      <p className="text-gray-600 text-sm">{bio}</p>
    </motion.div>
  );
};

export default About;