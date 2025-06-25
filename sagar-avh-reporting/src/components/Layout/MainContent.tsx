import React, { useState } from 'react';
import IndicatorEditor from '../Questionnaire/IndicatorEditor';
import SupportingDocumentation from '../Questionnaire/SupportingDocumentation';
import { AVHIndicator, DraftState } from '../../types';

interface MainContentProps {
  indicator?: AVHIndicator;
  onIndicatorValueChange: (indicatorId: string, value: string | number | boolean | null, notApplicable?: boolean, notAvailable?: boolean, explanation?: string) => void;
  onIndicatorComplete?: (indicatorId: string, completed: boolean) => void;
  onDraftStateChange?: (state: DraftState) => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  indicator,
  onIndicatorValueChange,
  onIndicatorComplete,
  onDraftStateChange
}) => {
  const [showDocumentation, setShowDocumentation] = useState(true);

  const handleDraftStateChange = (state: DraftState) => {
    onDraftStateChange?.(state);
  };
  
  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-full">
        <div className="bg-white shadow-sm border border-gray-200 mb-4">
          <IndicatorEditor 
            indicator={indicator}
            onValueChange={onIndicatorValueChange}
            onComplete={onIndicatorComplete}
            onDraftStateChange={handleDraftStateChange}
          />
        </div>
        
        <div className="bg-white shadow-sm border border-gray-200 mx-6 mb-6">
          <button 
            className="w-full p-4 flex items-center justify-between border-b border-gray-200"
            onClick={() => setShowDocumentation(!showDocumentation)}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600">📄</span>
              <span className="font-medium">Supporting Documentation</span>
            </div>
            <span className={`transform transition-transform ${showDocumentation ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {showDocumentation && <SupportingDocumentation />}
        </div>
      </div>
    </div>
  );
};

export default MainContent;