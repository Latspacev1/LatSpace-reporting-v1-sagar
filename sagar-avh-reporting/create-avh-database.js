import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file and extract indicators
const workbook = XLSX.readFile('./AVH Sheet(final) (2).xlsx');

const extractIndicators = (sheetName, year) => {
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  
  const indicators = [];
  
  // Extract data starting from row with headers
  const headerRow = 4; // Based on our analysis, data starts around row 5
  
  for (let row = headerRow; row <= range.e.r; row++) {
    const rowData = [];
    for (let col = 0; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];
      rowData.push(cell ? cell.v : null);
    }
    
    // Check if this is a valid indicator row
    if (rowData[0] && rowData[1] && rowData[2]) {
      const entityId = rowData[0];
      const entity = rowData[1];
      const internalId = rowData[2];
      const categories = rowData.slice(3, 9).filter(c => c !== null);
      const hierarchicalNumber = rowData[9];
      const name = rowData[10];
      const description = rowData[11];
      const value = rowData[12];
      const explanation = rowData[13];
      
      if (entityId && entity && internalId) {
        indicators.push({
          id: `${year}-${internalId}`,
          internalId: parseInt(internalId),
          entityId: parseInt(entityId),
          entity: String(entity),
          categories: categories.map(c => String(c)),
          hierarchicalNumber: hierarchicalNumber ? String(hierarchicalNumber) : undefined,
          name: name ? String(name) : `Indicator ${internalId}`,
          description: description ? String(description) : '',
          type: detectType(description, value),
          year: year,
          value: value || undefined,
          explanation: explanation || undefined,
          completed: !!value
        });
      }
    }
  }
  
  return indicators;
};

const detectType = (description, value) => {
  if (!description) return 'text';
  
  const desc = String(description).toLowerCase();
  
  if (desc.includes('yes') && desc.includes('no')) return 'boolean';
  if (desc.includes('possible answers are:')) return 'multiple-choice';
  if (value && !isNaN(parseFloat(value))) return 'numeric';
  
  return 'text';
};

// Extract indicators for both years
console.log('Extracting AVH indicators...');

const indicators2023 = extractIndicators('2023', 2023);
const indicators2024 = extractIndicators(' 2024', 2024);

console.log(`Extracted ${indicators2023.length} indicators for 2023`);
console.log(`Extracted ${indicators2024.length} indicators for 2024`);

// Create categories from the indicators
const allCategories = new Set();
[...indicators2023, ...indicators2024].forEach(indicator => {
  indicator.categories.forEach(category => {
    if (category && category !== 'Company questionnaire') {
      allCategories.add(category);
    }
  });
});

const categories = Array.from(allCategories).map((cat, index) => ({
  id: cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  name: cat,
  expanded: index < 3 // Expand first 3 categories by default
}));

// Save the database
const avhDatabase = {
  categories,
  data: [
    {
      year: 2023,
      indicators: indicators2023,
      lastUpdated: new Date(),
      completionPercentage: Math.round((indicators2023.filter(i => i.completed).length / indicators2023.length) * 100)
    },
    {
      year: 2024,
      indicators: indicators2024,
      lastUpdated: new Date(),
      completionPercentage: Math.round((indicators2024.filter(i => i.completed).length / indicators2024.length) * 100)
    }
  ]
};

fs.writeFileSync('avh-database.json', JSON.stringify(avhDatabase, null, 2));
console.log('AVH database created successfully!');
console.log(`Categories: ${categories.map(c => c.name).join(', ')}`);
console.log(`Total indicators: ${indicators2023.length + indicators2024.length}`);