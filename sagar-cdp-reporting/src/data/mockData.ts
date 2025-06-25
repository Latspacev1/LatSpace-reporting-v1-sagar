import { Section, Question } from '../types';

export const sections: Section[] = [
  { 
    id: 'c0', 
    title: 'C0. Introduction', 
    expanded: true 
  },
  { id: 'c1', title: 'C1. Governance', expanded: false },
  { id: 'c2', title: 'C2. Risks and Opportunities', expanded: false },
  { id: 'c3', title: 'C3. Business Strategy', expanded: false },
  { id: 'c4', title: 'C4. Targets and Performance', expanded: false },
  { id: 'c5', title: 'C5. Emissions Methodology', expanded: false },
  { id: 'c6', title: 'C6. Emissions Data', expanded: true },
  { id: 'c7', title: 'C7. Emissions Breakdowns', expanded: false },
  { id: 'c8', title: 'C8. Energy', expanded: false },
  { id: 'c9', title: 'C9. Additional Metrics', expanded: false },
  { id: 'c10', title: 'C10. Verification', expanded: false },
  { id: 'c11', title: 'C11. Carbon Pricing', expanded: false },
];

export const questions: Question[] = [
  {
    id: 'c0.1',
    text: 'Give a general description and introduction to your organisation',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c0.2',
    text: 'State the start and end date of the year for which you are reporting data and indicate whether you will be providing emissions data for past reporting years.',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c0.3',
    text: 'Select the countries/areas in which you operate',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c0.4',
    text: 'Select the currency used for all financial information disclosed throughout your response.',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c0.5',
    text: 'Select the option that describes the reporting boundary for which climate related impacts on your business are being reported. Note that this option should align with your chosen approach for consolidating your GHG inventory.',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c-ce0.7',
    text: 'Which part of the concrete value chain does your organization operate in?',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c-mm0.7',
    text: 'Which part of the metals and mining value chain does your organization operate in?',
    completed: false,
    sectionId: 'c0',
  },
  {
    id: 'c6.1',
    text: 'What were your organization\'s Scope 1 and Scope 2 emissions for the reporting year?',
    completed: false,
    sectionId: 'c6',
  },
  {
    id: 'c6.2',
    text: 'Describe your organization\'s approach to reporting Scope 2 emissions.',
    completed: false,
    sectionId: 'c6',
  },
  {
    id: 'c6.3',
    text: 'What were your organization\'s gross global Scope 2 emissions in metric tons CO2e?',
    completed: false,
    sectionId: 'c6',
  },
  {
    id: 'c6.4',
    text: 'Are there any sources (e.g. facilities, specific GHGs, activities, geographies, etc.) of Scope 1 and Scope 2 emissions that are within your selected reporting boundary which are not included in your disclosure?',
    completed: false,
    sectionId: 'c6',
  },
  {
    id: 'c6.5',
    text: 'Account for your organization\'s gross global Scope 3 emissions, disclosing and explaining any exclusions.',
    completed: false,
    sectionId: 'c6',
  }
];