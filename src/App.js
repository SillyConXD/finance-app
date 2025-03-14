import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import TransactionForm from "./components/TransactionForm";
import Charts from "./components/Charts";
import Goals from "./components/Goals";
import Budget from "./components/Budget";
import Reports from "./components/Reports";
import Reminders from "./components/Reminders";
import Savings from "./components/Savings";
import "./App.css";
import { AppProvider } from "./AppContext"; // Импортируем AppProvider

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppProvider>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content">
          <div className="container">
            <h2>Главная страница</h2>
            <p>Добро пожаловать в ваш персональный финансовый менеджер!</p>
            <TransactionForm />
            <Charts />
            <Goals />
            <Budget />
            <Reports />
            <Reminders />
            <Savings />
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;