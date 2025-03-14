import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм

const TransactionForm = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, importTransactions, categories } = useContext(AppContext);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      setError("Все поля должны быть заполнены");
      return;
    }
    if (amount <= 0) {
      setError("Сумма должна быть положительным числом");
      return;
    }
    try {
      if (editId) {
        await updateTransaction(editId, { type, category, amount: parseFloat(amount), date });
        setEditId(null);
      } else {
        await addTransaction({ type, category, amount: parseFloat(amount), date });
      }
      setType("income");
      setCategory("");
      setAmount("");
      setDate("");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении транзакции");
    }
  };

  const handleEdit = (transaction) => {
    setType(transaction.type);
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setDate(transaction.date);
    setEditId(transaction.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      setError("Ошибка при удалении транзакции");
    }
  };

  return (
    <div className="form-container">
      <h4>Добавить транзакцию</h4>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="type">Тип:</label>
        <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        <label htmlFor="category">Категория:</label>
        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.category}>{c.category}</option>
          ))}
        </select>
        <label htmlFor="amount">Сумма:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="date">Дата:</label>
        <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="button-50" type="submit">{editId ? "Обновить транзакцию" : "Добавить транзакцию"}</button>
        <button className="button-50" type="button" onClick={importTransactions}>Импортировать транзакции</button>
      </form>
      <h4>Список транзакций</h4>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.category} - {transaction.amount} - {transaction.type}
            <button className="button-50" onClick={() => handleEdit(transaction)}>Редактировать</button>
            <button className="button-50" onClick={() => handleDelete(transaction.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionForm;