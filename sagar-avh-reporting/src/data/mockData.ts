import { AVHCategory, AVHIndicator, AVHData } from '../types';

export const categories: AVHCategory[] = [
  { 
    id: 'esg-overview', 
    name: 'ESG Overview', 
    expanded: true 
  },
  { 
    id: 'governance', 
    name: 'Governance', 
    expanded: true 
  },
  { 
    id: 'environment', 
    name: 'Environment', 
    expanded: true 
  },
  { 
    id: 'social', 
    name: 'Social', 
    expanded: false 
  },
  { 
    id: 'innovation', 
    name: 'Innovation', 
    expanded: false 
  }
];

// Sample indicators for testing
export const sampleIndicators2024: AVHIndicator[] = [
  {
    id: '2024-211',
    internalId: 211,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'esg-overview',
    categories: ['ESG overview'],
    hierarchicalNumber: '7.',
    name: 'ESG AvH suggestions',
    description: 'Overview of AvH ESG suggestions to be considered for the reporting year.',
    type: 'text',
    year: 2024,
    value: '',
    completed: false,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2024-446',
    internalId: 446,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'governance',
    categories: ['Governance', 'Sustainability/ESG Governance'],
    hierarchicalNumber: '16.',
    name: 'AvH at Audit committee',
    description: 'Is AvH represented in the Audit Committee?\nThe possible answers are:\n- Yes \n- No',
    type: 'boolean',
    year: 2024,
    value: null,
    completed: false,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2024-447',
    internalId: 447,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'governance',
    categories: ['Governance', 'Sustainability/ESG Governance'],
    hierarchicalNumber: '17.',
    name: 'AvH at Risk committee',
    description: 'Is AvH represented in the Risk Committee?\nThe possible answers are:\n- Yes \n- No',
    type: 'boolean',
    year: 2024,
    value: null,
    completed: false,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2024-448',
    internalId: 448,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'governance',
    categories: ['Governance', 'Sustainability/ESG Governance'],
    hierarchicalNumber: '18.',
    name: 'AvH at Remuneration committee',
    description: 'Is AvH represented in the Remuneration Committee?\nThe possible answers are:\n- Yes \n- No',
    type: 'boolean',
    year: 2024,
    value: null,
    completed: false,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2024-290',
    internalId: 290,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'environment',
    categories: ['Environment', 'Carbon footprint'],
    hierarchicalNumber: '8.',
    name: 'CO2 Emissions Scope 1',
    description: 'Total Scope 1 emissions in metric tons CO2e',
    type: 'numeric',
    unit: 'tCO2e',
    year: 2024,
    value: null,
    completed: false,
    notApplicable: false,
    notAvailable: false
  }
];

export const sampleIndicators2023: AVHIndicator[] = [
  {
    id: '2023-211',
    internalId: 211,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'esg-overview',
    categories: ['ESG overview'],
    hierarchicalNumber: '7.',
    name: 'ESG AvH suggestions',
    description: 'Overview of AvH ESG suggestions to be considered for the reporting year.',
    type: 'text',
    year: 2023,
    value: 'Focus on biodiversity reporting, enhanced water management, and supply chain ESG integration.',
    completed: true,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2023-446',
    internalId: 446,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'governance',
    categories: ['Governance', 'Sustainability/ESG Governance'],
    hierarchicalNumber: '16.',
    name: 'AvH at Audit committee',
    description: 'Is AvH represented in the Audit Committee?\nThe possible answers are:\n- Yes \n- No',
    type: 'boolean',
    year: 2023,
    value: true,
    completed: true,
    notApplicable: false,
    notAvailable: false
  },
  {
    id: '2023-290',
    internalId: 290,
    entityId: 12,
    entity: 'Sagar Cements',
    category: 'environment',
    categories: ['Environment', 'Carbon footprint'],
    hierarchicalNumber: '8.',
    name: 'CO2 Emissions Scope 1',
    description: 'Total Scope 1 emissions in metric tons CO2e',
    type: 'numeric',
    unit: 'tCO2e',
    year: 2023,
    value: 2100000,
    completed: true,
    notApplicable: false,
    notAvailable: false
  }
];

export const avhData: AVHData[] = [
  {
    year: 2023,
    indicators: sampleIndicators2023,
    lastUpdated: new Date('2024-01-15'),
    completionPercentage: 67
  },
  {
    year: 2024,
    indicators: sampleIndicators2024,
    lastUpdated: new Date('2024-12-23'),
    completionPercentage: 20
  }
];