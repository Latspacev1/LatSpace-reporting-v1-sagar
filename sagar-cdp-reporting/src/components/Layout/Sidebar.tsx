import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Section, Question } from '../../types';
import { questions } from '../../data/mockData';

interface SidebarProps {
  sections: Section[];
  selectedSection: string;
  selectedQuestion: string;
  onSectionSelect: (sectionId: string) => void;
  onSectionToggle: (sectionId: string) => void;
  onQuestionSelect: (questionId: string) => void;
  completedQuestions: Set<string>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sections, 
  selectedSection,
  selectedQuestion,
  onSectionSelect,
  onSectionToggle,
  onQuestionSelect,
  completedQuestions
}) => {
  const getQuestionsForSection = (sectionId: string) => {
    return questions.filter(q => q.sectionId === sectionId);
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 overflow-auto">
      <div className="flex border-b border-gray-200">
        <button className="px-4 py-3 text-sm font-medium text-gray-800 border-b-2 border-gray-800">
          Standard
        </button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">
          Files
        </button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">
          Activity
        </button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium mb-2">Disclosure Requirements</h2>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">6/170 complete</span>
          <span className="text-gray-500">{((6/170)*100).toFixed(0)}%</span>
        </div>
        <div className="mt-2 relative">
          <div className="w-full h-1 bg-gray-200"></div>
          <div className="absolute top-0 left-0 h-1 bg-green-500" style={{ width: `${(6/170)*100}%` }}></div>
        </div>
        <div className="mt-4">
          <button className="flex items-center justify-between w-full p-2 border border-gray-300 text-sm">
            <span>All</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="mt-1">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200">
            <button 
              className={`w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                selectedSection === section.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => onSectionToggle(section.id)}
            >
              <div className="flex items-center">
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${section.expanded ? 'transform rotate-180' : ''}`}
              />
            </button>
            
            {section.expanded && (
              <div className="bg-gray-50 border-t border-gray-200">
                {getQuestionsForSection(section.id).map((question) => (
                  <button
                    key={question.id}
                    className={`w-full text-left p-3 pl-6 text-sm hover:bg-gray-100 transition-colors ${
                      selectedQuestion === question.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                    }`}
                    onClick={() => onQuestionSelect(question.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{question.id}</span>
                      <span className="flex-1">{question.text}</span>
                      {completedQuestions && completedQuestions.has(question.id) && (
                        <Check size={16} className="text-green-500 ml-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check size={16} className="text-green-500" />
          <span>All Changes Saved</span>
          <span className="ml-auto text-gray-400">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar