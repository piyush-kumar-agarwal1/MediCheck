import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

// Static article data
const articles = [
  {
    id: 1,
    title: "Understanding Blood Test Results: What's Normal and What's Not",
    excerpt: "Learn how to interpret common blood work markers and what they mean for your overall health.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    readTime: "5 min read",
    category: "Lab Results"
  },
  {
    id: 2,
    title: "The Connection Between Sleep Quality and Heart Health",
    excerpt: "New research shows how improving your sleep habits can significantly impact cardiovascular health.",
    image: "https://images.unsplash.com/photo-1579684285214-6c8132aaf305?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    readTime: "4 min read",
    category: "Sleep Science"
  },
  {
    id: 3,
    title: "Nutrition Myths Debunked by Medical Research",
    excerpt: "Medical experts weigh in on common nutrition misconceptions and what the science actually says.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    readTime: "7 min read",
    category: "Nutrition"
  }
];

const WellnessArticles = () => {
  return (
    <Card className="border-blue-100">
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-5 py-3 border-b border-blue-200">
        <h3 className="font-medium flex items-center text-blue-700">
          <BookOpen className="mr-2 h-4 w-4" />
          Wellness Articles
        </h3>
      </div>
      
      <CardContent className="p-5 grid gap-5">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col md:flex-row gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">
                  {article.readTime}
                </span>
              </div>
              
              <h4 className="font-medium text-lg mb-2 hover:text-primary-600 cursor-pointer transition-colors">
                {article.title}
              </h4>
              
              <p className="text-gray-600 text-sm mb-3">
                {article.excerpt}
              </p>
              
              <a href="#" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                Read more <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WellnessArticles;