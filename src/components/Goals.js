import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Goals = () => {
  const { goals, addGoal } = useContext(AppContext);
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddGoal = async () => {
    try {
      await addGoal({ goal, amount });
      setGoal('');
      setAmount('');
      toast.success("Цель добавлена");
    } catch (err) {
      toast.error("Ошибка при добавлении цели");
      console.error("Ошибка при добавлении цели:", err);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Цели</h2>
      <label htmlFor="goal">Цель:</label>
      <input id="goal" name="goal" type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Цель" />
      <label htmlFor="amount">Сумма:</label>
      <input id="amount" name="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Сумма" />
      <button className="button-50" onClick={handleAddGoal}>Добавить цель</button>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g.goal}: {g.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;