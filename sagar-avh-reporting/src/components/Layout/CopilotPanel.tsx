import React, { useState, useEffect } from 'react';
import { X, Send, FileText, CheckCircle2, Building2, Calculator, LineChart, Factory, PieChart, Users, Calendar } from 'lucide-react';
import { DraftState } from '../../types';

interface CopilotPanelProps {
  onClose: () => void;
  draftState?: DraftState;
  indicatorId?: string;
  selectedYear?: number;
}

interface CopilotMessage {
  type: 'system' | 'action' | 'source' | 'thinking' | 'calculation' | 'chart' | 'alert' | 'table';
  content: string;
  icon?: React.ReactNode;
  data?: { headers: string[], rows: string[][] };
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


const emissionsWorkflow: CopilotMessage[] = [
  {
    type: 'system',
    content: 'Initiating comprehensive emissions analysis...',
    icon: <FileText className="text-purple-500" size={16} />
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

const CopilotPanel: React.FC<CopilotPanelProps> = ({ onClose, draftState, indicatorId, selectedYear }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      type: 'system',
      content: "Hello! I'm your Copilot assistant for AVH ESG reporting. How can I help you today?",
    }
  ]);

  const addMessage = (message: CopilotMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([{
      type: 'system',
      content: "Hello! I'm your Copilot assistant for AVH ESG reporting. How can I help you today?",
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
    if (draftState?.isDrafting && indicatorId) {
      clearMessages();
      let sequence;
      switch (indicatorId) {
        case '2024-211':
        case '2023-211':
          sequence = companyProfileWorkflow;
          break;
        case '2024-290':
        case '2023-290':
          sequence = emissionsWorkflow;
          break;
        case '2024-446':
        case '2023-446':
          sequence = reportingPeriodWorkflow;
          break;
        default:
          sequence = [
            {
              type: 'system' as const,
              content: `Analyzing ${selectedYear} AVH indicator data...`,
              icon: <FileText className="text-purple-500" size={16} />
            }
          ];
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
  }, [draftState?.isDrafting, indicatorId, selectedYear]);
  
  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <img src="/avh-logo.png" alt="AVH Logo" className="h-5" />
          <span className="font-medium">AVH ESG Copilot</span>
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
            placeholder="Ask about AVH ESG indicators..."
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