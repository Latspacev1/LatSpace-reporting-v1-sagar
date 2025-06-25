export interface Section {
  id: string;
  title: string;
  expanded?: boolean;
  type?: 'section' | 'principle';
}

export interface Question {
  id: string;
  text: string;
  completed: boolean;
  sectionId: string;
  answer?: string;
  type?: 'text' | 'table' | 'numeric' | 'dropdown' | 'checkbox' | 'date';
  isEssential?: boolean;
  tableConfig?: TableConfig;
  options?: string[];
  validation?: ValidationRule;
}

export interface TableConfig {
  columns: TableColumn[];
  rows: TableRow[];
  allowAddRows?: boolean;
  allowAddColumns?: boolean;
}

export interface TableColumn {
  id: string;
  label: string;
  type: 'text' | 'number' | 'percentage' | 'currency' | 'date';
  width?: number;
  required?: boolean;
}

export interface TableRow {
  id: string;
  label?: string;
  data: Record<string, any>;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface BRSRPrinciple {
  id: string;
  title: string;
  description: string;
  essentialIndicators: number;
  leadershipIndicators: number;
}

export interface SupportingDocument {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface FormattingOption {
  id: string;
  label: string;
  icon: string;
}

export interface DraftState {
  isDrafting: boolean;
  progress: number;
}