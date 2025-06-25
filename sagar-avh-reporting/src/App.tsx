import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import CopilotPanel from './components/Layout/CopilotPanel';
import QuestionnaireHeader from './components/Questionnaire/QuestionnaireHeader';
import { categories, avhData } from './data/mockData';
import { DraftState } from './types';

function App() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedCategory, setSelectedCategory] = useState('esg-overview');
  const [selectedIndicator, setSelectedIndicator] = useState('2024-211');
  const [showCopilot, setShowCopilot] = useState(true);
  const [categoriesState, setCategoriesState] = useState(categories);
  const [avhDataState, setAVHDataState] = useState(avhData);
  const [completedIndicators, setCompletedIndicators] = useState<Set<string>>(
    new Set(avhData.find(d => d.year === selectedYear)?.indicators
      .filter(i => i.completed)
      .map(i => i.id) || [])
  );
  const [draftState, setDraftState] = useState<DraftState>({
    isDrafting: false,
    progress: 0
  });
  
  const getCurrentYearData = () => {
    return avhDataState.find(d => d.year === selectedYear);
  };

  const getCurrentIndicators = () => {
    return getCurrentYearData()?.indicators || [];
  };

  const getCurrentIndicator = () => {
    return getCurrentIndicators().find(i => i.id === selectedIndicator);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setCategoriesState(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
          ? { ...category, expanded: !category.expanded } 
          : category
      )
    );
  };

  const handleIndicatorSelect = (indicatorId: string) => {
    setSelectedIndicator(indicatorId);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Update completed indicators for the new year
    const newYearData = avhDataState.find(d => d.year === year);
    setCompletedIndicators(new Set(
      newYearData?.indicators.filter(i => i.completed).map(i => i.id) || []
    ));
    
    // Reset selection to first indicator of the year
    const firstIndicator = newYearData?.indicators[0];
    if (firstIndicator) {
      setSelectedIndicator(firstIndicator.id);
    }
  };

  const handleIndicatorValueChange = (indicatorId: string, value: string | number | boolean | null, notApplicable: boolean = false, notAvailable: boolean = false, explanation?: string) => {
    setAVHDataState(prevData => 
      prevData.map(yearData => 
        yearData.year === selectedYear
          ? {
              ...yearData,
              indicators: yearData.indicators.map(indicator =>
                indicator.id === indicatorId
                  ? { 
                      ...indicator, 
                      value, 
                      notApplicable,
                      notAvailable,
                      explanation,
                      completed: !notApplicable && !notAvailable && (value !== null && value !== '')
                    }
                  : indicator
              ),
              lastUpdated: new Date()
            }
          : yearData
      )
    );
  };

  const handleIndicatorComplete = (indicatorId: string, completed: boolean) => {
    setCompletedIndicators(prev => {
      const newSet = new Set(prev);
      if (completed) {
        newSet.add(indicatorId);
      } else {
        newSet.delete(indicatorId);
      }
      return newSet;
    });

    // Update the indicator's completed status
    setAVHDataState(prevData => 
      prevData.map(yearData => 
        yearData.year === selectedYear
          ? {
              ...yearData,
              indicators: yearData.indicators.map(indicator =>
                indicator.id === indicatorId
                  ? { ...indicator, completed }
                  : indicator
              )
            }
          : yearData
      )
    );
  };

  const handleDraftStateChange = (state: DraftState) => {
    setDraftState(state);
    if (!showCopilot) {
      setShowCopilot(true);
    }
  };

  const currentYearData = getCurrentYearData();
  const progressPercentage = currentYearData?.completionPercentage || 0;
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <QuestionnaireHeader 
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        progressPercentage={progressPercentage}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0 overflow-hidden">
          <Sidebar 
            categories={categoriesState}
            selectedCategory={selectedCategory}
            selectedIndicator={selectedIndicator}
            selectedYear={selectedYear}
            indicators={getCurrentIndicators()}
            onCategorySelect={setSelectedCategory}
            onCategoryToggle={handleCategoryToggle}
            onIndicatorSelect={handleIndicatorSelect}
            completedIndicators={completedIndicators}
          />
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          <MainContent 
            indicator={getCurrentIndicator()}
            onIndicatorValueChange={handleIndicatorValueChange}
            onIndicatorComplete={handleIndicatorComplete}
            onDraftStateChange={handleDraftStateChange}
          />
          
          {showCopilot && (
            <div className="flex-shrink-0">
              <CopilotPanel 
                onClose={() => setShowCopilot(false)} 
                draftState={draftState}
                indicatorId={selectedIndicator}
                selectedYear={selectedYear}
              />
            </div>
          )}
        </div>
      </div>
      
      {!showCopilot && (
        <button 
          className="fixed bottom-4 right-4 bg-indigo-700 text-white p-2 rounded-md shadow-lg hover:bg-indigo-800 transition-colors"
          onClick={() => setShowCopilot(true)}
        >
          <div className="flex items-center gap-2 px-2">
            <span>Copilot</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default App;