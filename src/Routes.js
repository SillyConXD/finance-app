import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Charts from "./components/Charts";
import Budget from "./components/Budget";
import Reports from "./components/Reports";
import Reminders from "./components/Reminders";
import Savings from "./components/Savings";
import Home from "./components/Home"; // Создадим компонент Home для главной страницы
import { AppContext } from "./AppContext"; // Изменено с "./App"

const AppRoutes = () => {
  const { transactions, addTransaction, importTransactions } = useContext(AppContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<Charts transactions={transactions} addTransaction={addTransaction} importTransactions={importTransactions} />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports transactions={transactions} />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/savings" element={<Savings />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;