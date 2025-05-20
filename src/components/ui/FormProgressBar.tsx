import { useState, useEffect } from 'react';

interface Step {
  id: string;
  label: string;
  isComplete: boolean;
}

interface FormProgressBarProps {
  steps: Step[];
  currentStepId: string;
}

const FormProgressBar = ({ steps, currentStepId }: FormProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Calculate progress percentage
    const completedSteps = steps.filter(step => step.isComplete).length;
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
    
    // Factor in partial completion of current step
    const totalSteps = steps.length;
    const progressPerStep = 100 / totalSteps;
    
    // Current step is counted as half complete if it's not marked complete yet
    const currentProgress = (completedSteps * progressPerStep) + 
      (currentStepIndex >= 0 && !steps[currentStepIndex].isComplete ? progressPerStep / 2 : 0);
    
    setProgress(currentProgress);
  }, [steps, currentStepId]);
  
  return (
    <div className="w-full mb-8">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
          <div
            style={{ width: `${progress}%` }}
            className="flex flex-col justify-center text-center text-white bg-blue-600 shadow-none whitespace-nowrap transition-all duration-500"
          ></div>
        </div>
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center ${index < steps.length - 1 ? 'w-full' : ''}`}
            >
              <div 
                className={`rounded-full h-8 w-8 flex items-center justify-center z-10 ${
                  step.isComplete ? 'bg-green-500 text-white' : 
                  currentStepId === step.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs mt-1 text-center">{step.label}</div>
              {index < steps.length - 1 && (
                <div 
                  className={`h-0.5 w-full mt-4 ${
                    steps[index].isComplete && steps[index + 1].isComplete ? 'bg-green-500' :
                    steps[index].isComplete ? 'bg-blue-500' : 'bg-gray-300'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormProgressBar;