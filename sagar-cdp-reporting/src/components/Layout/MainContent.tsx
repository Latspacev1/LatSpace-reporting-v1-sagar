import React, { useState } from 'react';
import QuestionEditor from '../Questionnaire/QuestionEditor';
import SupportingDocumentation from '../Questionnaire/SupportingDocumentation';
import { questions } from '../../data/mockData';
import { DraftState } from '../../types';

interface MainContentProps {
  questionId: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onQuestionComplete?: (questionId: string, completed: boolean) => void;
  onDraftStateChange?: (state: DraftState) => void;
  onCopilotModeChange?: (mode: 'ASK' | 'WRITE') => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  questionId, 
  answer,
  onAnswerChange,
  onQuestionComplete,
  onDraftStateChange,
  onCopilotModeChange
}) => {
  const [showDocumentation, setShowDocumentation] = useState(true);
  const currentQuestion = questions.find(q => q.id === questionId);

  const handleComplete = (completed: boolean) => {
    onQuestionComplete?.(questionId, completed);
  };

  const handleDraftStateChange = (state: DraftState) => {
    onDraftStateChange?.(state);
  };
  
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="bg-white shadow-sm border border-gray-200 mb-4">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">{currentQuestion?.id}</div>
            <div className="text-base mb-4">
              {currentQuestion?.text}
            </div>
            
            <QuestionEditor 
              questionId={questionId}
              answer={answer}
              onAnswerChange={onAnswerChange}
              onComplete={handleComplete}
              onDraftStateChange={handleDraftStateChange}
              onCopilotModeChange={onCopilotModeChange}
            />
            
          </div>
        </div>
        
        <div className="bg-white shadow-sm border border-gray-200">
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