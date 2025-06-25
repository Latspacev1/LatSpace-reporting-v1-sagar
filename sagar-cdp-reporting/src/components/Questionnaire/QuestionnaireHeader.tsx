import React, { useState } from 'react';
import { CircleUser } from 'lucide-react';
import CDPScoreModal from '../Modals/CDPScoreModal';
import GenerateReportModal from '../Modals/GenerateReportModal';

const QuestionnaireHeader: React.FC = () => {
  const [showCDPScore, setShowCDPScore] = useState(false);
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-sm">←</span>
          </button>
          <h1 className="text-xl font-bold">CDP Climate Change Questionnaire 2025</h1>
          <div className="ml-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1">CDP - Sagar Cement</span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1">2025</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-sm font-medium transition-colors"
            onClick={() => setShowCDPScore(true)}
          >
            Mock CDP Score
          </button>
          <button 
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2"
            onClick={() => setShowGenerateReport(true)}
          >
            Generate Report
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:bg-gray-100">
            <CircleUser className="text-gray-700" />
          </button>
        </div>
      </div>

      <CDPScoreModal 
        isOpen={showCDPScore}
        onClose={() => setShowCDPScore(false)}
      />

      <GenerateReportModal
        isOpen={showGenerateReport}
        onClose={() => setShowGenerateReport(false)}
      />
    </>
  );
};

export default QuestionnaireHeader;