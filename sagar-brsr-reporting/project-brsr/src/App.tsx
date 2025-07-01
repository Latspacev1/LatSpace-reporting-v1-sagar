import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import QuestionnaireHeader from './components/Questionnaire/QuestionnaireHeader';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import CopilotPanel from './components/Layout/CopilotPanel';
import Drilldown from './components/Drilldown';
import { sections as mockSections, questions } from './data/mockData';
import { DraftState } from './types';

function App() {
  const [selectedSection, setSelectedSection] = useState('section-a');
  const [selectedQuestion, setSelectedQuestion] = useState('a1');
  const [showCopilot, setShowCopilot] = useState(true);
  const [sectionsState, setSectionsState] = useState(mockSections);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [draftState, setDraftState] = useState<DraftState>({
    isDrafting: false,
    progress: 0
  });
  const [showDrilldown, setShowDrilldown] = useState(false);
  const [drilldownData, setDrilldownData] = useState<{
    questionId: string;
    rowId: string;
    columnId: string;
    value: any;
  } | null>(null);

  // Section A prefill values
  const sectionAAnswers = {
    a1: 'L26942TG1981PLC002887',
    a2: 'Sagar Cements Limited',
    a3: '1981-01-15', // ISO format for date input
    a4: 'Plot No.111, Road No.10 Jubilee Hills, Hyderabad-500 033',
    a5: 'Plot No.111, Road No.10 Jubilee Hills, Hyderabad-500 033',
    a6: 'info@sagarcements.in',
    a7: '040 - 23351571',
    a8: 'www.sagarcements.in',
    a9: 'FY 2023-24',
    a10: 'Both BSE and NSE',
    a11: 'H 26,14,15,096/-',
  };

  useEffect(() => {
    // Prefill Section A answers and mark as completed
    setAnswers((prev) => ({ ...sectionAAnswers, ...prev }));
    setCompletedQuestions((prev) => {
      const newSet = new Set(prev);
      Object.keys(sectionAAnswers).forEach((id) => newSet.add(id));
      return newSet;
    });
  }, []);

  const handleSectionToggle = (sectionId: string) => {
    setSectionsState(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded } 
          : section
      )
    );
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuestionComplete = (questionId: string, completed: boolean) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev);
      if (completed) {
        newSet.add(questionId);
      } else {
        newSet.delete(questionId);
      }
      return newSet;
    });
  };

  const handleDraftStateChange = (state: DraftState) => {
    setDraftState(state);
    if (!showCopilot) {
      setShowCopilot(true);
    }
  };

  const handleCellClick = (rowId: string, columnId: string, value: any) => {
    setDrilldownData({
      questionId: selectedQuestion,
      rowId,
      columnId,
      value
    });
    setShowDrilldown(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <QuestionnaireHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0 overflow-hidden">
          <Sidebar 
            sections={sectionsState}
            selectedSection={selectedSection}
            selectedQuestion={selectedQuestion}
            onSectionSelect={setSelectedSection}
            onSectionToggle={handleSectionToggle}
            onQuestionSelect={handleQuestionSelect}
            completedQuestions={completedQuestions}
          />
        </div>
        <div className="flex-1 overflow-hidden flex">
          <MainContent 
            questionId={selectedQuestion}
            answer={answers[selectedQuestion] || ''}
            onAnswerChange={(answer) => handleAnswerChange(selectedQuestion, answer)}
            onQuestionComplete={handleQuestionComplete}
            onDraftStateChange={handleDraftStateChange}
            onCellClick={handleCellClick}
            disabled={Object.keys(sectionAAnswers).includes(selectedQuestion)}
          />
          {showCopilot && (
            <div className="flex-shrink-0">
              <CopilotPanel 
                onClose={() => setShowCopilot(false)} 
                draftState={draftState}
                questionId={selectedQuestion}
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
            <img 
              src="/brsr-circle.svg"
              alt="BRSR Logo"
              className="h-4 w-4"
            />
            <span>Copilot</span>
          </div>
        </button>
      )}

      {showDrilldown && drilldownData && (
        <Drilldown 
          data={drilldownData}
          onClose={() => setShowDrilldown(false)}
        />
      )}
    </div>
  );
}

export default App;