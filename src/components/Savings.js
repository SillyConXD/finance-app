import React, { useState } from 'react';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Savings = () => {
  const [savings, setSavings] = useState(0);
  const [percentage, setPercentage] = useState('');

  const addSavings = (income) => {
    if (!percentage || percentage <= 0) {
      toast.error("Процент должен быть положительным числом");
      return;
    }
    const amount = (income * percentage) / 100;
    setSavings(savings + amount);
    toast.success("Сбережения добавлены");
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Резервный фонд</h2>
      <label htmlFor="percentage">Процент от дохода:</label>
      <input id="percentage" name="percentage" type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="Процент от дохода" />
      <button className="button-50" onClick={() => addSavings(1000)}>Добавить 1000 дохода</button> {/* Пример добавления дохода */}
      <p>Текущий резервный фонд: {savings}</p>
    </div>
  );
};

export default Savings;