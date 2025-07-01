import { Section, Question, BRSRPrinciple } from '../types';

export const sections: Section[] = [
  { 
    id: 'section-a', 
    title: 'Section A: General Disclosures', 
    expanded: true,
    type: 'section'
  },
  { 
    id: 'section-b', 
    title: 'Section B: Management and Process Disclosures', 
    expanded: false,
    type: 'section'
  },
  { 
    id: 'section-c', 
    title: 'Section C: Principle-wise Performance Disclosures', 
    expanded: true,
    type: 'section'
  },
  { 
    id: 'principle-1', 
    title: 'Principle 1: Ethics and Transparency', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-2', 
    title: 'Principle 2: Sustainable Products and Services', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-3', 
    title: 'Principle 3: Employee Welfare', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-4', 
    title: 'Principle 4: Stakeholder Responsiveness', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-5', 
    title: 'Principle 5: Human Rights', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-6', 
    title: 'Principle 6: Environment Protection', 
    expanded: true,
    type: 'principle'
  },
  { 
    id: 'principle-7', 
    title: 'Principle 7: Consumer Responsibility', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-8', 
    title: 'Principle 8: Inclusive Growth', 
    expanded: false,
    type: 'principle'
  },
  { 
    id: 'principle-9', 
    title: 'Principle 9: Public Policy Engagement', 
    expanded: false,
    type: 'principle'
  },
];

export const brsrPrinciples: BRSRPrinciple[] = [
  {
    id: 'principle-1',
    title: 'Ethics and Transparency',
    description: 'Businesses should conduct themselves with ethics, transparency and accountability',
    essentialIndicators: 5,
    leadershipIndicators: 2
  },
  {
    id: 'principle-2',
    title: 'Sustainable Products and Services',
    description: 'Businesses should provide goods and services in a manner that is sustainable and safe',
    essentialIndicators: 12,
    leadershipIndicators: 4
  },
  {
    id: 'principle-3',
    title: 'Employee Welfare',
    description: 'Businesses should respect and promote the well-being of all employees',
    essentialIndicators: 15,
    leadershipIndicators: 8
  },
  {
    id: 'principle-4',
    title: 'Stakeholder Responsiveness',
    description: 'Businesses should respect the interests of and be responsive to all its stakeholders',
    essentialIndicators: 4,
    leadershipIndicators: 2
  },
  {
    id: 'principle-5',
    title: 'Human Rights',
    description: 'Businesses should respect and promote human rights',
    essentialIndicators: 8,
    leadershipIndicators: 3
  },
  {
    id: 'principle-6',
    title: 'Environment Protection',
    description: 'Businesses should respect and make efforts to protect and restore the environment',
    essentialIndicators: 25,
    leadershipIndicators: 12
  },
  {
    id: 'principle-7',
    title: 'Consumer Responsibility',
    description: 'Businesses should engage with and provide value to their consumers in a responsible manner',
    essentialIndicators: 6,
    leadershipIndicators: 3
  },
  {
    id: 'principle-8',
    title: 'Inclusive Growth',
    description: 'Businesses should promote inclusive growth and equitable development',
    essentialIndicators: 9,
    leadershipIndicators: 4
  },
  {
    id: 'principle-9',
    title: 'Public Policy Engagement',
    description: 'Businesses should engage with and provide value to their consumers and customers in a responsible manner',
    essentialIndicators: 2,
    leadershipIndicators: 1
  }
];

export const questions: Question[] = [
  // Section A: General Disclosures
  {
    id: 'a1',
    text: 'Corporate Identity Number (CIN) of the listed entity',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true,
    validation: { required: true }
  },
  {
    id: 'a2',
    text: 'Name of the listed entity',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a3',
    text: 'Year of incorporation',
    completed: false,
    sectionId: 'section-a',
    type: 'date',
    isEssential: true
  },
  {
    id: 'a4',
    text: 'Registered office address',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a5',
    text: 'Corporate address',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a6',
    text: 'E-mail',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true,
    validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$', message: 'Please enter a valid email address' }
  },
  {
    id: 'a7',
    text: 'Telephone',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a8',
    text: 'Website',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a9',
    text: 'Financial year for which reporting is being done',
    completed: false,
    sectionId: 'section-a',
    type: 'text',
    isEssential: true
  },
  {
    id: 'a10',
    text: 'Name of the Stock Exchange(s) where shares are listed',
    completed: false,
    sectionId: 'section-a',
    type: 'dropdown',
    isEssential: true,
    options: ['BSE', 'NSE', 'Both BSE and NSE', 'Other']
  },
  {
    id: 'a11',
    text: 'Details of business activities (accounting for 90% of the turnover)',
    completed: false,
    sectionId: 'section-a',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'desc', label: 'Description of Main Activity', type: 'text', required: true },
        { id: 'nic_code', label: 'Description of Business Activity', type: 'text', required: true },
        { id: 'turnover', label: '% of Turnover', type: 'percentage', required: true }
      ],
      rows: [],
      allowAddRows: true
    }
  },

  // Section B: Management and Process Disclosures
  {
    id: 'b1',
    text: 'Whether the entity has a designated Board Committee to oversee the implementation of ESG practices',
    completed: false,
    sectionId: 'section-b',
    type: 'dropdown',
    isEssential: true,
    options: ['Yes', 'No']
  },
  {
    id: 'b2',
    text: 'Provide details of the highest authority responsible for implementation and oversight of the Business Responsibility and Sustainability policy',
    completed: false,
    sectionId: 'section-b',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'particulars', label: 'Particulars', type: 'text', required: true },
        { id: 'details', label: 'Details', type: 'text', required: true }
      ],
      rows: [
        { id: 'din', label: 'DIN Number', data: {} },
        { id: 'name', label: 'Name', data: {} },
        { id: 'designation', label: 'Designation', data: {} },
        { id: 'phone', label: 'Telephone number', data: {} },
        { id: 'email', label: 'Email Id', data: {} }
      ]
    }
  },

  // Principle 6: Environment Protection - Essential Indicators
  {
    id: 'p6-e1',
    text: 'Details of total energy consumption (in Joules or multiples) and energy intensity',
    completed: false,
    sectionId: 'principle-6',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'parameter', label: 'Parameter', type: 'text' },
        { id: 'fy_current', label: 'FY 2024-25 (Current)', type: 'number' },
        { id: 'fy_previous', label: 'FY 2023-24 (Previous)', type: 'number' }
      ],
      rows: [
        { id: 'total_electricity', label: 'Total Electricity Consumption (A)', data: { fy_current: '2500000', fy_previous: '2200000' } },
        { id: 'total_fuel', label: 'Total Fuel Consumption (B)', data: { fy_current: '1800000', fy_previous: '1650000' } },
        { id: 'energy_consumption', label: 'Energy Consumption through other sources (C)', data: { fy_current: '350000', fy_previous: '320000' } },
        { id: 'total_energy', label: 'Total Energy Consumption (A+B+C)', data: { fy_current: '4650000', fy_previous: '4170000' } },
        { id: 'energy_intensity', label: 'Energy Intensity per rupee of turnover', data: { fy_current: '0.0125', fy_previous: '0.0138' } },
        { id: 'energy_intensity_optional', label: 'Energy Intensity (optional) - per product', data: { fy_current: '85.5', fy_previous: '82.3' } }
      ]
    }
  },
  {
    id: 'p6-e2',
    text: 'Details of total water consumption and water intensity',
    completed: false,
    sectionId: 'principle-6',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'parameter', label: 'Parameter', type: 'text', required: true },
        { id: 'fy_current', label: 'FY 2024-25 (Current)', type: 'number', required: true },
        { id: 'fy_previous', label: 'FY 2023-24 (Previous)', type: 'number', required: true }
      ],
      rows: [
        { id: 'water_withdrawal', label: 'Water withdrawal by source (in kilolitres)', data: {} },
        { id: 'surface_water', label: '(i) Surface water', data: {} },
        { id: 'groundwater', label: '(ii) Groundwater', data: {} },
        { id: 'third_party', label: '(iii) Third party water', data: {} },
        { id: 'seawater', label: '(iv) Seawater / desalinated water', data: {} },
        { id: 'others', label: '(v) Others', data: {} },
        { id: 'total_withdrawal', label: 'Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)', data: {} },
        { id: 'water_consumption', label: 'Total volume of water consumption (in kilolitres)', data: {} },
        { id: 'water_intensity', label: 'Water intensity per rupee of turnover (Water consumed/turnover)', data: {} },
        { id: 'water_intensity_optional', label: 'Water intensity (optional) - per product', data: {} }
      ]
    }
  },
  {
    id: 'p6-e3',
    text: 'Details of total waste generated and waste intensity',
    completed: false,
    sectionId: 'principle-6',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'parameter', label: 'Parameter', type: 'text', required: true },
        { id: 'fy_current', label: 'FY 2024-25 (Current)', type: 'number', required: true },
        { id: 'fy_previous', label: 'FY 2023-24 (Previous)', type: 'number', required: true }
      ],
      rows: [
        { id: 'plastic_waste', label: 'Plastic waste (A)', data: {} },
        { id: 'ewaste', label: 'E-waste (B)', data: {} },
        { id: 'bio_medical', label: 'Bio-medical waste (C)', data: {} },
        { id: 'construction', label: 'Construction and demolition waste (D)', data: {} },
        { id: 'battery_waste', label: 'Battery waste (E)', data: {} },
        { id: 'radioactive', label: 'Radioactive waste (F)', data: {} },
        { id: 'other_hazardous', label: 'Other Hazardous waste (G)', data: {} },
        { id: 'other_non_hazardous', label: 'Other Non-hazardous waste (H)', data: {} },
        { id: 'total_waste', label: 'Total (A+B+C+D+E+F+G+H)', data: {} }
      ]
    }
  },

  // Principle 3: Employee Welfare - Essential Indicators
  {
    id: 'p3-e1',
    text: 'Details of measures for the well-being of workers',
    completed: false,
    sectionId: 'principle-3',
    type: 'table',
    isEssential: true,
    tableConfig: {
      columns: [
        { id: 'category', label: 'Category', type: 'text', required: true },
        { id: 'total_employees', label: 'Total (A)', type: 'number', required: true },
        { id: 'health_insurance', label: 'Health Insurance', type: 'number' },
        { id: 'accident_insurance', label: 'Accident Insurance', type: 'number' },
        { id: 'maternity_benefits', label: 'Maternity Benefits', type: 'number' },
        { id: 'paternity_benefits', label: 'Paternity Benefits', type: 'number' },
        { id: 'day_care', label: 'Day Care Facilities', type: 'number' }
      ],
      rows: [
        { id: 'permanent_workers', label: 'Permanent Workers', data: {} },
        { id: 'other_workers', label: 'Other than Permanent Workers', data: {} },
        { id: 'permanent_employees', label: 'Permanent Employees', data: {} },
        { id: 'other_employees', label: 'Other than Permanent Employees', data: {} }
      ]
    }
  }
];

export const rawFiles = [
  {
    id: 'rf1',
    uploadType: 'Bulk Upload',
    filename: 'Electricity-bill-matampally-2024-q1.csv',
    user: 'mahesh@sagarcements.in',
    timestamp: '2024-07-01 10:30:00'
  },
  {
    id: 'rf2',
    uploadType: 'Smart Upload',
    filename: 'SPT131APR2024.pdf',
    user: 'ramesh@sagarcements.in',
    timestamp: '2024-07-01 10:30:00'
  },
  {
    id: 'rf3',
    uploadType: 'Manual Entry',
    filename: 'SPT131APR2024.pdf',
    user: 'ramesh@sagarcements.in',
    timestamp: '2024-07-01 10:30:00'
  },
  {
    id: 'rf4',
    uploadType: 'Bulk Upload',
    filename: 'Electricity-bill-sangareddy-2024-q2.csv',
    user: 'suresh@sagarcements.in',
    timestamp: '2024-08-15 14:22:00'
  },
  {
    id: 'rf5',
    uploadType: 'Smart Upload',
    filename: 'TNEB-Bill-June2024.pdf',
    user: 'priya@sagarcements.in',
    timestamp: '2024-07-05 09:15:00'
  },
  {
    id: 'rf6',
    uploadType: 'Manual Entry',
    filename: 'Energy-Consumption-Report-Q3.xlsx',
    user: 'anitha@sagarcements.in',
    timestamp: '2024-09-10 16:45:00'
  },
  {
    id: 'rf7',
    uploadType: 'Bulk Upload',
    filename: 'Andhra-Pradesh-EB-Bills-2024.zip',
    user: 'kiran@sagarcements.in',
    timestamp: '2024-06-20 11:00:00'
  },
  {
    id: 'rf8',
    uploadType: 'Smart Upload',
    filename: 'BESCOM-Monthly-Statement-Aug24.pdf',
    user: 'vijay@sagarcements.in',
    timestamp: '2024-09-02 13:30:00'
  },
  {
    id: 'rf9',
    uploadType: 'Manual Entry',
    filename: 'Factory-Energy-Data-Sept2024.csv',
    user: 'lakshmi@sagarcements.in',
    timestamp: '2024-10-01 08:20:00'
  },
  {
    id: 'rf10',
    uploadType: 'Bulk Upload',
    filename: 'Maharashtra-MSEDCL-Bills-Q2.pdf',
    user: 'rajesh@sagarcements.in',
    timestamp: '2024-07-25 15:10:00'
  },
  {
    id: 'rf11',
    uploadType: 'Smart Upload',
    filename: 'Gujarat-Energy-Consumption-2024.xlsx',
    user: 'amit@sagarcements.in',
    timestamp: '2024-08-30 12:00:00'
  },
  {
    id: 'rf12',
    uploadType: 'Manual Entry',
    filename: 'Renewable-Energy-Usage-Report.pdf',
    user: 'deepa@sagarcements.in',
    timestamp: '2024-09-15 10:45:00'
  },
  {
    id: 'rf13',
    uploadType: 'Bulk Upload',
    filename: 'All-Plants-Energy-Summary-2024.csv',
    user: 'admin@sagarcements.in',
    timestamp: '2024-10-10 17:30:00'
  },
  {
    id: 'rf14',
    uploadType: 'Smart Upload',
    filename: 'Solar-Generation-Data-Oct2024.pdf',
    user: 'green.energy@sagarcements.in',
    timestamp: '2024-10-15 14:20:00'
  },
  {
    id: 'rf15',
    uploadType: 'Manual Entry',
    filename: 'Diesel-Generator-Usage-Q3.xlsx',
    user: 'operations@sagarcements.in',
    timestamp: '2024-09-28 16:00:00'
  }
];

export const importedEnergyData = [
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant A',
    source_type: 'Electricity',
    energy_source: 'Grid',
    renewable: 'N',
    quantity: 34200,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 123.12,
    energy_tj: 0.12312,
    sr_category: 'D',
    reference_doc: 'Grid_Bill_Apr23.pdf'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant A',
    source_type: 'Electricity',
    energy_source: 'Solar',
    renewable: 'Y',
    quantity: 5200,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 18.72,
    energy_tj: 0.01872,
    sr_category: 'A',
    reference_doc: 'Solar_PPA_Meter_Apr23.csv'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant A',
    source_type: 'Fuel',
    energy_source: 'Coal',
    renewable: 'N',
    quantity: 150,
    quantity_unit: 't',
    ncv_gj_per_unit: 25,
    energy_gj: 3750,
    energy_tj: 3.75,
    sr_category: 'E',
    reference_doc: 'Coal_Purchase_Register.xlsx'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant A',
    source_type: 'Fuel',
    energy_source: 'Biomass',
    renewable: 'Y',
    quantity: 80,
    quantity_unit: 't',
    ncv_gj_per_unit: 15,
    energy_gj: 1200,
    energy_tj: 1.2,
    sr_category: 'B',
    reference_doc: 'Biomass_Invoice_Apr23.pdf'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant A',
    source_type: 'Fuel',
    energy_source: 'Diesel',
    renewable: 'N',
    quantity: 10,
    quantity_unit: 'kL',
    ncv_gj_per_unit: 35.8,
    energy_gj: 358,
    energy_tj: 0.358,
    sr_category: 'E',
    reference_doc: 'Diesel_Purchases_Apr23.xlsx'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant B',
    source_type: 'Electricity',
    energy_source: 'Grid',
    renewable: 'N',
    quantity: 28700,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 103.32,
    energy_tj: 0.10332,
    sr_category: 'D',
    reference_doc: 'Grid_Bill_PlantB_Apr23.pdf'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Apr-23',
    plant: 'Plant B',
    source_type: 'Electricity',
    energy_source: 'Wind PPA',
    renewable: 'Y',
    quantity: 6300,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 22.68,
    energy_tj: 0.02268,
    sr_category: 'A',
    reference_doc: 'Wind_PPA_Meter_PlantB_Apr23.csv'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'May-23',
    plant: 'Plant A',
    source_type: 'Electricity',
    energy_source: 'Grid',
    renewable: 'N',
    quantity: 35600,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 128.16,
    energy_tj: 0.12816,
    sr_category: 'D',
    reference_doc: 'Grid_Bill_May23.pdf'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'May-23',
    plant: 'Plant A',
    source_type: 'Electricity',
    energy_source: 'Solar',
    renewable: 'Y',
    quantity: 5800,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 20.88,
    energy_tj: 0.02088,
    sr_category: 'A',
    reference_doc: 'Solar_PPA_Meter_May23.csv'
  },
  {
    fiscal_year: 'FY 2023-24',
    month: 'Jun-23',
    plant: 'Plant C',
    source_type: 'Electricity',
    energy_source: 'Grid',
    renewable: 'N',
    quantity: 42300,
    quantity_unit: 'kWh',
    ncv_gj_per_unit: 0.0036,
    energy_gj: 152.28,
    energy_tj: 0.15228,
    sr_category: 'D',
    reference_doc: 'Grid_Bill_PlantC_Jun23.pdf'
  }
];