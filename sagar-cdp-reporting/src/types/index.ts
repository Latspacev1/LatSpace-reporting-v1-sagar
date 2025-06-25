export interface Section {
  id: string;
  title: string;
  expanded?: boolean;
}

export interface Question {
  id: string;
  text: string;
  completed: boolean;
  sectionId: string;
  answer?: string;
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