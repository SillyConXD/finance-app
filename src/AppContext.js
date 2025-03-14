import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/goals");
        setGoals(response.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchTransactions();
    fetchGoals();
    fetchCategories();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post("http://localhost:5000/api/transactions", transaction);
      setTransactions([...transactions, response.data]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/transactions/${id}`, updatedTransaction);
      setTransactions(transactions.map(t => t.id === id ? response.data : t));
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const importTransactions = () => {
    const importedTransactions = [
      { type: "income", category: "Зарплата", amount: 5000, date: "2023-10-01" },
      { type: "expense", category: "Еда", amount: 200, date: "2023-10-02" },
    ];
    importedTransactions.forEach(transaction => addTransaction(transaction));
  };

  const addGoal = async (goal) => {
    try {
      const response = await axios.post("http://localhost:5000/api/goals", goal);
      setGoals([...goals, response.data]);
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  const updateGoal = async (id, updatedGoal) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/goals/${id}`, updatedGoal);
      setGoals(goals.map(g => g.id === id ? response.data : g));
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`);
      setGoals(goals.filter(g => g.id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post("http://localhost:5000/api/categories", category);
      setCategories([...categories, response.data]);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/categories/${id}`, updatedCategory);
      setCategories(categories.map(c => c.id === id ? response.data : c));
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <AppContext.Provider value={{ 
      transactions, 
      addTransaction, 
      updateTransaction, 
      deleteTransaction, 
      importTransactions, 
      goals, 
      addGoal, 
      updateGoal, 
      deleteGoal, 
      categories, 
      addCategory, 
      updateCategory, 
      deleteCategory 
    }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};