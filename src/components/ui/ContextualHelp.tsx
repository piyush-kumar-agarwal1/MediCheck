import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface HelpItem {
  id: string;
  title: string;
  content: React.ReactNode;
  priority: number;
}

interface ContextualHelpProps {
  formState: any;
  formErrors: any;
  helpItems: HelpItem[];
  maxItems?: number;
}

const ContextualHelp = ({ formState, formErrors, helpItems, maxItems = 3 }: ContextualHelpProps) => {
  const [relevantHelp, setRelevantHelp] = useState<HelpItem[]>([]);

  useEffect(() => {
    // Determine which help items are most relevant based on form state and errors
    const rankedItems = [...helpItems].sort((a, b) => {
      // Priority 1: Show help for fields with errors
      const aHasError = formErrors && Object.keys(formErrors).some(err => err === a.id);
      const bHasError = formErrors && Object.keys(formErrors).some(err => err === b.id);
      
      if (aHasError && !bHasError) return -1;
      if (!aHasError && bHasError) return 1;
      
      // Priority 2: Show help for empty required fields
      const aIsEmpty = a.id in formState && (!formState[a.id] || formState[a.id] === '');
      const bIsEmpty = b.id in formState && (!formState[b.id] || formState[b.id] === '');
      
      if (aIsEmpty && !bIsEmpty) return -1;
      if (!aIsEmpty && bIsEmpty) return 1;
      
      // Priority 3: Use the predefined priority
      return a.priority - b.priority;
    });
    
    setRelevantHelp(rankedItems.slice(0, maxItems));
  }, [formState, formErrors, helpItems, maxItems]);
  
  if (relevantHelp.length === 0) return null;

  return (
    <Card className="sticky top-6 border-blue-100 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <h3 className="font-medium text-blue-900">Tips & Help</h3>
          </div>
        </div>
        
        <div className="py-2">
          {relevantHelp.length > 0 ? (
            <div>
              {relevantHelp.map((item) => (
                <div key={item.id} className="p-4 border-b border-blue-50 hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {getIconForHelpItem(item.id)}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                      <div className="text-sm text-gray-600">{item.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-400">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p>No relevant tips available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get appropriate icon for each tip type
const getIconForHelpItem = (id: string) => {
  switch(id) {
    case 'reportType':
      return (
        <div className="rounded-full bg-purple-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
      );
    case 'file':
      return (
        <div className="rounded-full bg-green-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        </div>
      );
    case 'glucose':
    case 'hemoglobin':
      return (
        <div className="rounded-full bg-red-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
            <path d="M12 2v6m0 0l3-3m-3 3L9 5" />
            <path d="M12 22v-6m0 0l3 3m-3-3l-3 3" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
      );
    case 'cholesterol':
      return (
        <div className="rounded-full bg-yellow-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      );
    case 'blood_pressure':
      return (
        <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="rounded-full bg-gray-100 p-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
      );
  }
};

export default ContextualHelp;