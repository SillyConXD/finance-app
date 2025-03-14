import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = ({ transactions }) => {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({ type: '', category: '', amount: '', date: '', repeat: false });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Загрузка платежей из локального хранилища
    const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
    setPayments(storedPayments);
  }, []);

  useEffect(() => {
    // Сохранение платежей в локальное хранилище
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const handleAddPayment = () => {
    if (!payment.category || !payment.amount || !payment.date) {
      toast.error("Все поля должны быть заполнены");
      return;
    }
    if (payment.amount <= 0) {
      toast.error("Сумма должна быть положительным числом");
      return;
    }
    const newPayment = { ...payment, id: Date.now(), completed: false };
    setPayments([...payments, newPayment]);
    setPayment({ type: '', category: '', amount: '', date: '', repeat: false });
    toast.success("Платеж добавлен");
  };

  const handleEditPayment = (id) => {
    const paymentToEdit = payments.find(p => p.id === id);
    setPayment(paymentToEdit);
    setEditId(id);
  };

  const handleUpdatePayment = () => {
    const updatedPayments = payments.map(p => p.id === editId ? payment : p);
    setPayments(updatedPayments);
    setPayment({ type: '', category: '', amount: '', date: '', repeat: false });
    setEditId(null);
    toast.success("Платеж обновлен");
  };

  const handleDeletePayment = (id) => {
    const updatedPayments = payments.filter(p => p.id !== id);
    setPayments(updatedPayments);
    toast.success("Платеж удален");
  };

  const handleCompletePayment = (id) => {
    const updatedPayments = payments.map(p => p.id === id ? { ...p, completed: true } : p);
    setPayments(updatedPayments);
    toast.success("Платеж отмечен как выполненный");
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Платежи</h2>
      <label htmlFor="type">Тип:</label>
      <select id="type" name="type" value={payment.type} onChange={(e) => setPayment({ ...payment, type: e.target.value })}>
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
      <label htmlFor="category">Категория:</label>
      <input
        id="category"
        name="category"
        type="text"
        value={payment.category}
        onChange={(e) => setPayment({ ...payment, category: e.target.value })}
      />
      <label htmlFor="amount">Сумма:</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={payment.amount}
        onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
      />
      <label htmlFor="date">Дата:</label>
      <input id="date" name="date" type="date" value={payment.date} onChange={(e) => setPayment({ ...payment, date: e.target.value })} />
      <label>
        <input
          type="checkbox"
          checked={payment.repeat}
          onChange={(e) => setPayment({ ...payment, repeat: e.target.checked })}
        />
        Повторяющийся платеж
      </label>
      <button className="button-50" onClick={editId ? handleUpdatePayment : handleAddPayment}>
        {editId ? "Обновить платеж" : "Добавить платеж"}
      </button>
      <h3>Список платежей</h3>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            {p.date} - {p.category} - {p.amount} - {p.type} - {p.repeat ? "Повторяющийся" : "Однократный"} - {p.completed ? "Выполнен" : "Не выполнен"}
            <button className="button-50" onClick={() => handleEditPayment(p.id)}>Редактировать</button>
            <button className="button-50" onClick={() => handleDeletePayment(p.id)}>Удалить</button>
            {!p.completed && <button className="button-50" onClick={() => handleCompletePayment(p.id)}>Отметить как выполненный</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

Reports.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string,
    })
  ).isRequired,
};

export default Reports;