import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, Pause, Play, RefreshCw } from 'lucide-react';
const INHALE_TIME = 4; // seconds
const HOLD_TIME = 4; // seconds
const EXHALE_TIME = 6; // seconds
const TOTAL_CYCLE = INHALE_TIME + HOLD_TIME + EXHALE_TIME;

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [phase, setPhase] = useState('ready'); // 'ready', 'inhale', 'hold', 'exhale'
  const [cycles, setCycles] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const updateTimer = () => {
      setTime(prevTime => {
        const newTime = prevTime + 0.1;
        
        // Determine breathing phase
        if (newTime % TOTAL_CYCLE < INHALE_TIME) {
          setPhase('inhale');
        } else if (newTime % TOTAL_CYCLE < INHALE_TIME + HOLD_TIME) {
          setPhase('hold');
        } else {
          setPhase('exhale');
        }
        
        // Count completed cycles
        if (Math.floor(newTime / TOTAL_CYCLE) > Math.floor(prevTime / TOTAL_CYCLE)) {
          setCycles(c => c + 1);
        }
        
        return newTime;
      });
      
      animationRef.current = requestAnimationFrame(updateTimer);
    };

    animationRef.current = requestAnimationFrame(updateTimer);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setTime(0);
    setPhase('ready');
    setCycles(0);
  };

  // Calculate progress for the current phase
  const calculateProgress = () => {
    const cycleTime = time % TOTAL_CYCLE;
    
    if (cycleTime < INHALE_TIME) {
      return (cycleTime / INHALE_TIME) * 100;
    } else if (cycleTime < INHALE_TIME + HOLD_TIME) {
      return 100;
    } else {
      return (1 - ((cycleTime - INHALE_TIME - HOLD_TIME) / EXHALE_TIME)) * 100;
    }
  };

  // Get instructions based on current phase
  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe out...';
      default: return 'Press start to begin';
    }
  };

  return (
    <Card className="overflow-hidden border-teal-100">
      <div className="bg-gradient-to-r from-teal-100 to-teal-50 px-5 py-3 border-b border-teal-200">
        <h3 className="font-medium flex items-center text-teal-700">
          <Wind className="mr-2 h-4 w-4" />
          Breathing Exercise
        </h3>
      </div>
      
      <CardContent className="p-5">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div 
              className={`w-32 h-32 rounded-full flex items-center justify-center border-4 
              ${phase === 'inhale' ? 'border-blue-400 animate-pulse-slow' : 
                phase === 'hold' ? 'border-teal-400' : 
                phase === 'exhale' ? 'border-green-400 animate-pulse-slow' : 
                'border-gray-200'}`}
            >
              <div 
                className="absolute inset-0 rounded-full bg-blue-100 opacity-20"
                style={{ 
                  transform: `scale(${isActive ? calculateProgress() / 100 : 0.2})`,
                  transition: 'transform 0.3s ease-out'
                }}
              ></div>
              
              <div className="text-center z-10">
                <p className="text-xl font-semibold text-gray-700">{cycles}</p>
                <p className="text-xs text-gray-500">cycles</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 font-medium mb-2">
            {getInstructions()}
          </p>
          
          <div className="flex justify-center space-x-3 mt-2">
            <Button 
              size="sm"
              variant={isActive ? "outline" : "default"}
              onClick={toggleActive}
            >
              {isActive ? <><Pause size={16} className="mr-1" /> Pause</> : <><Play size={16} className="mr-1" /> Start</>}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={resetExercise}
            >
              <RefreshCw size={16} className="mr-1" /> Reset
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          <p>4-4-6 breathing technique helps reduce stress and anxiety</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;