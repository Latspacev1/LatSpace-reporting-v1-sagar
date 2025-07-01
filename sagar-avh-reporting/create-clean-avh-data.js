import XLSX from 'xlsx';
import fs from 'fs';

// Read the raw database
const rawDatabase = JSON.parse(fs.readFileSync('avh-database.json', 'utf8'));

// Define clean category mapping
const categoryMapping = {
  'ESG overview': 'esg-overview',
  'Governance': 'governance', 
  'Sustainability/ESG Governance': 'governance',
  'Sustainability/ESG governance': 'governance',
  'Shareholder governance': 'governance',
  'Operational governance': 'governance',
  'IT Governance': 'governance',
  'Business ethics': 'governance',
  'Environment': 'environment',
  'Environmental impact assessment': 'environment',
  'Carbon footprint': 'environment',
  'Carbon footprint assessment': 'environment',
  'Energy cost and supply chain disruption': 'environment',
  'Water and marine resources': 'environment',
  'Biodiversity and ecosystem': 'environment',
  'Biodiversity': 'environment',
  'Transition plan': 'environment',
  'Energy consumption': 'environment',
  'Pollution': 'environment',
  'Resource use and circular economy': 'environment',
  'Natural resources consumption': 'environment',
  'Scope 3 Emissions - Breakdown': 'environment',
  'Emission factors': 'environment',
  'Social': 'social',
  'Own workforce / General': 'social',
  'Own workforce / Diversity': 'social',
  'Own workforce / Policies': 'social',
  'Own Workforce / Training': 'social',
  'Own workforce / Health and Safety': 'social',
  'Own workforce / Compensation': 'social',
  'Own workforce / Incidents and complaints': 'social',
  'Workers in the value chain': 'social',
  'Working conditions throughout the value chain': 'social',
  'Affected communities': 'social',
  'Consumer and end-users': 'social',
  'Philanthropy': 'social',
  'Innovation': 'innovation',
  'ESG rating agencies': 'esg-overview',
  'SDG': 'esg-overview',
  'Sustainable development goals': 'esg-overview',
  'Incidents': 'social'
};

// Clean categories
const cleanCategories = [
  { id: 'esg-overview', name: 'ESG Overview', expanded: true },
  { id: 'governance', name: 'Governance', expanded: true },
  { id: 'environment', name: 'Environment', expanded: true },
  { id: 'social', name: 'Social', expanded: false },
  { id: 'innovation', name: 'Innovation', expanded: false }
];

// Function to map indicator to clean category
const mapToCleanCategory = (categories) => {
  for (const category of categories) {
    if (categoryMapping[category]) {
      return categoryMapping[category];
    }
  }
  return 'esg-overview'; // default
};

// Process indicators
const processIndicators = (indicators) => {
  return indicators
    .filter(indicator => 
      indicator.entity === 'Sagar Cements' &&
      indicator.name !== 'indicators' &&
      indicator.name !== 'Indicators' &&
      indicator.entity !== 'entity' &&
      indicator.entity !== 'Entity'
    )
    .map(indicator => {
      const cleanCategory = mapToCleanCategory(indicator.categories);
      
      // Detect type more accurately
      let type = 'text';
      let options = undefined;
      
      if (indicator.description) {
        const desc = indicator.description.toLowerCase();
        if (desc.includes('yes') && desc.includes('no') && !desc.includes('possible answers are:')) {
          type = 'boolean';
        } else if (desc.includes('possible answers are:')) {
          type = 'multiple-choice';
          // Extract options from description
          const optionsMatch = indicator.description.match(/possible answers are:\s*(.*?)(?:\n|$)/i);
          if (optionsMatch) {
            options = optionsMatch[1]
              .split(/\s*-\s*/)
              .filter(opt => opt.trim() && !opt.toLowerCase().includes('possible answers'))
              .map(opt => opt.trim());
          }
        } else if (indicator.value && !isNaN(parseFloat(indicator.value))) {
          type = 'numeric';
        }
      }
      
      return {
        id: indicator.id,
        internalId: indicator.internalId,
        entityId: indicator.entityId,
        entity: indicator.entity,
        category: cleanCategory,
        originalCategories: indicator.categories,
        hierarchicalNumber: indicator.hierarchicalNumber,
        name: indicator.name,
        description: indicator.description,
        type,
        options,
        year: indicator.year,
        value: indicator.value,
        explanation: indicator.explanation,
        completed: false,
        notApplicable: false,
        notAvailable: false
      };
    });
};

// Create clean database
const cleanDatabase = {
  categories: cleanCategories,
  data: rawDatabase.data.map(yearData => ({
    year: yearData.year,
    indicators: processIndicators(yearData.indicators),
    lastUpdated: new Date(),
    completionPercentage: 0
  }))
};

// Update completion percentages (set to 0 since no questions are completed by default)
cleanDatabase.data.forEach(yearData => {
  yearData.completionPercentage = 0;
});

fs.writeFileSync('src/data/avhData.ts', `import { AVHCategory, AVHData } from '../types';

export const categories: AVHCategory[] = ${JSON.stringify(cleanDatabase.categories, null, 2)};

export const avhData: AVHData[] = ${JSON.stringify(cleanDatabase.data, null, 2)};
`);

console.log('Clean AVH data created successfully!');
console.log(`Categories: ${cleanDatabase.categories.map(c => c.name).join(', ')}`);
console.log(`2023 Indicators: ${cleanDatabase.data[0].indicators.length}`);
console.log(`2024 Indicators: ${cleanDatabase.data[1].indicators.length}`);
console.log(`Category distribution:`, cleanDatabase.categories.map(cat => ({
  category: cat.name,
  count2023: cleanDatabase.data[0].indicators.filter(i => i.category === cat.id).length,
  count2024: cleanDatabase.data[1].indicators.filter(i => i.category === cat.id).length
})));