import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Search, FileText, Globe, CheckCircle2, Building2, Calculator, LineChart, DollarSign, Factory, Workflow, BarChart, PieChart, ArrowRight, AlertTriangle, Users, Calendar, MapPin, MessageCircleQuestion, PenTool, Loader2, FolderOpen, File } from 'lucide-react';
import { DraftState } from '../../types';
import { sendChatMessageWithSearch, ChatMessage } from '../../services/openai';
import toast from 'react-hot-toast';

interface CopilotPanelProps {
  onClose: () => void;
  draftState?: DraftState;
  questionId?: string;
}

interface CopilotMessage {
  type: 'system' | 'action' | 'source' | 'thinking' | 'calculation' | 'chart' | 'alert' | 'table' | 'user' | 'assistant' | 'search' | 'drive';
  content: string;
  icon?: React.ReactNode;
  data?: any;
  searchResults?: any[];
  driveFiles?: any[];
}

const companyProfileWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Analyzing company profile...',
    icon: <Building2 className="text-blue-500" size={16} />
  },
  {
    type: 'table',
    content: 'Company Overview',
    icon: <Users className="text-indigo-500" size={16} />,
    data: {
      headers: ['Metric', 'Value'],
      rows: [
        ['Founded', '2017'],
        ['Parent Group', 'Aditya Birla Group'],
        ['CIN', 'U70100MH2017PTC303291'],
        ['Industry', 'Real Estate Development']
      ]
    }
  },
  {
    type: 'table',
    content: 'Development Portfolio',
    icon: <Factory className="text-green-500" size={16} />,
    data: {
      headers: ['Metric', 'Value'],
      rows: [
        ['Area Under Development', '3+ Million sq. ft.'],
        ['Active Cities', '4 (Mumbai, NCR, Bengaluru, Pune)'],
        ['Green Certified Projects', '70% Portfolio']
      ]
    }
  },
  {
    type: 'alert',
    content: '✓ Company profile verified against Aditya Birla Group subsidiaries',
    icon: <CheckCircle2 className="text-green-500" size={16} />
  }
];

const reportingPeriodWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Validating reporting timeline...',
    icon: <Calendar className="text-purple-500" size={16} />
  },
  {
    type: 'table',
    content: 'Reporting Periods',
    icon: <FileText className="text-blue-500" size={16} />,
    data: {
      headers: ['Year', 'Period', 'Status'],
      rows: [
        ['Current', 'Apr 2024 - Mar 2025', 'Active'],
        ['Previous', 'Apr 2023 - Mar 2024', 'Verified'],
        ['Historical', 'Apr 2022 - Mar 2023', 'Verified']
      ]
    }
  },
  {
    type: 'table',
    content: 'Data Verification Status',
    icon: <CheckCircle2 className="text-green-500" size={16} />,
    data: {
      headers: ['Scope', 'Coverage', 'Assurance'],
      rows: [
        ['Scope 1', '100%', 'Third-party verified'],
        ['Scope 2', '100%', 'Third-party verified'],
        ['Scope 3', '90%', 'Embodied carbon focus']
      ]
    }
  }
];

const geographicWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Mapping operational footprint...',
    icon: <Globe className="text-blue-500" size={16} />
  },
  {
    type: 'table',
    content: 'Active Development Projects',
    icon: <MapPin className="text-red-500" size={16} />,
    data: {
      headers: ['Location', 'Project Type', 'Area (sq. ft.)'],
      rows: [
        ['Mumbai', 'Premium Residential', '1.2M'],
        ['NCR (Gurgaon)', 'Luxury Apartments', '0.8M'],
        ['Bengaluru', 'Integrated Township', '0.7M'],
        ['Pune', 'Mixed Development', '0.5M']
      ]
    }
  },
  {
    type: 'table',
    content: 'Market Presence',
    icon: <BarChart className="text-indigo-500" size={16} />,
    data: {
      headers: ['Region', 'Project Share', 'Certification'],
      rows: [
        ['Mumbai Metro', '40%', 'IGBC Platinum'],
        ['NCR', '30%', 'IGBC Gold'],
        ['Bengaluru', '20%', 'GRIHA 4-star'],
        ['Pune', '10%', 'EDGE Certified']
      ]
    }
  }
];

const emissionsWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Initiating comprehensive emissions analysis...',
    icon: <img src="/brsr-circle.svg" alt="BRSR Logo" className="h-4 w-4" />
  },
  {
    type: 'table',
    content: 'Construction Activity Metrics',
    icon: <Factory className="text-blue-500" size={16} />,
    data: {
      headers: ['Metric', 'Value', 'Unit'],
      rows: [
        ['Area Under Construction', '2.1', 'Million sq. ft.'],
        ['Concrete Consumption', '850', 'Thousand tonnes'],
        ['Steel Consumption', '125', 'Thousand tonnes']
      ]
    }
  },
  {
    type: 'table',
    content: 'Energy Source Analysis',
    icon: <PieChart className="text-green-500" size={16} />,
    data: {
      headers: ['Source', 'Consumption', 'Share'],
      rows: [
        ['Grid Electricity', '18.3 GWh', '60%'],
        ['Diesel Generators', '8.7 GWh', '28%'],
        ['Solar (On-site)', '3.6 GWh', '12%']
      ]
    }
  },
  {
    type: 'table',
    content: 'Emissions by Scope',
    icon: <Calculator className="text-orange-500" size={16} />,
    data: {
      headers: ['Scope', 'Emissions', 'Share'],
      rows: [
        ['Scope 1 (Direct)', '12.5k tCO2e', '6%'],
        ['Scope 2 (Electricity)', '18.3k tCO2e', '8%'],
        ['Scope 3 (Materials)', '185k tCO2e', '86%']
      ]
    }
  },
  {
    type: 'table',
    content: 'Carbon Intensity Tracking',
    icon: <LineChart className="text-blue-500" size={16} />,
    data: {
      headers: ['Period', 'Intensity', 'Change'],
      rows: [
        ['Current Year', '42.3 kgCO2e/sq.ft', '-'],
        ['Previous Year', '48.1 kgCO2e/sq.ft', '-12%'],
        ['2025 Target', '35.0 kgCO2e/sq.ft', '-17%']
      ]
    }
  },
  {
    type: 'alert',
    content: '✓ All emissions data verified with focus on embodied carbon reduction',
    icon: <CheckCircle2 className="text-green-500" size={16} />
  }
];

// Utility to render markdown-like bold (**text**) and clean up spacing
function renderCopilotContent(content: string) {
  // Replace **text** with <strong>text</strong>
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const CopilotPanel: React.FC<CopilotPanelProps> = ({ onClose, draftState, questionId }) => {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'ASK' | 'WRITE'>('ASK');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      type: 'system',
      content: "Hello! I'm your Copilot assistant for BRSR disclosures. How can I help you today?",
    }
  ]);

  const addMessage = (message: CopilotMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    
    // Add user message
    addMessage({
      type: 'user',
      content: userMessage,
      icon: <Users className="text-gray-600" size={16} />
    });

    setIsLoading(true);

    try {
      // Add a searching indicator if in ASK mode
      if (mode === 'ASK') {
        setIsSearching(true);
        addMessage({
          type: 'system',
          content: 'Analyzing your question and searching the web if needed...',
          icon: <Loader2 className="text-blue-600 animate-spin" size={16} />
        });
      }

      // Prepare chat history for OpenAI
      const chatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful assistant specializing in BRSR (Business Responsibility & Sustainability Reporting) disclosures. Help users understand and complete their BRSR reporting requirements.'
        },
        ...messages.filter(m => m.type === 'user' || m.type === 'assistant').map(m => ({
          role: m.type as 'user' | 'assistant',
          content: m.content
        })),
        { role: 'user', content: userMessage }
      ];

      const result = await sendChatMessageWithSearch(chatHistory, mode === 'ASK');
      
      // Remove the searching indicator
      if (mode === 'ASK') {
        setMessages(prev => prev.filter(msg => msg.content !== 'Analyzing your question and searching the web if needed...'));
        setIsSearching(false);
      }
      
      // Add search results if any
      if (result.searchResults && result.searchResults.length > 0) {
        addMessage({
          type: 'search',
          content: `Found ${result.searchResults.length} relevant web results`,
          icon: <Search className="text-blue-600" size={16} />,
          searchResults: result.searchResults
        });
      }
      
      // Add Google Drive files if any
      if (result.driveFiles && result.driveFiles.length > 0) {
        addMessage({
          type: 'drive',
          content: `Found ${result.driveFiles.length} relevant documents in Google Drive`,
          icon: <FolderOpen className="text-green-600" size={16} />,
          driveFiles: result.driveFiles
        });
      }
      
      addMessage({
        type: 'assistant',
        content: result.response,
        icon: <img src="/brsr-circle.svg" alt="BRSR Logo" className="h-4 w-4" />
      });
    } catch (error) {
      toast.error('Failed to get response. Please check your API key.');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  const clearMessages = () => {
    setMessages([{
      type: 'system',
      content: "Hello! I'm your Copilot assistant for BRSR disclosures. How can I help you today?",
    }]);
  };

  const runWorkflow = async (workflowName: string) => {
    let sequence: CopilotMessage[];
    switch (workflowName) {
      case 'Company Profile':
        sequence = companyProfileWorkflow;
        break;
      case 'Reporting Period':
        sequence = reportingPeriodWorkflow;
        break;
      case 'Geographic':
        sequence = geographicWorkflow;
        break;
      case 'Emissions':
        sequence = emissionsWorkflow;
        break;
      default:
        sequence = [];
    }

    setIsLoading(true);

    for (const step of sequence) {
      addMessage(step);
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
    }
    
    setIsLoading(false);
  };

  const renderTable = (data: { headers: string[], rows: string[][] }) => (
    <div className="mt-3 mb-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {data.headers.map((header, i) => (
              <th key={i} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    if (draftState?.isDrafting && questionId) {
      clearMessages();
      runWorkflow(questionId);
    }
  }, [draftState?.isDrafting, questionId]);
  
  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img 
              src="/brsr-circle.svg"
              alt="BRSR Logo"
              className="h-5 w-5"
            />
            <span className="font-medium">BRSR Analysis Copilot</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        
        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode('ASK')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              mode === 'ASK' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MessageCircleQuestion size={16} />
            ASK
          </button>
          <button
            onClick={() => setMode('WRITE')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              mode === 'WRITE' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <PenTool size={16} />
            WRITE
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-start gap-2">
              {msg.icon}
              <div className={`text-sm font-medium whitespace-pre-line ${
                msg.type === 'system' ? 'text-gray-700' :
                msg.type === 'user' ? 'text-gray-900' :
                msg.type === 'assistant' ? 'text-indigo-900' :
                msg.type === 'search' ? 'text-blue-600' :
                msg.type === 'drive' ? 'text-green-600' :
                msg.type === 'action' ? 'text-blue-600' :
                msg.type === 'table' ? 'text-gray-800' :
                msg.type === 'alert' ? 'text-green-600' :
                'text-purple-600'
              }`} style={{lineHeight: 1.7, padding: '2px 0'}}>
                {renderCopilotContent(msg.content)}
                {/* If this is an assistant message with searchResults, show links at the end */}
                {msg.type === 'assistant' && msg.searchResults && msg.searchResults.length > 0 && (
                  <span className="block mt-2">
                    {msg.searchResults.map((result: any, idx: number) => (
                      <span key={idx}>
                        {' '}[
                        <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{result.title || 'link'}</a>
                        ]
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
            {msg.type === 'table' && msg.data && renderTable(msg.data)}
            {msg.type === 'search' && msg.searchResults && (
              <div className="mt-2 ml-6 space-y-2">
                {msg.searchResults.slice(0, 3).map((result: any, idx: number) => (
                  <div key={idx} className="text-xs bg-gray-50 p-2 rounded border border-gray-200">
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {result.title}
                    </a>
                    <p className="text-gray-600 mt-1 line-clamp-2">{result.content}</p>
                  </div>
                ))}
              </div>
            )}
            {msg.type === 'drive' && msg.driveFiles && (
              <div className="mt-2 ml-6 space-y-2">
                {msg.driveFiles.map((file: any, idx: number) => (
                  <div key={idx} className="text-xs bg-green-50 p-2 rounded border border-green-200">
                    <div className="flex items-center gap-2">
                      <File className="text-green-600" size={14} />
                      <span className="font-medium text-green-800">{file.name}</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-xs">
                      Type: {file.mimeType?.split('.').pop() || 'unknown'} • 
                      Modified: {new Date(file.modifiedTime).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder={mode === 'ASK' ? "Ask about BRSR disclosures..." : "Describe what you want to write..."}
            className="flex-1 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm rounded-l"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel;