// budgetLogic.js

import { db } from './app.js';
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

// Reference to the current budget document
const budgetRef = doc(db, "budgetPlans", "currentBudget"); // Adjust path if necessary
const transactionsRef = collection(db, "orderHistory"); // Adjust path to your collection

// Function to check if the budget limit is exceeded
async function checkBudgetLimit() {
  const budgetDoc = await getDoc(budgetRef);
  const budgetData = budgetDoc.data();

  if (budgetData && budgetData.budget !== undefined) {
    const budgetLimit = budgetData.budget;
    let totalExpenses = 0;

    // Get all transactions and sum the expenses
    const q = query(transactionsRef, where("type", "==", "expense"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      totalExpenses += doc.data().amount;
    });

    if (totalExpenses > budgetLimit) {
      alert(`Your expenses have exceeded the budget limit! Total expenses: ₹${totalExpenses.toFixed(2)}`);
    } else {
      alert(`Current expenses: ₹${totalExpenses.toFixed(2)} - Within budget`);
    }
  } else {
    console.error('Error: Budget data not found or invalid');
  }
}

// Function to add a transaction
async function addTransaction(transaction) {
  try {
    await addDoc(transactionsRef, transaction);
    console.log("Transaction added successfully!");
    // After adding the transaction, check the budget again
    checkBudgetLimit();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Export the functions so they can be used in other parts of your app
export { checkBudgetLimit, addTransaction };
