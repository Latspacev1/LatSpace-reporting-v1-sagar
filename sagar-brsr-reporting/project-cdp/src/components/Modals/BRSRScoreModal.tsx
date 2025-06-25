import React from 'react';
import { X, CheckCircle2, AlertTriangle, Download, ArrowUpRight, Target, TrendingUp } from 'lucide-react';

interface BRSRScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRSRScoreModal: React.FC<BRSRScoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 flex items-center justify-center rounded-lg">
                <span className="text-2xl font-bold text-white">85</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">BRSR Compliance Score</h2>
                <p className="text-gray-600">Performance assessment for FY 2024-25</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-50 px-6 py-3 rounded-lg">
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-600">85%</span>
                  <p className="text-sm text-green-600">Overall Compliance</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 mb-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section-wise Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <ScoreCard title="Section A: General Disclosures" score="92%" indicators="10/11" type="excellent" />
              <ScoreCard title="Section B: Management Disclosures" score="88%" indicators="15/17" type="good" />
              <ScoreCard title="Section C: Performance Disclosures" score="82%" indicators="73/89" type="good" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Principle-wise Assessment</h3>
              <div className="space-y-3">
                <PrincipleScore principle="P1: Ethics & Transparency" essential="5/5" leadership="2/2" score={100} />
                <PrincipleScore principle="P2: Sustainable Products" essential="10/12" leadership="3/4" score={87} />
                <PrincipleScore principle="P3: Employee Welfare" essential="13/15" leadership="6/8" score={83} />
                <PrincipleScore principle="P4: Stakeholder Response" essential="4/4" leadership="2/2" score={100} />
                <PrincipleScore principle="P5: Human Rights" essential="7/8" leadership="2/3" score={82} />
                <PrincipleScore principle="P6: Environment" essential="22/25" leadership="10/12" score={86} />
                <PrincipleScore principle="P7: Consumer Responsibility" essential="5/6" leadership="2/3" score={78} />
                <PrincipleScore principle="P8: Inclusive Growth" essential="8/9" leadership="3/4" score={85} />
                <PrincipleScore principle="P9: Public Policy" essential="2/2" leadership="1/1" score={100} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compliance Insights</h3>
              <div className="space-y-4">
                <InsightItem
                  icon={<CheckCircle2 className="text-green-500" size={20} />}
                  title="Strong ESG Governance"
                  description="Comprehensive board oversight and policy framework across all 9 NGRBC principles."
                />
                <InsightItem
                  icon={<CheckCircle2 className="text-green-500" size={20} />}
                  title="Quantitative Data Excellence"
                  description="98% completion rate for essential quantitative indicators with third-party assurance."
                />
                <InsightItem
                  icon={<Target className="text-blue-500" size={20} />}
                  title="Leadership Opportunities"
                  description="12 additional leadership indicators identified for enhanced disclosure."
                />
                <InsightItem
                  icon={<AlertTriangle className="text-amber-500" size={20} />}
                  title="Stakeholder Engagement"
                  description="Opportunities to strengthen consumer grievance mechanisms and supplier assessments."
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Sector Benchmarking</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Your Score</span>
                  <span className="font-medium text-blue-800">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Real Estate Sector Average</span>
                  <span className="font-medium text-blue-800">72%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Top Quartile Threshold</span>
                  <span className="font-medium text-blue-800">88%</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-sm font-medium text-green-600">Top 25% in sector</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Compliance Status</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={16} />
                  <span className="text-sm text-green-700">SEBI Regulatory Requirements: Met</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={16} />
                  <span className="text-sm text-green-700">Essential Indicators: 98% Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="text-blue-500" size={16} />
                  <span className="text-sm text-blue-700">Leadership Indicators: 72% Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={16} />
                  <span className="text-sm text-green-700">Third-party Assurance: Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Action Plan</h3>
            <div className="grid grid-cols-3 gap-6">
              <ActionSection
                title="Immediate (Q1 FY25)"
                priority="high"
                items={[
                  "Complete 3 pending essential indicators",
                  "Enhance consumer grievance data",
                  "Finalize third-party assurance"
                ]}
              />
              <ActionSection
                title="Short-term (Q2-Q3 FY25)"
                priority="medium"
                items={[
                  "Implement 8 additional leadership indicators",
                  "Strengthen supplier ESG assessments",
                  "Develop water positivity roadmap"
                ]}
              />
              <ActionSection
                title="Strategic (FY26 onwards)"
                priority="low"
                items={[
                  "Achieve top quartile performance (>88%)",
                  "Integrate ESG metrics into executive KPIs",
                  "Lead industry best practices adoption"
                ]}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md">
              <Download size={20} />
              <span>Download BRSR Report</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md">
              <ArrowUpRight size={20} />
              <span>Improve Compliance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoreCard: React.FC<{
  title: string;
  score: string;
  indicators: string;
  type: 'excellent' | 'good' | 'fair';
}> = ({ title, score, indicators, type }) => {
  const colors = {
    excellent: 'text-green-600 bg-green-50 border-green-200',
    good: 'text-blue-600 bg-blue-50 border-blue-200',
    fair: 'text-amber-600 bg-amber-50 border-amber-200'
  };

  return (
    <div className={`bg-white p-4 border rounded-lg ${colors[type]}`}>
      <h4 className="text-gray-700 font-medium mb-2">{title}</h4>
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xl font-bold">{score}</span>
        <span className="text-sm">{indicators}</span>
      </div>
    </div>
  );
};

const PrincipleScore: React.FC<{
  principle: string;
  essential: string;
  leadership: string;
  score: number;
}> = ({ principle, essential, leadership, score }) => {
  const getColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div>
        <span className="text-sm font-medium text-gray-700">{principle}</span>
        <div className="text-xs text-gray-500">
          Essential: {essential} | Leadership: {leadership}
        </div>
      </div>
      <span className={`font-bold ${getColor(score)}`}>{score}%</span>
    </div>
  );
};

const InsightItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ActionSection: React.FC<{
  title: string;
  priority: 'high' | 'medium' | 'low';
  items: string[];
}> = ({ title, priority, items }) => {
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-amber-200 bg-amber-50',
    low: 'border-green-200 bg-green-50'
  };

  return (
    <div className={`border rounded-lg p-4 ${priorityColors[priority]}`}>
      <h4 className="font-medium mb-3 text-gray-800">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-indigo-500 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BRSRScoreModal;