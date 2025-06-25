import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, Link, Underline, Check, Wand2 } from 'lucide-react';
import { DraftState } from '../../types';

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
  const [isDrafting, setIsDrafting] = useState(false);
  
  const draftAnswers: Record<string, string> = {
    'c0.1': "Sagar Cement Limited is an India-based, vertically integrated cement producer with an installed capacity of 10 million tonnes per annum. Founded in 1985, the company manufactures Ordinary Portland, Portland Pozzolana and Portland Slag cements that serve infrastructure, commercial and residential projects nationwide. With a workforce of ~1,800 employees, Sagar Cement is listed on the National Stock Exchange (NSE: SAGCEM) and is recognised for its focus on energy efficiency, alternative fuels and community development programmes.",
    'c0.2': "Sagar Cement is reporting for the period 1 April 2024 to 31 March 2025, which aligns with our statutory financial year. In addition to the current reporting year, we will disclose verified Scope 1, Scope 2 and limited Scope 3 emissions for the two preceding financial years (FY 2022-23 and FY 2023-24) to enable year-on-year performance comparison.",
    'c0.3': "Sagar Cement's operations are currently limited to India, with integrated clinker-to-cement plants in Telangana and Andhra Pradesh and grinding units in Odisha and Maharashtra. We do not own or operate facilities outside India, nor do we have joint ventures that generate emissions in other jurisdictions.",
    'c0.4': "All financial information in this response will be disclosed in Indian Rupees (INR), which is our primary reporting currency and aligns with our statutory financial statements. This ensures consistency with our annual reports and other public disclosures.",
    'c0.5': "We are reporting climate-related impacts using the operational control approach for consolidating our GHG inventory. This boundary includes all facilities where Sagar Cement has direct operational control, encompassing our integrated cement plants, grinding units, and associated operations. This approach ensures comprehensive coverage of our direct emissions sources and aligns with our management structure and operational decision-making authority.",
    'c-ce0.7': "Sagar Cement operates across multiple segments of the concrete value chain, primarily focusing on: 1) Raw material extraction - limestone quarrying, 2) Clinker production - integrated manufacturing facilities, 3) Cement production - grinding units, and 4) Ready-mix concrete manufacturing. We maintain vertical integration from raw material sourcing through to finished cement products, with strategic presence in key markets through our distribution network.",
    'c-mm0.7': "In the metals and mining value chain, Sagar Cement's operations are primarily focused on limestone quarrying for cement production. Our mining activities include: 1) Exploration and extraction of limestone deposits, 2) Crushing and processing of raw materials, and 3) Transportation to our cement manufacturing facilities. We do not engage in metal mining or processing activities.",
    'c6.1': `For the reporting year FY 2024-25, Sagar Cement's emissions were as follows:

Scope 1 Emissions: 2.1 million tCO2e
- Process emissions: 1.3 million tCO2e
- Fuel combustion: 0.8 million tCO2e

Scope 2 Emissions (location-based): 0.45 million tCO2e
- Grid electricity consumption: 0.42 million tCO2e
- Purchased steam: 0.03 million tCO2e

All emissions have been third-party verified in accordance with ISO 14064-3. Our emissions intensity stands at 0.84 tCO2e per tonne of cementitious product, showing a 3.4% improvement from the previous year (0.87 tCO2e/t).`
  };

  useEffect(() => {
    setIsComplete(false);
  }, [questionId]);

  const handleDraftAnswer = async () => {
    setIsDrafting(true);
    onDraftStateChange?.({ isDrafting: true, progress: 0 });
    const draftText = draftAnswers[questionId] || '';
    
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    let currentText = '';
    for (let i = 0; i < draftText.length; i++) {
      currentText += draftText[i];
      onAnswerChange(currentText);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    setIsDrafting(false);
    onDraftStateChange?.({ isDrafting: false, progress: 100 });
  };

  const handleComplete = () => {
    const newState = !isComplete;
    setIsComplete(newState);
    onComplete?.(newState);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 px-3 py-1.5 border border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDraftAnswer}
            disabled={isDrafting}
          >
            <Wand2 size={16} />
            <span className="text-sm">Let Copilot draft this answer</span>
          </button>
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
      
      <div className="border border-gray-200">
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
        
        <div className="p-3 min-h-[150px]">
          <textarea 
            className="w-full h-full min-h-[120px] resize-none border-none focus:outline-none focus:ring-0 text-sm"
            placeholder="Start typing an answer..."
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Related Answers</h3>
        <div className="bg-gray-50 p-3 border border-gray-200">
          {/* This would contain related answers */}
        </div>
      </div>
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