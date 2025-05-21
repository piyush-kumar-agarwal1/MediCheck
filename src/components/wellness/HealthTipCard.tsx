import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

// Array of health tips
const healthTips = [
  {
    title: "Stay Hydrated",
    content: "Drink at least 8 glasses of water daily. Staying hydrated improves energy levels, brain function, and helps regulate body temperature.",
    icon: "💧"
  },
  {
    title: "Practice Mindfulness",
    content: "Take 5 minutes each day to practice mindful breathing. Focus on your breath to reduce stress and improve mental clarity.",
    icon: "🧘"
  },
  {
    title: "Regular Movement",
    content: "Try to stand up and stretch every hour if you work at a desk. Short walking breaks can boost circulation and productivity.",
    icon: "🚶"
  },
  {
    title: "Balanced Nutrition",
    content: "Include at least 5 servings of fruits and vegetables in your daily diet to ensure you get essential vitamins and nutrients.",
    icon: "🥗"
  },
  {
    title: "Quality Sleep",
    content: "Aim for 7-8 hours of quality sleep. Establish a regular sleep schedule and create a restful environment to improve sleep quality.",
    icon: "😴"
  },
  {
    title: "Limit Screen Time",
    content: "Take regular breaks from screens. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    icon: "📱"
  },
  {
    title: "Strengthen Social Connections",
    content: "Regular social interaction boosts mental health. Make time to connect with friends and family, even if it's just a quick call.",
    icon: "👫"
  }
];

const HealthTipCard = () => {
  const [currentTip, setCurrentTip] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get today's date to determine which tip to show
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % healthTips.length;
    setCurrentTip(healthTips[tipIndex]);
  }, []);

  const handleNextTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const currentIndex = healthTips.findIndex(tip => tip.title === currentTip.title);
      const nextIndex = (currentIndex + 1) % healthTips.length;
      setCurrentTip(healthTips[nextIndex]);
      setIsAnimating(false);
    }, 300);
  };

  if (!currentTip) return null;

  return (
    <Card className="overflow-hidden border-primary-100">
      <div className="bg-gradient-to-r from-primary-100 to-primary-50 px-5 py-3 border-b border-primary-200">
        <h3 className="font-medium flex items-center text-primary-700">
          <Lightbulb className="mr-2 h-4 w-4" />
          Health Tip of the Day
        </h3>
      </div>
      
      <CardContent className={`pt-5 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-3 text-center">
          <span className="text-4xl">{currentTip.icon}</span>
        </div>
        <h4 className="font-medium text-lg mb-3 text-center">{currentTip.title}</h4>
        <p className="text-gray-600">{currentTip.content}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleNextTip} disabled={isAnimating}>
          Show Another Tip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthTipCard;