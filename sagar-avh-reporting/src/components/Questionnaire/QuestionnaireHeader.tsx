import React, { useState } from 'react';
import { CircleUser, ChevronDown } from 'lucide-react';
import GenerateReportModal from '../Modals/GenerateReportModal';

interface QuestionnaireHeaderProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  progressPercentage: number;
}

const QuestionnaireHeader: React.FC<QuestionnaireHeaderProps> = ({ 
  selectedYear, 
  onYearChange, 
  progressPercentage 
}) => {
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const availableYears = [2023, 2024];

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-sm">←</span>
          </button>
          <img src="/avh-logo.png" alt="AVH Logo" className="h-8" />
          <h1 className="text-xl font-bold">AVH ESG Reporting</h1>
          <div className="ml-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1">Sagar Cement</span>
            
            {/* Year Selector */}
            <div className="relative">
              <select 
                className="appearance-none bg-gray-100 text-gray-700 text-xs px-2 py-1 pr-6 border-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                <ChevronDown size={12} className="text-gray-500" />
              </div>
            </div>
            
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1">
              {progressPercentage}% Complete
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
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

      <GenerateReportModal
        isOpen={showGenerateReport}
        onClose={() => setShowGenerateReport(false)}
      />
    </>
  );
};

export default QuestionnaireHeader;