import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TableConfig, TableRow } from '../../types';

interface TableInputProps {
  config: TableConfig;
  value: TableRow[];
  onChange: (rows: TableRow[]) => void;
  disabled?: boolean;
  onCellClick?: (rowId: string, columnId: string, value: any) => void;
}

const TableInput: React.FC<TableInputProps> = ({ config, value, onChange, disabled = false, onCellClick }) => {
  const [rows, setRows] = useState<TableRow[]>(value.length > 0 ? value : config.rows);

  const handleCellChange = (rowIndex: number, columnId: string, newValue: any) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      data: {
        ...updatedRows[rowIndex].data,
        [columnId]: newValue
      }
    };
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const addRow = () => {
    if (!config.allowAddRows) return;
    
    const newRow: TableRow = {
      id: `row-${Date.now()}`,
      data: {}
    };
    
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const renderCellInput = (row: TableRow, column: any, rowIndex: number) => {
    const value = row.data[column.id] || '';
    const isDisabled = disabled || false;

    // If disabled, only show clickable values (no input boxes)
    if (isDisabled) {
      if (value && onCellClick) {
        return (
          <button
            onClick={() => onCellClick(row.id, column.id, value)}
            className="w-full p-2 text-left text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            {value}
          </button>
        );
      }
      // Return empty cell if no value and disabled
      return <div className="w-full p-2"></div>;
    }

    // If value exists and onCellClick is provided, render as clickable
    if (value && onCellClick) {
      return (
        <button
          onClick={() => onCellClick(row.id, column.id, value)}
          className="w-full p-2 text-left text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          disabled={isDisabled}
        >
          {value}
        </button>
      );
    }

    // Otherwise render as input
    switch (column.type) {
      case 'number':
      case 'percentage':
      case 'currency':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleCellChange(rowIndex, column.id, parseFloat(e.target.value) || 0)}
            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 ${value ? 'text-blue-600' : ''}`}
            disabled={isDisabled}
            step={column.type === 'percentage' ? '0.01' : 'any'}
            min="0"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleCellChange(rowIndex, column.id, e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 ${value ? 'text-blue-600' : ''}`}
            disabled={isDisabled}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCellChange(rowIndex, column.id, e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 ${value ? 'text-blue-600' : ''}`}
            disabled={isDisabled}
          />
        );
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {config.columns.map((column) => (
                <th
                  key={column.id}
                  className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-900"
                  style={{ width: column.width ? `${column.width}px` : 'auto' }}
                >
                  {column.label}
                  {column.required && <span className="text-red-500 ml-1">*</span>}
                </th>
              ))}
              {config.allowAddRows && (
                <th className="border border-gray-300 px-4 py-3 w-12"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {config.columns.map((column) => (
                  <td key={column.id} className="border border-gray-300 px-4 py-2">
                    {row.label && column.id === config.columns[0].id ? (
                      <span className="font-medium text-gray-700">{row.label}</span>
                    ) : (
                      renderCellInput(row, column, rowIndex)
                    )}
                  </td>
                ))}
                {config.allowAddRows && (
                  <td className="border border-gray-300 px-2 py-2">
                    <button
                      type="button"
                      onClick={() => removeRow(rowIndex)}
                      className="text-red-600 hover:text-red-800 p-1"
                      disabled={disabled}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {config.allowAddRows && !disabled && (
          <div className="mt-3">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-300 hover:border-indigo-400 rounded-md transition-colors"
            >
              <Plus size={16} />
              Add Row
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableInput;