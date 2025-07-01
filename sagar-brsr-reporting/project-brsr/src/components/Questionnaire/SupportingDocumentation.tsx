import React from 'react';
import { FileText } from 'lucide-react';

const SupportingDocumentation: React.FC = () => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-600 mb-4">
        Attach any supporting documentation that is relevant for this question. This includes files like policies,
        certifications, data reports, and more. Attached files are available for review on the <strong>Files</strong> tab.
      </p>
      
      <div className="bg-gray-50 border border-gray-200 p-8 flex flex-col items-center justify-center">
        <FileText size={48} className="text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">Attach any files relevant to this question</p>
        
        <button className="mt-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
          Select file
        </button>
        
        <p className="text-xs text-gray-500 mt-4">Max size 10MB</p>
        <p className="text-xs text-gray-500 mt-1">
          Accepted file formats: pdf, doc, docx, xlsx, csv, png, jpg/jpeg, gif
        </p>
      </div>
    </div>
  );
};

export default SupportingDocumentation;