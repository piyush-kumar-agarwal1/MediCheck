import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What types of medical reports can MediCheck analyze?",
    answer: "MediCheck can analyze most standard lab reports including blood tests, metabolic panels, lipid profiles, thyroid function tests, and more. We're continuously expanding our capabilities to cover additional report types."
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI has been trained on millions of medical reports and cross-verified by healthcare professionals. While we provide high-accuracy insights, MediCheck is designed as a supplementary tool and not a replacement for professional medical advice."
  },
  {
    question: "How is my medical data kept secure?",
    answer: "We employ industry-leading encryption and security practices. Your data is encrypted both in transit and at rest, and we are fully HIPAA-compliant. We never share your personal health information with third parties."
  },
  {
    question: "Can I use MediCheck for my family members too?",
    answer: "Yes, you can create separate profiles for family members to keep everyone's health data organized and separate. Each profile gets its own personalized insights and recommendations."
  },
  {
    question: "Do I need a subscription to use MediCheck?",
    answer: "MediCheck offers both free and premium tiers. The free tier allows basic report analysis, while premium features include unlimited analyses, trend tracking, and premium AI features."
  },
  {
    question: "Can I share my reports with my doctor?",
    answer: "Absolutely! MediCheck allows you to generate shareable PDFs with your analyzed reports and AI insights that you can easily share with your healthcare provider."
  }
];

const FAQ = forwardRef((props, ref) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about MediCheck and your health reports.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full flex justify-between items-center p-5 rounded-lg text-left transition-all duration-200 ${
                  openIndex === index 
                    ? 'bg-primary-50 border-primary-200 shadow-sm' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <div className={`text-primary-600 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white rounded-b-lg border-x border-b border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;