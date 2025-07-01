import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import CopilotPanel from './components/Layout/CopilotPanel';
import QuestionnaireHeader from './components/Questionnaire/QuestionnaireHeader';
import { sections, questions } from './data/mockData';
import { DraftState } from './types';

function App() {
  const [selectedSection, setSelectedSection] = useState('c0');
  const [selectedQuestion, setSelectedQuestion] = useState('c0.1');
  const [showCopilot, setShowCopilot] = useState(true);
  const [sectionsState, setSectionsState] = useState(sections);
  const defaultCompleted = new Set(questions.filter(q => q.id !== 'c0.1').map(q => q.id));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(defaultCompleted);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draftState, setDraftState] = useState<DraftState>({
    isDrafting: false,
    progress: 0
  });
  const [copilotMode, setCopilotMode] = useState<'ASK' | 'WRITE'>('ASK');
  
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

  const handleAnswerChange = (questionId: string, answer: string) => {
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

  const handleCopilotModeChange = (mode: 'ASK' | 'WRITE') => {
    setCopilotMode(mode);
    if (!showCopilot) {
      setShowCopilot(true);
    }
  };

  const progressPercentage = (completedQuestions.size / questions.length) * 100;
  
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
            onCopilotModeChange={handleCopilotModeChange}
          />
          
          {showCopilot && (
            <div className="flex-shrink-0">
              <CopilotPanel 
                onClose={() => setShowCopilot(false)} 
                draftState={draftState}
                questionId={selectedQuestion}
                initialMode={copilotMode}
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