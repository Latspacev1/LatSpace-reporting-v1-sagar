import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Search, FileText, Brain, Globe, CheckCircle2, Building2, Calculator, LineChart, DollarSign, Factory, Workflow, BarChart, PieChart, ArrowRight, AlertTriangle, Users, Calendar, MapPin } from 'lucide-react';
import { DraftState } from '../../types';

interface CopilotPanelProps {
  onClose: () => void;
  draftState?: DraftState;
  questionId?: string;
}

interface CopilotMessage {
  type: 'system' | 'action' | 'source' | 'thinking' | 'calculation' | 'chart' | 'alert' | 'table';
  content: string;
  icon?: React.ReactNode;
  data?: any;
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
    icon: <Brain className="text-purple-500" size={16} />
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

const CopilotPanel: React.FC<CopilotPanelProps> = ({ onClose, draftState, questionId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      type: 'system',
      content: "Hello! I'm your Copilot assistant for BRSR disclosures. How can I help you today?",
    }
  ]);

  const addMessage = (message: CopilotMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([{
      type: 'system',
      content: "Hello! I'm your Copilot assistant for BRSR disclosures. How can I help you today?",
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

  useEffect(() => {
    if (draftState?.isDrafting && questionId) {
      clearMessages();
      let sequence: CopilotMessage[] = [];
      switch (questionId) {
        case 'c0.1':
          sequence = companyProfileWorkflow;
          break;
        case 'c0.2':
          sequence = reportingPeriodWorkflow;
          break;
        case 'c0.3':
          sequence = geographicWorkflow;
          break;
        case 'c-re0.7':
          sequence = companyProfileWorkflow;
          break;
        case 'c-re0.8':
          sequence = geographicWorkflow;
          break;
        case 'c6.1':
          sequence = emissionsWorkflow;
          break;
        default:
          sequence = [];
      }

      let delay = 0;
      sequence.forEach((msg, index) => {
        setTimeout(() => {
          addMessage(msg);
          if (index === sequence.length - 1) {
            setTimeout(clearMessages, 3000);
          }
        }, delay);
        delay += 2000;
      });
    }
  }, [draftState?.isDrafting, questionId]);
  
  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Brain className="text-indigo-600" size={20} />
          <span className="font-medium">BRSR Copilot</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-start gap-2">
              {msg.icon}
              <p className={`text-sm font-medium ${
                msg.type === 'system' ? 'text-gray-700' :
                msg.type === 'action' ? 'text-blue-600' :
                msg.type === 'table' ? 'text-gray-800' :
                msg.type === 'alert' ? 'text-green-600' :
                'text-purple-600'
              }`}>
                {msg.content}
              </p>
            </div>
            {msg.type === 'table' && msg.data && renderTable(msg.data)}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Ask about BRSR disclosures..."
            className="flex-1 border border-gray-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm rounded-l"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 rounded-r">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel;