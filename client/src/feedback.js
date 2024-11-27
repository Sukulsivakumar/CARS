import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelToJson = () => {
    const [jsonData, setJsonData] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Parse the data and convert it into the required JSON format
            const jsonResult = processExcelData(rawData);
            setJsonData(jsonResult);
        };

        reader.readAsArrayBuffer(file);
    };

    // Function to process Excel data into desired JSON structure
    const processExcelData = (data) => {
        let result = {
            date: data[0][0],  // Assuming first row contains date and time
            submitted_answer: data[1][0],  // Assuming second row contains submitted answer count
            question_count: data[2][0],  // Assuming third row contains the question count
            questions: [],
        };

        // Loop through the data starting from row 4 (index 3)
        for (let i = 4; i < data.length; i++) {
            let label = data[i][0];  // Label like Q1, Q2, etc.
            let question = data[i][1];  // Question text
            let type = data[i][2];  // Question type (Yes/No, Scale, Fill-up)

            let responses = {};
            if (type === 'Yes/No') {
                // Assuming Yes/No responses are in columns 3 and 4 (change index if needed)
                responses = {
                    Yes: data[i][3],
                    No: data[i][4],
                };
            } else if (type === 'Scale') {
                // Assuming Scale responses start from column 3 (adjust based on your Excel structure)
                for (let j = 3; j < data[i].length; j += 2) {
                    let option = data[i][j];  // Scale option
                    let count = data[i][j + 1];  // Number of responses for the option
                    if (option) {
                        responses[option] = count;
                    }
                }
            }

            // Add question details to the result
            result.questions.push({
                label: label,
                question: question,
                type: type,
                responses: type === 'fill-up' ? null : responses,
            });
        }

        return result;
    };

    return (
        <div>
            <h2>Upload Excel to Convert to JSON</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

            {jsonData && (
                <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
            )}
        </div>
    );
};

export default ExcelToJson;
