import React from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Generate report</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">Please choose the format for your report:</p>

          <div className="space-y-4">
            <div className="border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                    <FileText className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">Microsoft Word (standard report)</h3>
                    <p className="text-sm text-gray-500">Ideal for internal review and sharing purposes</p>
                  </div>
                </div>
                <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
                  Generate report
                </button>
              </div>
            </div>

            <div className="border border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <FileText className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Inline XBRL (audit-ready report)</h3>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        Compliant with CSRD audit requirements
                        <CheckCircle2 size={16} className="text-green-500" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Our team is incorporating the latest EFRAG requirement updates (introduced 30 August 2024).<br />
            We will notify you as the Inline XBRL format becomes available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;