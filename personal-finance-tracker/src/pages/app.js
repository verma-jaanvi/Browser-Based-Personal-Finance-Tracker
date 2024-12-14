// app.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { checkBudgetLimit, addTransaction } from './budgetLogic.js';

// Firebase config (replace with your actual Firebase project details)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore database reference to be used in other files
export { db };

// Form handling logic for adding a new transaction
document.getElementById("transaction-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get data from form fields
  const name = document.getElementById("transaction-name").value.trim();
  const amount = parseFloat(document.getElementById("transaction-amount").value);
  const type = document.getElementById("transaction-type").value;

  if (name === "" || isNaN(amount)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Add the transaction to Firestore
  addTransaction(name, amount, type)
    .then(() => {
      alert("Transaction added successfully!");
      console.log("Transaction added:", { name, amount, type });
    })
    .catch((error) => {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    });

  // Reset form fields
  document.getElementById("transaction-name").value = '';
  document.getElementById("transaction-amount").value = '';
  document.getElementById("transaction-type").value = 'income';

  // After adding the transaction, check the budget
  checkBudgetLimit();
});

// Example: Retrieve and display transactions (logs to console)
getTransactions().then((transactions) => {
  console.log("Transactions retrieved:", transactions);
}).catch((error) => {
  console.error("Error retrieving transactions:", error);
});

// Function to manually check the budget status (you can call this based on some trigger or manually)
async function checkCurrentBudget() {
  await checkBudgetLimit(); // Check if current expenses exceed the budget limit
}

// Check the budget status (you can call this based on some trigger or manually)
checkCurrentBudget();

// Function to retrieve transactions from Firestore
async function getTransactions() {
  const transactionsList = [];
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((doc) => {
      transactionsList.push(doc.data());
    });
    return transactionsList;
  } catch (e) {
    console.error("Error retrieving transactions:", e);
    throw new Error('Failed to retrieve transactions');
  }
}
