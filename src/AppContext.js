import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reminders, setReminders] = useState([]);

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

    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments");
        setPayments(response.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    const fetchReminders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reminders");
        setReminders(response.data);
      } catch (err) {
        console.error("Error fetching reminders:", err);
      }
    };

    fetchTransactions();
    fetchGoals();
    fetchCategories();
    fetchPayments();
    fetchReminders();
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

  const addPayment = async (payment) => {
    try {
      const response = await axios.post("http://localhost:5000/api/payments", payment);
      setPayments([...payments, response.data]);
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  const updatePayment = async (id, updatedPayment) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/payments/${id}`, updatedPayment);
      setPayments(payments.map(p => p.id === id ? response.data : p));
    } catch (err) {
      console.error("Error updating payment:", err);
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${id}`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting payment:", err);
    }
  };

  const addReminder = async (reminder) => {
    try {
      const response = await axios.post("http://localhost:5000/api/reminders", reminder);
      setReminders([...reminders, response.data]);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`);
      setReminders(reminders.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
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
      deleteCategory,
      setCategories, // Добавим setCategories в контекст
      payments, 
      addPayment, 
      updatePayment, 
      deletePayment, 
      setPayments, // Добавим setPayments в контекст
      reminders, 
      addReminder, 
      deleteReminder, 
      setReminders // Добавим setReminders в контекст
    }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};