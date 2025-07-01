import React, { useState } from 'react';
import { CircleUser } from 'lucide-react';
import GenerateReportModal from '../Modals/GenerateReportModal';

const QuestionnaireHeader: React.FC = () => {
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-sm">←</span>
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="/brsr-circle.svg"
              alt="BRSR Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold">BRSR Reporting Framework 2025</h1>
          </div>
          <div className="ml-2 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1">BRSR - Sagar Cements</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1">FY 2024-25</span>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1">Essential + Leadership</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2"
            onClick={() => setShowGenerateReport(true)}
          >
            Generate BRSR Report
          </button>
          <button className="flex items-center justify-center w-8 h-8 hover:bg-gray-100">
            <CircleUser className="text-gray-700" />
          </button>
        </div>
      </div>

      <GenerateReportModal
        isOpen={showGenerateReport}
        onClose={() => setShowGenerateReport(false)}
      />
    </>
  );
};

export default QuestionnaireHeader;