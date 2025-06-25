export interface AVHCategory {
  id: string;
  name: string;
  subcategories?: string[];
  expanded?: boolean;
}

export interface AVHIndicator {
  id: string;
  internalId: number;
  entityId: number;
  entity: string;
  categories: string[];
  hierarchicalNumber?: string;
  name: string;
  description: string;
  type: 'numeric' | 'text' | 'multiple-choice' | 'boolean';
  options?: string[];
  unit?: string;
  year: number;
  value?: string | number | boolean;
  notApplicable?: boolean;
  notAvailable?: boolean;
  explanation?: string;
  completed?: boolean;
}

export interface AVHData {
  year: number;
  indicators: AVHIndicator[];
  lastUpdated?: Date;
  completionPercentage?: number;
}

export interface SupportingDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  indicatorId?: string;
  year?: number;
}

export interface DraftState {
  isDrafting: boolean;
  progress: number;
}

export interface ValidationError {
  indicatorId: string;
  message: string;
  severity: 'error' | 'warning';
}