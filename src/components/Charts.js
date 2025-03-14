import React, { useState, useContext, useEffect } from "react";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { AppContext } from "../AppContext";
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Charts = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useContext(AppContext);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Обновляем данные для графиков при изменении транзакций
    const updatedExpenseData = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const category = t.category;
        if (!acc[category]) acc[category] = { category, amount: 0 };
        acc[category].amount += parseFloat(t.amount); // Убедимся, что amount преобразован в число
        return acc;
      }, {});
    setExpenseData(Object.values(updatedExpenseData)); // Преобразуем объект в массив

    const updatedMonthlyData = transactions.reduce((acc, t) => {
      const month = t.date ? t.date.slice(0, 7) : 'Без даты';
      if (!acc[month]) acc[month] = { date: month, income: 0, expense: 0 };
      acc[month][t.type] += parseFloat(t.amount); // Убедимся, что amount преобразован в число
      return acc;
    }, {});
    setMonthlyData(Object.values(updatedMonthlyData));
  }, [transactions]);

  const handleAddTransaction = async () => {
    if (!category || !amount || !date) {
      toast.error("Все поля должны быть заполнены");
      return;
    }
    if (amount <= 0) {
      toast.error("Сумма должна быть положительным числом");
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
      toast.success("Транзакция добавлена");
    } catch (err) {
      toast.error("Ошибка при добавлении транзакции");
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
      toast.success("Транзакция удалена");
    } catch (err) {
      toast.error("Ошибка при удалении транзакции");
      setError("Ошибка при удалении транзакции");
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h4>Добавить транзакцию</h4>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          Тип:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </label>
        <label>
          Категория:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Сумма:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Дата:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button className="button-50" onClick={handleAddTransaction}>{editId ? "Обновить транзакцию" : "Добавить транзакцию"}</button>
      </div>

      <div>
        <h4>Круговая диаграмма расходов</h4>
        <PieChart width={400} height={400}>
          <Pie data={expenseData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        </PieChart>
      </div>

      <div>
        <h4>Линейный график доходов и расходов</h4>
        <LineChart width={600} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Доходы" />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" name="Расходы" />
        </LineChart>
      </div>

      <div>
        <h4>Список транзакций</h4>
        <ul style={{ textAlign: "center" }}>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date} - {transaction.category} - {transaction.amount} - {transaction.type}
              <button className="button-50" onClick={() => handleEdit(transaction)}>Редактировать</button>
              <button className="button-50" onClick={() => handleDelete(transaction.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Charts;