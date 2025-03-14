import React, { useState } from 'react';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм

const Savings = () => {
  const [savings, setSavings] = useState(0);
  const [percentage, setPercentage] = useState('');

  const addSavings = (income) => {
    const amount = (income * percentage) / 100;
    setSavings(savings + amount);
  };

  return (
    <div className="form-container">
      <h2>Резервный фонд</h2>
      <label htmlFor="percentage">Процент от дохода:</label>
      <input id="percentage" name="percentage" type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="Процент от дохода" />
      <button className="button-50" onClick={() => addSavings(1000)}>Добавить 1000 дохода</button> {/* Пример добавления дохода */}
      <p>Текущий резервный фонд: {savings}</p>
    </div>
  );
};

export default Savings;