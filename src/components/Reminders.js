import React, { useState } from 'react';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');

  const addReminder = () => {
    setReminders([...reminders, { reminder, date }]);
    setReminder('');
    setDate('');
  };

  return (
    <div className="form-container">
      <h2>Напоминания</h2>
      <label htmlFor="reminder">Напоминание:</label>
      <input id="reminder" name="reminder" type="text" value={reminder} onChange={(e) => setReminder(e.target.value)} placeholder="Напоминание" />
      <label htmlFor="date">Дата:</label>
      <input id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button className="button-50" onClick={addReminder}>Добавить напоминание</button>
      <ul>
        {reminders.map((r, index) => (
          <li key={index}>{r.reminder}: {r.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;