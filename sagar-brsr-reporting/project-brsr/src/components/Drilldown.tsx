import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { rawFiles, importedEnergyData } from '../data/mockData';

interface DrilldownProps {
  data: {
    questionId: string;
    rowId: string;
    columnId: string;
    value: any;
  };
  onClose: () => void;
}

const Drilldown: React.FC<DrilldownProps> = ({ data, onClose }) => {
  const [selectedStep, setSelectedStep] = useState<'raw' | 'imported' | 'standardized'>('raw');

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'csv':
        return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'zip':
        return <File className="w-4 h-4 text-yellow-600" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleFileClick = (filename: string) => {
    // Placeholder for file download/preview functionality
    console.log('File clicked:', filename);
    // In a real implementation, this would trigger a download or open a preview
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Drilldown</span>
            </button>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-semibold text-gray-900">Data lineage</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span>Jan - Dec 2023</span>
              <span>Total Electricity Consumption</span>
              <span>Electricity Consumption data happens at Facility level</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="flex gap-8">
            {/* Left Side - Data Lineage Flow */}
            <div className="w-80">
              <div className="space-y-6">
                {/* Raw files */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStep === 'raw' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStep('raw')}
                >
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Raw files</h3>
                  </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center">
                  <div className="w-px h-6 bg-gray-300"></div>
                </div>

                {/* Imported data */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStep === 'imported' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStep('imported')}
                >
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Imported data</h3>
                  </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center">
                  <div className="w-px h-6 bg-gray-300"></div>
                </div>

                {/* Standardized data */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStep === 'standardized' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStep('standardized')}
                >
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Standardized data</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Files Section */}
            <div className="flex-1">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedStep === 'imported' ? 'Imported data' : 'Files'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedStep === 'imported' 
                        ? 'Your data after it is ingested into LatSpace. This view is filtered to rows used in this calculation.'
                        : 'Your data that was uploaded to LatSpace. This view is filtered to the files used in this calculation.'}
                    </p>
                  </div>
                  {selectedStep === 'imported' && (
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Download size={16} />
                      Download
                    </button>
                  )}
                </div>

                {/* Raw Files Table */}
                {selectedStep === 'raw' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type of Upload
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Filename
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rawFiles.map((file) => (
                          <tr key={file.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {file.uploadType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleFileClick(file.filename)}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {getFileIcon(file.filename)}
                                {file.filename}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {file.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {file.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Imported Data Excel-like Spreadsheet */}
                {selectedStep === 'imported' && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 text-sm">
                        Click again to review the raw file
                      </p>
                    </div>
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Fiscal_Year</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Month</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Plant</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Source_Type</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Energy_Source</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Renewable</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Quantity</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Quantity_Unit</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">NCV_GJ_per_unit</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Energy_GJ</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">Energy_TJ</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-r border-gray-200">SR_Category</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Reference_Doc</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {importedEnergyData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.fiscal_year}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.month}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.plant}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.source_type}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.energy_source}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.renewable}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.quantity}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.quantity_unit}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.ncv_gj_per_unit}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.energy_gj}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.energy_tj}</td>
                            <td className="px-3 py-2 text-xs text-gray-900 border-r border-gray-200">{row.sr_category}</td>
                            <td className="px-3 py-2 text-xs text-gray-900">{row.reference_doc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </>
                )}

                {/* Standardized Data Display */}
                {selectedStep === 'standardized' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <BookOpen size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                              Standardized energy consumption data
                            </span>
                            <span className="text-gray-500">- standardized_energy_data.csv</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Processed November 21, 2024 by Sagar Team (2023 measurement)
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                )}

                {/* Info Section */}
                {selectedStep === 'raw' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                      Reviewing raw file metadata
                    </h3>
                    <p className="text-blue-800 mb-4">
                      Here we can see when it was uploaded and by whom
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Back
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {selectedStep === 'imported' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-medium text-green-900 mb-2">
                      Reviewing imported data
                    </h3>
                    <p className="text-green-800 mb-4">
                      Data has been processed and imported into the system
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Back
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {selectedStep === 'standardized' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-medium text-purple-900 mb-2">
                      Reviewing standardized data
                    </h3>
                    <p className="text-purple-800 mb-4">
                      Data has been standardized according to reporting requirements
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Back
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                        Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drilldown;