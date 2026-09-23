// @ts-nocheck
/**
 * Google Apps Script for RSVP and Wishes
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1H40T0CIjmd0OW55SJLKechqXgGanAAMJ8P89qZhxhVo/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code in Code.gs and paste this entire file's contents
 * 4. Save the project (Ctrl+S or Cmd+S)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy" and authorize the script
 * 10. Copy the resulting "Web app URL" and place it in your .env file as VITE_GOOGLE_SCRIPT_URL=your_url
 */

function doPost(e) {
  try {
    // Check if post data exists
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse({ status: 'error', message: 'No data provided' }, 400);
    }

    // Parse the JSON data sent from the React frontend
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheet;

    if (!sheetName) {
      return createResponse({ status: 'error', message: 'Sheet name is required' }, 400);
    }

    // Get the active spreadsheet
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(sheetName);

    // If sheet doesn't exist, create it and auto-generate headers
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      
      // Auto-generate headers based on data keys (excluding 'sheet')
      const headers = ['Timestamp'];
      for (const key in data) {
        if (key !== 'sheet') {
          // Capitalize first letter of header for better readability, or leave as is
          headers.push(key);
        }
      }
      
      // Append the headers to the first row
      sheet.appendRow(headers);
      
      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold')
                 .setBackground('#e0e0e0')
                 .setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }

    // Read the existing headers to map the incoming data correctly
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = [];

    // Map the incoming data to the correct columns based on headers
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header === 'Timestamp') {
        rowData.push(new Date()); // Always add current date/time to Timestamp column
      } else {
        // If data exists for the header, add it, otherwise empty string
        rowData.push(data[header] !== undefined ? data[header] : '');
      }
    }

    // Append the new row with the data
    sheet.appendRow(rowData);

    // Return success response
    return createResponse({ status: 'success', message: 'Data added successfully' }, 200);
    
  } catch (error) {
    // Return error response
    return createResponse({ status: 'error', message: error.toString() }, 500);
  }
}

// Handle GET requests (useful for testing if the Web App URL is working)
function doGet(e) {
  return createResponse({ status: 'success', message: 'Wedding Web App API is running!' }, 200);
}

// Helper function to format JSON responses
function createResponse(responseObject, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
