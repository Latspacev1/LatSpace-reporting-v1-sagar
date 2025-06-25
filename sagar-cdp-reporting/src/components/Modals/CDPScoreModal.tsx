import React from 'react';
import { X, CheckCircle2, AlertTriangle, Download, ArrowUpRight } from 'lucide-react';

interface CDPScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CDPScoreModal: React.FC<CDPScoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">B</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">CDP Climate Change Score</h2>
                <p className="text-gray-600">Performance assessment for disclosure year 2023-2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 px-4 py-2">
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">B</span>
                  <p className="text-sm text-blue-600">Current Score</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Score Summary</h3>
            <div className="grid grid-cols-4 gap-4">
              <ScoreCard title="Governance" score="A-" change="+1 from 2022" type="positive" />
              <ScoreCard title="Targets" score="B" change="No change" type="neutral" />
              <ScoreCard title="Risk Management" score="B+" change="+2 from 2022" type="positive" />
              <ScoreCard title="Emissions" score="C" change="-1 from 2022" type="negative" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Highlights</h3>
              <div className="space-y-4">
                <HighlightItem
                  icon={<CheckCircle2 className="text-green-500" size={20} />}
                  title="Strong governance framework"
                  description="Board-level oversight of climate-related issues with clear responsibility allocation."
                />
                <HighlightItem
                  icon={<CheckCircle2 className="text-green-500" size={20} />}
                  title="Improved risk assessment"
                  description="Comprehensive climate risk assessment integrated into overall risk management process."
                />
                <HighlightItem
                  icon={<AlertTriangle className="text-amber-500" size={20} />}
                  title="Emission disclosure gaps"
                  description="Incomplete Scope 3 emissions data and limited verification of reported emissions."
                />
                <HighlightItem
                  icon={<AlertTriangle className="text-amber-500" size={20} />}
                  title="Target alignment"
                  description="Targets not yet fully aligned with 1.5°C pathway; need for more ambitious interim targets."
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Peer Comparison</h3>
              <div className="space-y-4">
                <ComparisonBar label="Your Score" score="B" color="teal" width="75%" />
                <ComparisonBar label="Industry Average" score="C" color="amber" width="50%" />
                <ComparisonBar label="Industry Leader" score="A" color="teal" width="90%" />
                <div className="mt-8">
                  <p className="text-gray-600 mb-2">Your position in sector:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-teal-500">Top 35%</span>
                    <span className="text-sm text-teal-500">+15% from 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Key Recommendations</h3>
            <div className="grid grid-cols-3 gap-6">
              <RecommendationSection
                title="Short-term Actions"
                items={[
                  "Complete Scope 3 emissions inventory",
                  "Implement third-party verification for all emissions data",
                  "Develop detailed climate transition plan"
                ]}
              />
              <RecommendationSection
                title="Medium-term Actions"
                items={[
                  "Align targets with 1.5°C pathway",
                  "Develop supplier engagement strategy for emissions reduction",
                  "Implement internal carbon pricing mechanism"
                ]}
              />
              <RecommendationSection
                title="Long-term Strategy"
                items={[
                  "Develop science-based net-zero strategy",
                  "Integrate climate metrics into executive compensation",
                  "Expand climate scenario analysis to all business units"
                ]}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              <Download size={20} />
              <span>Download Detailed Report</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white hover:bg-teal-600">
              <ArrowUpRight size={20} />
              <span>Improve Your Score</span>
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
  change: string;
  type: 'positive' | 'negative' | 'neutral';
}> = ({ title, score, change, type }) => {
  const changeColor = 
    type === 'positive' ? 'text-green-500 bg-green-50' :
    type === 'negative' ? 'text-red-500 bg-red-50' :
    'text-gray-500 bg-gray-50';

  return (
    <div className="bg-white p-4 border border-gray-200">
      <h4 className="text-gray-600 mb-2">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{score}</span>
        <span className={`text-sm px-2 py-1 ${changeColor}`}>{change}</span>
      </div>
    </div>
  );
};

const HighlightItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ComparisonBar: React.FC<{
  label: string;
  score: string;
  color: string;
  width: string;
}> = ({ label, score, color, width }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium">{score}</span>
    </div>
    <div className="h-2 bg-gray-200">
      <div 
        className={`h-full bg-${color}-500`}
        style={{ width }}
      ></div>
    </div>
  </div>
);

const RecommendationSection: React.FC<{
  title: string;
  items: string[];
}> = ({ title, items }) => (
  <div>
    <h4 className="font-medium mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
          <span className="text-teal-500">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CDPScoreModal;