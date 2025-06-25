import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('./AVH Sheet(final) (2).xlsx');

console.log('=== DETAILED AVH REPORT ANALYSIS ===\n');

// Focus on the data sheets (2023 and 2024)
const dataSheets = ['2023', ' 2024'];

dataSheets.forEach(sheetName => {
    console.log(`\n=== ANALYZING SHEET: ${sheetName} ===`);
    
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Find where actual data starts (skip instruction rows)
    let dataStartRow = 0;
    for (let i = 0; i < Math.min(20, data.length); i++) {
        const row = data[i];
        if (row && row[0] && typeof row[0] === 'string' && 
            (row[0].includes('AVH') || row[0].includes('indicator') || row[0].includes('Indicator'))) {
            dataStartRow = i;
            break;
        }
    }
    
    console.log(`Data starts at row: ${dataStartRow + 1}`);
    
    // Extract indicators and their values
    const indicators = [];
    for (let i = dataStartRow; i < data.length; i++) {
        const row = data[i];
        if (row && row.length >= 2) {
            const indicator = row[0];
            const value = row[1];
            
            if (indicator) {
                indicators.push({
                    rowNumber: i + 1,
                    indicator: String(indicator).substring(0, 100),
                    value: value ? String(value).substring(0, 100) : '',
                    hasValue: !!value
                });
            }
        }
    }
    
    console.log(`Total indicators found: ${indicators.length}`);
    
    // Show first 20 indicators
    console.log('\nFirst 20 indicators:');
    indicators.slice(0, 20).forEach(item => {
        console.log(`Row ${item.rowNumber}: ${item.indicator} => ${item.value || '[EMPTY]'}`);
    });
    
    // Analyze indicator patterns
    const patterns = {
        avhIndicators: indicators.filter(i => i.indicator.includes('AVH')),
        numericIndicators: indicators.filter(i => i.value && !isNaN(parseFloat(i.value))),
        textIndicators: indicators.filter(i => i.value && isNaN(parseFloat(i.value))),
        emptyIndicators: indicators.filter(i => !i.hasValue)
    };
    
    console.log('\nIndicator Analysis:');
    console.log(`- AVH prefixed indicators: ${patterns.avhIndicators.length}`);
    console.log(`- Numeric values: ${patterns.numericIndicators.length}`);
    console.log(`- Text values: ${patterns.textIndicators.length}`);
    console.log(`- Empty values: ${patterns.emptyIndicators.length}`);
    
    // Save detailed data for this sheet
    fs.writeFileSync(`avh-${sheetName.trim()}-detailed.json`, JSON.stringify({
        sheetName,
        dataStartRow,
        totalRows: data.length,
        indicators,
        patterns
    }, null, 2));
});

console.log('\n\nDetailed analysis saved to avh-2023-detailed.json and avh-2024-detailed.json');