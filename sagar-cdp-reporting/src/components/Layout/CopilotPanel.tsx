import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Search, FileText, Globe, CheckCircle2, Building2, Calculator, LineChart, DollarSign, Factory, Workflow, BarChart, PieChart, ArrowRight, AlertTriangle, Users, Calendar, MapPin, MessageCircleQuestion, PenTool, Key, Loader2, FolderOpen, File, Database, Brain, FileSearch } from 'lucide-react';
import cdpLogo from '../../assets/cdp-logo.png';
import { DraftState } from '../../types';
import { sendChatMessageWithSearch, ChatMessage } from '../../services/openai';
import toast from 'react-hot-toast';

interface CopilotPanelProps {
  onClose: () => void;
  draftState?: DraftState;
  questionId?: string;
  initialMode?: 'ASK' | 'WRITE';
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
    icon: <img src={cdpLogo} alt="CDP Logo" style={{height: 20, width: 'auto'}} />
  },
  {
    type: 'table',
    content: 'Company Overview',
    icon: <Users className="text-indigo-500" size={16} />,
    data: {
      headers: ['Metric', 'Value'],
      rows: [
        ['Founded', '1985'],
        ['Listed Exchange', 'NSE (SAGCEM)'],
        ['Employees', '~1,800'],
        ['Industry', 'Cement Manufacturing']
      ]
    }
  },
  {
    type: 'table',
    content: 'Production Capacity',
    icon: <Factory className="text-green-500" size={16} />,
    data: {
      headers: ['Product', 'Annual Capacity'],
      rows: [
        ['Total Cement', '10 Million tonnes'],
        ['Clinker', '7.5 Million tonnes'],
        ['Grinding', '2.5 Million tonnes']
      ]
    }
  },
  {
    type: 'alert',
    content: '✓ Company profile verified against NSE listings',
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
        ['Scope 1', '100%', 'ISO 14064-3'],
        ['Scope 2', '100%', 'ISO 14064-3'],
        ['Scope 3', '85%', 'Limited']
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
    content: 'Manufacturing Facilities',
    icon: <MapPin className="text-red-500" size={16} />,
    data: {
      headers: ['Location', 'Type', 'Capacity'],
      rows: [
        ['Telangana', 'Integrated Plant', '4.0 MT/yr'],
        ['Andhra Pradesh', 'Integrated Plant', '3.5 MT/yr'],
        ['Odisha', 'Grinding Unit', '1.5 MT/yr'],
        ['Maharashtra', 'Grinding Unit', '1.0 MT/yr']
      ]
    }
  },
  {
    type: 'table',
    content: 'Market Presence',
    icon: <BarChart className="text-indigo-500" size={16} />,
    data: {
      headers: ['Region', 'Revenue Share', 'Growth'],
      rows: [
        ['South India', '65%', '+8%'],
        ['West India', '20%', '+12%'],
        ['East India', '15%', '+15%']
      ]
    }
  }
];

const emissionsWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Initiating comprehensive emissions analysis...',
    icon: <img src={cdpLogo} alt="CDP Logo" style={{height: 20, width: 'auto'}} />
  },
  {
    type: 'table',
    content: 'Production Metrics',
    icon: <Factory className="text-blue-500" size={16} />,
    data: {
      headers: ['Metric', 'Value', 'Unit'],
      rows: [
        ['Clinker Production', '2.5', 'Million tonnes'],
        ['Clinker Factor', '0.95', 'Ratio'],
        ['Thermal Efficiency', '3.2', 'GJ/tonne']
      ]
    }
  },
  {
    type: 'table',
    content: 'Energy Mix Analysis',
    icon: <PieChart className="text-green-500" size={16} />,
    data: {
      headers: ['Fuel Type', 'Consumption', 'Share'],
      rows: [
        ['Coal', '1.8M GJ', '45%'],
        ['Natural Gas', '1.2M GJ', '30%'],
        ['Alternative Fuels', '1.0M GJ', '25%']
      ]
    }
  },
  {
    type: 'table',
    content: 'Scope 1 Emissions Breakdown',
    icon: <Calculator className="text-orange-500" size={16} />,
    data: {
      headers: ['Source', 'Emissions', 'Share'],
      rows: [
        ['Process Emissions', '1.3M tCO2e', '62%'],
        ['Fuel Combustion', '0.8M tCO2e', '38%'],
        ['Total Scope 1', '2.1M tCO2e', '100%']
      ]
    }
  },
  {
    type: 'table',
    content: 'Emissions Intensity Analysis',
    icon: <LineChart className="text-blue-500" size={16} />,
    data: {
      headers: ['Period', 'Intensity', 'Change'],
      rows: [
        ['Current Year', '0.84 tCO2e/t', '-'],
        ['Previous Year', '0.87 tCO2e/t', '-3.4%'],
        ['2025 Target', '0.80 tCO2e/t', '-4.8%']
      ]
    }
  },
  {
    type: 'alert',
    content: '✓ All emissions data verified by third-party auditor (ISO 14064-3)',
    icon: <CheckCircle2 className="text-green-500" size={16} />
  }
];

const agenticWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Initiating AI agent workflow for CDP response generation...',
    icon: <Brain className="text-purple-500" size={16} />
  },
  {
    type: 'action',
    content: 'Step 1: Searching LatSpace ESG database for relevant industry benchmarks...',
    icon: <Database className="text-blue-500" size={16} />
  },
  {
    type: 'table',
    content: 'ESG Database Results',
    icon: <Search className="text-blue-500" size={16} />,
    data: {
      headers: ['Data Source', 'Relevance', 'Last Updated'],
      rows: [
        ['Cement Industry Emissions Benchmarks', 'High', '2024-03-15'],
        ['Indian Manufacturing Standards', 'High', '2024-02-28'],
        ['CDP Climate Response Templates', 'Medium', '2024-01-10']
      ]
    }
  },
  {
    type: 'action',
    content: 'Step 2: Analyzing Sagar Cement internal company documents...',
    icon: <FileSearch className="text-green-500" size={16} />
  },
  {
    type: 'table',
    content: 'Internal Documents Analysis',
    icon: <FileText className="text-green-500" size={16} />,
    data: {
      headers: ['Document', 'Key Insights', 'Confidence'],
      rows: [
        ['Annual Report 2024', 'Financial performance & capacity', '95%'],
        ['Sustainability Report 2024', 'Environmental metrics', '92%'],
        ['Operations Manual', 'Technical specifications', '88%']
      ]
    }
  },
  {
    type: 'action',
    content: 'Step 3: Reading previous year Sagar Cement CDP disclosure...',
    icon: <Calendar className="text-orange-500" size={16} />
  },
  {
    type: 'table',
    content: 'Previous CDP Response Analysis',
    icon: <img src={cdpLogo} alt="CDP Logo" style={{height: 16, width: 'auto'}} />,
    data: {
      headers: ['Section', 'Previous Response', 'Changes Needed'],
      rows: [
        ['Company Profile', 'Complete', 'Update capacity figures'],
        ['Emissions Data', 'Complete', 'Update FY24 figures'],
        ['Targets & Performance', 'Partial', 'Add new commitments']
      ]
    }
  },
  {
    type: 'thinking',
    content: 'Synthesizing data from multiple sources to create comprehensive response...',
    icon: <Workflow className="text-indigo-500" size={16} />
  },
  {
    type: 'alert',
    content: '✓ Draft answer ready! Generated response based on company data, industry benchmarks, and CDP requirements.',
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

const CopilotPanel: React.FC<CopilotPanelProps> = ({ onClose, draftState, questionId, initialMode }) => {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'ASK' | 'WRITE'>(initialMode || 'ASK');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      type: 'system',
      content: "Hello! I'm your Copilot assistant for CDP Climate disclosures. How can I help you today?",
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
          content: 'You are a helpful assistant specializing in CDP (Carbon Disclosure Project) climate change disclosures. Help users understand and complete their CDP reporting requirements.'
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
        icon: <img src={cdpLogo} alt="CDP Logo" style={{height: 20, width: 'auto'}} />
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
      content: "Hello! I'm your Copilot assistant for CDP Climate disclosures. How can I help you today?",
    }]);
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
      case 'agentic':
        sequence = agenticWorkflow;
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

  useEffect(() => {
    if (draftState?.isDrafting && mode === 'WRITE') {
      clearMessages();
      runWorkflow('agentic');
    }
  }, [draftState?.isDrafting, mode]);

  // Update mode when initialMode changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);
  
  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={cdpLogo} alt="CDP Logo" style={{height: 20, width: 'auto'}} />
            <span className="font-medium">CDP Analysis Copilot</span>
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
            placeholder={mode === 'ASK' ? "Ask about CDP disclosures..." : "Describe what you want to write..."}
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