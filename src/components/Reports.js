import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм

const Reports = ({ transactions }) => {
  const [monthlyReport, setMonthlyReport] = useState({});
  const [comparisonReport, setComparisonReport] = useState({});
  const [emptyPeriodReport, setEmptyPeriodReport] = useState({});
  const [largeDataReport, setLargeDataReport] = useState({});
  const [exportedReport, setExportedReport] = useState(null);

  useEffect(() => {
    generateMonthlyReport(transactions);
    compareWithPreviousMonth(transactions);
    generateEmptyPeriodReport(transactions);
    generateLargeDataReport(transactions);
  }, [transactions]);

  const generateMonthlyReport = (transactions) => {
    const report = transactions.reduce((acc, t) => {
      const month = t.date ? t.date.slice(0, 7) : 'Без даты';
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };
      acc[month][t.type] += parseFloat(t.amount);
      return acc;
    }, {});
    setMonthlyReport(report);
  };

  const compareWithPreviousMonth = (transactions) => {
    const report = transactions.reduce((acc, t) => {
      const month = t.date ? t.date.slice(0, 7) : 'Без даты';
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };
      acc[month][t.type] += parseFloat(t.amount);
      return acc;
    }, {});

    const months = Object.keys(report).sort();
    const comparison = months.reduce((acc, month, index) => {
      if (index === 0) return acc;
      const prevMonth = months[index - 1];
      acc[month] = {
        income: report[month].income - report[prevMonth].income,
        expense: report[month].expense - report[prevMonth].expense,
      };
      return acc;
    }, {});
    setComparisonReport(comparison);
  };

  const generateEmptyPeriodReport = (transactions) => {
    const report = transactions.filter(t => !t.date).reduce((acc, t) => {
      if (!acc['Без даты']) acc['Без даты'] = { income: 0, expense: 0 };
      acc['Без даты'][t.type] += parseFloat(t.amount);
      return acc;
    }, {});
    setEmptyPeriodReport(report);
  };

  const generateLargeDataReport = (transactions) => {
    const report = transactions.reduce((acc, t) => {
      const month = t.date ? t.date.slice(0, 7) : 'Без даты';
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };
      acc[month][t.type] += parseFloat(t.amount);
      return acc;
    }, {});
    setLargeDataReport(report);
  };

  const exportReport = () => {
    const report = JSON.stringify(monthlyReport, null, 2);
    setExportedReport(report);
  };

  return (
    <div className="form-container">
      <h2>Отчеты</h2>
      <button className="button-50" onClick={exportReport}>Экспортировать отчет</button>
      {exportedReport && <pre>{exportedReport}</pre>}
      <h3>Отчет за месяц</h3>
      <ul>
        {Object.keys(monthlyReport).map(month => (
          <li key={month}>
            {month}: Доходы - {monthlyReport[month].income}, Расходы - {monthlyReport[month].expense}
          </li>
        ))}
      </ul>
      <h3>Сравнение с предыдущим месяцем</h3>
      <ul>
        {Object.keys(comparisonReport).map(month => (
          <li key={month}>
            {month}: Изменение доходов - {comparisonReport[month].income}, Изменение расходов - {comparisonReport[month].expense}
          </li>
        ))}
      </ul>
      <h3>Отчет за пустой период</h3>
      <ul>
        {Object.keys(emptyPeriodReport).map(period => (
          <li key={period}>
            {period}: Доходы - {emptyPeriodReport[period].income}, Расходы - {emptyPeriodReport[period].expense}
          </li>
        ))}
      </ul>
      <h3>Отчет с большим объемом данных</h3>
      <ul>
        {Object.keys(largeDataReport).map(month => (
          <li key={month}>
            {month}: Доходы - {largeDataReport[month].income}, Расходы - {largeDataReport[month].expense}
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