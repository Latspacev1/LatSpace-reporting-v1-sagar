import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, Link, Underline, Plus, Check } from 'lucide-react';
import { DraftState, Question } from '../../types';
import { questions } from '../../data/mockData';
import FormField from '../Forms/FormField';

interface QuestionEditorProps {
  questionId: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onComplete?: (completed: boolean) => void;
  onDraftStateChange?: (state: DraftState) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ 
  questionId, 
  answer,
  onAnswerChange,
  onComplete,
  onDraftStateChange
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [format, setFormat] = useState('Normal');
  
  const currentQuestion = questions.find(q => q.id === questionId);

  useEffect(() => {
    setIsComplete(false);
  }, [questionId]);

  const handleComplete = () => {
    const newState = !isComplete;
    setIsComplete(newState);
    onComplete?.(newState);
  };
  
  if (!currentQuestion) {
    return <div className="p-4 text-gray-500">Question not found</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* Removed "Let Copilot draft this answer" button */}
        </div>
        <button 
          className={`flex items-center gap-1 px-3 py-1.5 text-sm transition-colors ${
            isComplete 
              ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
          }`}
          onClick={handleComplete}
        >
          {isComplete && <Check size={16} />}
          <span>Mark Complete</span>
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <FormField
          question={currentQuestion}
          value={answer}
          onChange={onAnswerChange}
        />
      </div>
      
      {currentQuestion.type === 'text' && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Formatting Tools</h3>
          <div className="border border-gray-200 rounded-lg">
            <div className="flex border-b border-gray-200">
              <div className="relative">
                <select 
                  className="appearance-none bg-transparent border-none px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex border-l border-gray-200">
                <button className="p-2 hover:bg-gray-100 border-r border-gray-200">
                  <Bold size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 border-r border-gray-200">
                  <Italic size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 border-r border-gray-200">
                  <List size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 border-r border-gray-200">
                  <Link size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100">
                  <Underline size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronDown: React.FC<{ size: number, className: string }> = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export default QuestionEditor;