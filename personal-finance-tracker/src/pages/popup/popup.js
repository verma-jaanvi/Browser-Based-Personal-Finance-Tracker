import { uploadTransactionData } from './background.js';

document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('transactionFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const transactions = parseCSV(content);
            transactions.forEach(uploadTransactionData);
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file first!');
    }
});

function parseCSV(content) {
    const rows = content.split('\n');
    const headers = rows[0].split(',');
    return rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index].trim();
            return acc;
        }, {});
    });
}
