import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { AVHCategory, AVHIndicator } from '../../types';

interface SidebarProps {
  categories: AVHCategory[];
  selectedCategory: string;
  selectedIndicator: string;
  selectedYear: number;
  indicators: AVHIndicator[];
  onCategorySelect: (categoryId: string) => void;
  onCategoryToggle: (categoryId: string) => void;
  onIndicatorSelect: (indicatorId: string) => void;
  completedIndicators: Set<string>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  selectedCategory,
  selectedIndicator,
  selectedYear,
  indicators,
  onCategoryToggle,
  onIndicatorSelect,
  completedIndicators
}) => {
  const getIndicatorsForCategory = (categoryId: string) => {
    return indicators.filter(indicator => indicator.category === categoryId);
  };

  const getTotalIndicators = () => indicators.length;
  const getCompletedCount = () => completedIndicators.size;
  const getCompletionPercentage = () => {
    const total = getTotalIndicators();
    return total > 0 ? Math.round((getCompletedCount() / total) * 100) : 0;
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 overflow-auto">
      <div className="flex border-b border-gray-200">
        <button className="px-4 py-3 text-sm font-medium text-gray-800 border-b-2 border-gray-800">
          Indicators
        </button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">
          Files
        </button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">
          Activity
        </button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium mb-2">AVH Reporting {selectedYear}</h2>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">{getCompletedCount()}/{getTotalIndicators()} complete</span>
          <span className="text-gray-500">{getCompletionPercentage()}%</span>
        </div>
        <div className="mt-2 relative">
          <div className="w-full h-1 bg-gray-200"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-green-500" 
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <div className="mt-4">
          <button className="flex items-center justify-between w-full p-2 border border-gray-300 text-sm">
            <span>All Categories</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="mt-1">
        {categories.map((category) => {
          const categoryIndicators = getIndicatorsForCategory(category.id);
          const categoryCompleted = categoryIndicators.filter(i => completedIndicators.has(i.id)).length;
          
          return (
            <div key={category.id} className="border-b border-gray-200">
              <button 
                className={`w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  selectedCategory === category.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => onCategoryToggle(category.id)}
              >
                <div className="flex items-center">
                  <span className="font-medium text-sm">{category.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({categoryCompleted}/{categoryIndicators.length})
                  </span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${category.expanded ? 'transform rotate-180' : ''}`}
                />
              </button>
              
              {category.expanded && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {categoryIndicators.map((indicator) => {
                    const isCompleted = completedIndicators.has(indicator.id);
                    return (
                      <button
                        key={indicator.id}
                        className={`w-full text-left p-3 pl-6 text-sm hover:bg-gray-100 transition-colors ${
                          selectedIndicator === indicator.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                        }`}
                        onClick={() => onIndicatorSelect(indicator.id)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <Check size={16} className="text-green-500 mt-0.5" />
                            ) : (
                              <div className="w-4 h-4 border border-gray-300 rounded mt-0.5"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gray-500 text-xs">{indicator.hierarchicalNumber || indicator.internalId}</span>
                              <span className="text-xs bg-gray-200 px-1 rounded">{indicator.type}</span>
                            </div>
                            <span className="block truncate">{indicator.name}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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