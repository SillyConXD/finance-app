import React, { useState, useContext } from 'react';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import './Reminders.css'; // Импортируем стили для компонента Reminders
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../AppContext'; // Добавим импорт AppContext

const Reminders = () => {
  const { reminders, addReminder, deleteReminder } = useContext(AppContext);
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');

  const handleAddReminder = async () => {
    if (!reminder || !date) {
      toast.error("Все поля должны быть заполнены");
      return;
    }
    try {
      await addReminder({ reminder, date });
      setReminder('');
      setDate('');
      toast.success("Напоминание добавлено");
    } catch (err) {
      toast.error("Ошибка при добавлении напоминания");
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      toast.success("Напоминание удалено");
    } catch (err) {
      toast.error("Ошибка при удалении напоминания");
    }
  };

  return (
    <div className="reminders-container" style={{ zIndex: 2 }}>
      <ToastContainer />
      <h2>Напоминания</h2>
      <label htmlFor="reminder">Напоминание:</label>
      <input id="reminder" name="reminder" type="text" value={reminder} onChange={(e) => setReminder(e.target.value)} placeholder="Напоминание" style={{ zIndex: 2 }} />
      <label htmlFor="date">Дата:</label>
      <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ zIndex: 2 }} />
      <button className="button-50" onClick={handleAddReminder} style={{ zIndex: 2 }}>Добавить напоминание</button>
      <ul style={{ zIndex: 2 }}>
        {reminders.map((r) => (
          <li key={r.id}>
            {r.reminder}: {r.date}
            <button className="button-50" onClick={() => handleDeleteReminder(r.id)} style={{ zIndex: 2 }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;