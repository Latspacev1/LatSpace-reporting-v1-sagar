import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('./AVH Sheet(final) (2).xlsx');

console.log('=== AVH REPORT ANALYSIS ===\n');
console.log(`Total sheets: ${workbook.SheetNames.length}`);
console.log(`Sheet names: ${JSON.stringify(workbook.SheetNames)}\n`);

// Analyze each sheet
workbook.SheetNames.forEach((sheetName, index) => {
    console.log(`\n=== SHEET ${index + 1}: ${sheetName} ===`);
    
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    console.log(`Rows: ${data.length}`);
    if (data.length > 0) {
        console.log(`Columns: ${data[0].length}`);
        
        // Show headers
        if (data[0]) {
            console.log(`\nHeaders: ${JSON.stringify(data[0].slice(0, 10))}`);
        }
        
        // Show sample data
        console.log('\nSample data (first 5 rows):');
        for (let i = 0; i < Math.min(5, data.length); i++) {
            const row = data[i];
            const displayRow = row.slice(0, 8).map(cell => 
                cell ? String(cell).substring(0, 30) : ''
            );
            console.log(`Row ${i + 1}: ${JSON.stringify(displayRow)}`);
        }
    }
    
    console.log('-'.repeat(80));
});

// Create a summary JSON file
const summary = {
    totalSheets: workbook.SheetNames.length,
    sheets: workbook.SheetNames.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        return {
            name: sheetName,
            rows: data.length,
            columns: data[0] ? data[0].length : 0,
            headers: data[0] || [],
            sampleData: data.slice(1, 4)
        };
    })
};

fs.writeFileSync('avh-report-structure.json', JSON.stringify(summary, null, 2));
console.log('\nDetailed structure saved to avh-report-structure.json');