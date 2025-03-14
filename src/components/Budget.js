import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Budget = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    goals, 
    addGoal, 
    updateGoal, 
    deleteGoal,
    setCategories // Добавим setCategories для обновления категорий
  } = useContext(AppContext);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editGoalId, setEditGoalId] = useState(null);

  const handleAddCategory = async () => {
    try {
      if (editCategoryId) {
        await updateCategory(editCategoryId, { category, category_limit: parseFloat(limit) });
        setEditCategoryId(null);
      } else {
        const newCategory = { category, category_limit: parseFloat(limit) };
        await addCategory(newCategory);
        setCategories([...categories, newCategory]); // Обновляем категории в контексте
      }
      setCategory('');
      setLimit('');
      toast.success("Категория добавлена");
    } catch (err) {
      toast.error("Ошибка при добавлении/редактировании категории");
      console.error("Ошибка при добавлении/редактировании категории:", err);
    }
  };

  const handleEditCategory = (category) => {
    setCategory(category.category);
    setLimit(category.category_limit);
    setEditCategoryId(category.id);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setEditCategoryId(null); // Сбросить состояние редактирования
      setCategories(categories.filter(c => c.id !== id)); // Обновляем категории в контексте
      toast.success("Категория удалена");
    } catch (err) {
      toast.error("Ошибка при удалении категории");
      console.error("Ошибка при удалении категории:", err);
    }
  };

  const handleAddGoal = async () => {
    try {
      if (editGoalId) {
        await updateGoal(editGoalId, { goal, amount: parseFloat(amount) });
        setEditGoalId(null);
      } else {
        await addGoal({ goal, amount: parseFloat(amount) });
      }
      setGoal('');
      setAmount('');
      toast.success("Цель добавлена");
    } catch (err) {
      toast.error("Ошибка при добавлении/редактировании цели");
      console.error("Ошибка при добавлении/редактировании цели:", err);
    }
  };

  const handleEditGoal = (goal) => {
    setGoal(goal.goal);
    setAmount(goal.amount);
    setEditGoalId(goal.id);
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      setEditGoalId(null); // Сбросить состояние редактирования
      toast.success("Цель удалена");
    } catch (err) {
      toast.error("Ошибка при удалении цели");
      console.error("Ошибка при удалении цели:", err);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Бюджет</h2>
      <label htmlFor="category">Категория:</label>
      <input id="category" name="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Категория" />
      <label htmlFor="limit">Лимит:</label>
      <input id="limit" name="limit" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="Лимит" />
      <button className="button-50" onClick={handleAddCategory}>{editCategoryId ? "Обновить категорию" : "Добавить категорию"}</button>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.category}: {c.category_limit}
            <button className="button-50" onClick={() => handleEditCategory(c)}>Редактировать</button>
            <button className="button-50" onClick={() => handleDeleteCategory(c.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <h2>Цели</h2>
      <label htmlFor="goal">Цель:</label>
      <input id="goal" name="goal" type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Цель" />
      <label htmlFor="amount">Сумма:</label>
      <input id="amount" name="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Сумма" />
      <button className="button-50" onClick={handleAddGoal}>{editGoalId ? "Обновить цель" : "Добавить цель"}</button>
      <ul>
        {goals.map((g) => (
          <li key={g.id}>
            {g.goal}: {g.amount}
            <button className="button-50" onClick={() => handleEditGoal(g)}>Редактировать</button>
            <button className="button-50" onClick={() => handleDeleteGoal(g.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;