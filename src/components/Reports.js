import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Импортируем стили кнопок
import './Form.css'; // Импортируем стили для форм
import './Reports.css'; // Импортируем стили для компонента Reports
import { AppContext } from '../AppContext'; // Добавим импорт AppContext
import Modal from 'react-modal'; // Импортируем библиотеку для модальных окон
import axios from 'axios'; // Импортируем axios для работы с API

Modal.setAppElement('#root'); // Установим элемент для модального окна

const Reports = () => {
  const { transactions } = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState('');
  const [previousMonth, setPreviousMonth] = useState('');
  const [reportData, setReportData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [emptyPeriodReport, setEmptyPeriodReport] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chatGPTResponse, setChatGPTResponse] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const previousMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;
    setCurrentMonth(currentMonth);
    setPreviousMonth(previousMonth);
  }, []);

  useEffect(() => {
    if (currentMonth) {
      generateMonthlyReport(currentMonth);
    }
    if (previousMonth) {
      generateComparisonReport(currentMonth, previousMonth);
    }
  }, [currentMonth, previousMonth, transactions]);

  const generateMonthlyReport = (month) => {
    const filteredTransactions = transactions.filter(t => t.date.startsWith(month));
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    setReportData({ income, expense });
  };

  const generateComparisonReport = (currentMonth, previousMonth) => {
    const currentTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
    const previousTransactions = transactions.filter(t => t.date.startsWith(previousMonth));

    const currentIncome = currentTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const currentExpense = currentTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const previousIncome = previousTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const previousExpense = previousTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);

    setComparisonData({
      current: { income: currentIncome, expense: currentExpense },
      previous: { income: previousIncome, expense: previousExpense }
    });
  };

  const generateEmptyPeriodReport = () => {
    const emptyPeriodTransactions = transactions.filter(t => !t.date);
    const income = emptyPeriodTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expense = emptyPeriodTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    setEmptyPeriodReport({ income, expense });
  };

  const openModal = async () => {
    setModalIsOpen(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Analyze the following financial report data and provide comments and advice:\n\nIncome: ${reportData?.income}\nExpense: ${reportData?.expense}\nComparison with previous month:\nCurrent Income: ${comparisonData?.current?.income}\nCurrent Expense: ${comparisonData?.current?.expense}\nPrevious Income: ${comparisonData?.previous?.income}\nPrevious Expense: ${comparisonData?.previous?.expense}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        }
      });
      setChatGPTResponse(response.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching data from ChatGPT:', error);
      setChatGPTResponse('Ошибка при получении данных от ChatGPT.');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="reports-container" style={{ zIndex: 2 }}>
      <h2>Отчеты</h2>
      <div>
        <h3>Отчет за текущий месяц ({currentMonth})</h3>
        {reportData ? (
          <div>
            <p>Доходы: {reportData.income}</p>
            <p>Расходы: {reportData.expense}</p>
          </div>
        ) : (
          <p>Нет данных за текущий месяц</p>
        )}
      </div>
      <div>
        <h3>Сравнение с предыдущим месяцем ({previousMonth})</h3>
        {comparisonData ? (
          <div>
            <p>Доходы текущего месяца: {comparisonData.current.income}</p>
            <p>Расходы текущего месяца: {comparisonData.current.expense}</p>
            <p>Доходы предыдущего месяца: {comparisonData.previous.income}</p>
            <p>Расходы предыдущего месяца: {comparisonData.previous.expense}</p>
          </div>
        ) : (
          <p>Нет данных для сравнения</p>
        )}
      </div>
      <div>
        <h3>Отчет за пустой период</h3>
        <button className="button-50" onClick={generateEmptyPeriodReport} style={{ zIndex: 2 }}>Сгенерировать отчет</button>
        {emptyPeriodReport && (
          <div>
            <p>Доходы: {emptyPeriodReport.income}</p>
            <p>Расходы: {emptyPeriodReport.expense}</p>
          </div>
        )}
      </div>
      <button className="button-50" onClick={openModal} style={{ zIndex: 2 }}>Сгенерировать отчет</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="ChatGPT Report"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Отчет от ChatGPT</h2>
        <p>{chatGPTResponse}</p>
        <button className="button-50" onClick={closeModal} style={{ zIndex: 2 }}>Закрыть</button>
      </Modal>
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