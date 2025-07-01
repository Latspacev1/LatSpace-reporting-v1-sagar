import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { AVHIndicator, DraftState } from '../../types';

interface IndicatorEditorProps {
  indicator?: AVHIndicator;
  onValueChange: (indicatorId: string, value: string | number | boolean | null, notApplicable?: boolean, notAvailable?: boolean, explanation?: string) => void;
  onComplete?: (indicatorId: string, completed: boolean) => void;
  onDraftStateChange?: (state: DraftState) => void;
}

const IndicatorEditor: React.FC<IndicatorEditorProps> = ({ 
  indicator,
  onValueChange,
  onComplete,
  onDraftStateChange
}) => {
  const [notApplicable, setNotApplicable] = useState(indicator?.notApplicable || false);
  const [notAvailable, setNotAvailable] = useState(indicator?.notAvailable || false);
  const [explanation, setExplanation] = useState(indicator?.explanation || '');
  const [value, setValue] = useState(indicator?.value || '');

  useEffect(() => {
    if (indicator) {
      setValue(indicator.value || '');
      setNotApplicable(indicator.notApplicable || false);
      setNotAvailable(indicator.notAvailable || false);
      setExplanation(indicator.explanation || '');
    }
  }, [indicator]);

  const handleValueChange = (newValue: string | number | boolean | null) => {
    setValue(newValue);
    if (indicator) {
      onValueChange(indicator.id, newValue, notApplicable, notAvailable, explanation);
    }
  };

  const handleNotApplicableChange = (checked: boolean) => {
    setNotApplicable(checked);
    if (checked) {
      setNotAvailable(false);
      setValue('');
    }
    if (indicator) {
      onValueChange(indicator.id, checked ? null : value, checked, false, explanation);
    }
  };

  const handleNotAvailableChange = (checked: boolean) => {
    setNotAvailable(checked);
    if (checked) {
      setNotApplicable(false);
      setValue('');
    }
    if (indicator) {
      onValueChange(indicator.id, checked ? null : value, false, checked, explanation);
    }
  };

  const handleExplanationChange = (newExplanation: string) => {
    setExplanation(newExplanation);
    if (indicator) {
      onValueChange(indicator.id, value, notApplicable, notAvailable, newExplanation);
    }
  };

  const handleComplete = () => {
    if (indicator) {
      const newCompleted = !indicator.completed;
      onComplete?.(indicator.id, newCompleted);
    }
  };

  const renderValueInput = () => {
    if (!indicator) return null;
    
    if (notApplicable || notAvailable) {
      return (
        <div className="p-4 bg-gray-50 border border-gray-200 text-gray-500 text-center">
          {notApplicable ? 'Not Applicable' : 'Not Available'}
        </div>
      );
    }

    switch (indicator.type) {
      case 'boolean':
        return (
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`${indicator.id}-boolean`}
                checked={value === true}
                onChange={() => handleValueChange(true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`${indicator.id}-boolean`}
                checked={value === false}
                onChange={() => handleValueChange(false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        );

      case 'numeric':
        return (
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="flex-1 border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter numeric value"
              value={value}
              onChange={(e) => handleValueChange(parseFloat(e.target.value) || '')}
            />
            {indicator.unit && (
              <span className="text-gray-500 text-sm">{indicator.unit}</span>
            )}
          </div>
        );

      case 'multiple-choice':
        return (
          <select
            className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
          >
            <option value="">Select an option</option>
            {indicator.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'text':
      default:
        return (
          <textarea
            className="w-full min-h-[120px] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            placeholder="Enter your response..."
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );
    }
  };

  const requiresExplanation = notApplicable || notAvailable;

  if (!indicator) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Info size={48} className="mx-auto mb-4 text-gray-300" />
        <p>Select an indicator to start editing</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{indicator.hierarchicalNumber || indicator.internalId}</span>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">{indicator.type}</span>
          {indicator.unit && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{indicator.unit}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`flex items-center gap-1 px-3 py-1.5 text-sm transition-colors ${
              indicator.completed 
                ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={handleComplete}
          >
            {indicator.completed && <Check size={16} />}
            <span>Mark Complete</span>
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{indicator.name}</h3>
        {indicator.description && (
          <div className="text-sm text-gray-600 whitespace-pre-line mb-4">
            {indicator.description}
          </div>
        )}
      </div>

      {/* Status Toggles */}
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notApplicable}
            onChange={(e) => handleNotApplicableChange(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Not Applicable</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notAvailable}
            onChange={(e) => handleNotAvailableChange(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Not Available</span>
        </label>
      </div>

      {/* Value Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Response
        </label>
        {renderValueInput()}
      </div>

      {/* Explanation (mandatory for N/A cases) */}
      {requiresExplanation && (
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <AlertTriangle size={16} className="text-amber-500" />
            Explanation Required
          </label>
          <textarea
            className="w-full min-h-[80px] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            placeholder="Please explain why this indicator is not applicable or not available..."
            value={explanation}
            onChange={(e) => handleExplanationChange(e.target.value)}
          />
          {!explanation && (
            <p className="text-xs text-amber-600 mt-1">
              An explanation is required when marking an indicator as not applicable or not available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default IndicatorEditor;