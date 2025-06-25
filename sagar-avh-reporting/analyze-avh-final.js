import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('./AVH Sheet(final) (2).xlsx');

console.log('=== COMPREHENSIVE AVH REPORT ANALYSIS ===\n');

// Analyze each data sheet
['2023', ' 2024'].forEach(sheetName => {
    console.log(`\n=== SHEET: ${sheetName} ===`);
    
    const worksheet = workbook.Sheets[sheetName];
    
    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    console.log(`Total cells: ${(range.e.r + 1)} rows x ${(range.e.c + 1)} columns`);
    
    // Read all data with proper structure
    const data = [];
    for (let row = 0; row <= range.e.r; row++) {
        const rowData = [];
        for (let col = 0; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            const cell = worksheet[cellAddress];
            rowData.push(cell ? cell.v : null);
        }
        // Only add non-empty rows
        if (rowData.some(cell => cell !== null)) {
            data.push(rowData);
        }
    }
    
    console.log(`Non-empty rows: ${data.length}`);
    
    // Find the actual data structure
    let headerRowIndex = -1;
    for (let i = 0; i < Math.min(50, data.length); i++) {
        const row = data[i];
        // Look for rows that might contain indicator codes
        if (row[0] && typeof row[0] === 'string' && 
            (row[0].toLowerCase().includes('indicator') || 
             row[0].toLowerCase().includes('avh') ||
             row[0].toLowerCase().includes('code') ||
             row[0].toLowerCase().includes('description'))) {
            headerRowIndex = i;
            console.log(`Found potential header at row ${i + 1}: ${row.slice(0, 5)}`);
            break;
        }
    }
    
    // Display structure around potential data area
    console.log('\nExamining data structure:');
    const startRow = Math.max(0, headerRowIndex - 2);
    const endRow = Math.min(data.length, headerRowIndex + 20);
    
    for (let i = startRow; i < endRow; i++) {
        const row = data[i];
        const displayRow = row.slice(0, Math.min(10, row.length)).map(cell => {
            if (cell === null) return '[null]';
            if (typeof cell === 'string') return cell.substring(0, 50);
            return String(cell);
        });
        console.log(`Row ${i + 1}: ${JSON.stringify(displayRow)}`);
    }
    
    // Try to identify AVH indicators pattern
    console.log('\nSearching for AVH indicators:');
    let avhCount = 0;
    data.forEach((row, index) => {
        row.forEach((cell, colIndex) => {
            if (cell && typeof cell === 'string' && cell.toUpperCase().includes('AVH')) {
                if (avhCount < 10) {
                    console.log(`Found AVH at Row ${index + 1}, Col ${colIndex + 1}: ${cell}`);
                }
                avhCount++;
            }
        });
    });
    console.log(`Total AVH mentions: ${avhCount}`);
    
    // Save raw data for manual inspection
    fs.writeFileSync(`avh-${sheetName.trim()}-raw.json`, JSON.stringify({
        sheetName,
        totalRows: data.length,
        headerRowIndex,
        first30Rows: data.slice(0, 30),
        last10Rows: data.slice(-10)
    }, null, 2));
});

console.log('\n\nRaw data saved for manual inspection.');