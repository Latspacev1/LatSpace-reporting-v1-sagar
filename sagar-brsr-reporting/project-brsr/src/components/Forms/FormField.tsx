import React from 'react';
import { Question, ValidationRule } from '../../types';
import TableInput from './TableInput';

interface FormFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  onCellClick?: (rowId: string, columnId: string, value: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ question, value, onChange, disabled = false, onCellClick }) => {
  const validateField = (val: any): string | null => {
    if (!question.validation) return null;
    
    const validation = question.validation;
    
    if (validation.required && (!val || val.toString().trim() === '')) {
      return validation.message || 'This field is required';
    }
    
    if (validation.pattern && val) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(val.toString())) {
        return validation.message || 'Invalid format';
      }
    }
    
    if (validation.min && typeof val === 'number' && val < validation.min) {
      return validation.message || `Minimum value is ${validation.min}`;
    }
    
    if (validation.max && typeof val === 'number' && val > validation.max) {
      return validation.message || `Maximum value is ${validation.max}`;
    }
    
    return null;
  };

  const error = validateField(value);

  const renderField = () => {
    switch (question.type) {
      case 'table':
        if (!question.tableConfig) return null;
        return (
          <TableInput
            config={question.tableConfig}
            value={value || []}
            onChange={onChange}
            disabled={disabled}
            onCellClick={onCellClick}
          />
        );

      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            disabled={disabled}
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'numeric':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            disabled={disabled}
            step="any"
            min={question.validation?.min}
            max={question.validation?.max}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            disabled={disabled}
          />
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValue = value || [];
                    if (e.target.checked) {
                      onChange([...currentValue, option]);
                    } else {
                      onChange(currentValue.filter((v: string) => v !== option));
                    }
                  }}
                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                  disabled={disabled}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default: // text
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 min-h-[120px] resize-vertical"
            disabled={disabled}
            placeholder="Enter your response here..."
          />
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {question.text}
            {question.isEssential && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2">
                Essential
              </span>
            )}
            {question.validation?.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {renderField()}
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;