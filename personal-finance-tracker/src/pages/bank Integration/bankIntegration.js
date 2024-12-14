import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Include CryptoJS for encryption
const CryptoJS = window.CryptoJS;

const firebaseConfig = {
    apiKey: "AIzaSyAOUwmmEhdfkAt6vhHkWin4bl0uMrp_qJ8",
    authDomain: "finance-tracker-97c95.firebaseapp.com",
    projectId: "finance-tracker-97c95",
    storageBucket: "finance-tracker-97c95.firebasestorage.app",
    messagingSenderId: "750027674630",
    appId: "1:750027674630:web:f867ec7338d3525f735f87",
    measurementId: "G-948Q0T0K5J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const bankForm = document.getElementById('bankForm');
const spreadsheet = document.getElementById('spreadsheet').getElementsByTagName('tbody')[0];

bankForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const bankName = e.target.bankName.value;
    let accountNumber = e.target.accountNumber.value;
    let ifscCode = e.target.ifscCode.value;

    // Encrypt the sensitive information before saving to Firestore
    const encryptedAccountNumber = CryptoJS.AES.encrypt(accountNumber, 'secret-key').toString();
    const encryptedIFSCCode = CryptoJS.AES.encrypt(ifscCode, 'secret-key').toString();

    // Mock API call (Replace with actual bank API integration)
    const mockTransactions = [
        { date: "2024-12-01", description: "Grocery Store", amount: 150, type: "Debit" },
        { date: "2024-12-05", description: "Salary", amount: 2000, type: "Credit" },
        { date: "2024-12-10", description: "Electricity Bill", amount: 100, type: "Debit" }
    ];

    // Save transactions to Firestore with encrypted bank details
    try {
        const bankTransactionRef = collection(db, 'bankTransaction'); // Updated collection name
        for (const transaction of mockTransactions) {
            await addDoc(bankTransactionRef, { 
                ...transaction, 
                bankName, 
                encryptedAccountNumber, 
                encryptedIFSCCode 
            });
        }
        alert('Transactions fetched and saved successfully!');
        displayTransactions(mockTransactions);
    } catch (error) {
        console.error('Error saving transactions:', error);
    }
});

// Display transactions in the table
async function displayTransactions(transactions) {
    spreadsheet.innerHTML = ''; // Clear existing rows
    transactions.forEach(transaction => {
        const row = spreadsheet.insertRow();
        Object.values(transaction).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}


// Decrypting the account number and IFSC code
// const decryptedAccountNumber = CryptoJS.AES.decrypt(encryptedAccountNumber, 'secret-key').toString(CryptoJS.enc.Utf8);
// const decryptedIFSCCode = CryptoJS.AES.decrypt(encryptedIFSCCode, 'secret-key').toString(CryptoJS.enc.Utf8);

// console.log(decryptedAccountNumber);  // Logs the decrypted account number
// console.log(decryptedIFSCCode);       // Logs the decrypted IFSC code
