import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Add a new transaction from the form
const addTransaction = async (name, amount, type) => {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      name: name,
      amount: parseFloat(amount),
      type: type,
      timestamp: new Date()
    });
    alert("Transaction added successfully!");
    console.log("Transaction added with ID: ", docRef.id);
  } catch (e) {
    alert("Error adding transaction: " + e.message);
    console.error("Error adding transaction: ", e);
  }
};

// Retrieve transactions and log them to the console
const getTransactions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());  // Logs each document's ID and data
    });
  } catch (e) {
    console.error("Error retrieving transactions: ", e);
  }
};

// Handle form submission to add a transaction
document.getElementById("transaction-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("transaction-name").value;
  const amount = document.getElementById("transaction-amount").value;
  const type = document.getElementById("transaction-type").value;

  // Add transaction to Firestore
  addTransaction(name, amount, type);

  // Clear form inputs
  document.getElementById("transaction-name").value = "";
  document.getElementById("transaction-amount").value = "";
  document.getElementById("transaction-type").value = "income";
});

// Fetch and log all transactions when page is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Fetching transactions...");
  getTransactions();
});
