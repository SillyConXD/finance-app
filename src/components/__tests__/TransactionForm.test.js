import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../AppContext';
import TransactionForm from '../TransactionForm';
import '@testing-library/jest-dom/extend-expect';

describe('TransactionForm', () => {
  test('Добавление Расхода', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'expense' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-02' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    expect(screen.getByText(/Транзакция добавлена/i)).toBeInTheDocument();
  });

  test('Добавление дохода', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Зарплата' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    expect(screen.getByText(/Транзакция добавлена/i)).toBeInTheDocument();
  });

  test('Добавление дохода с отрицательным значением', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Зарплата' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '-5000' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    expect(screen.getByText(/Сумма должна быть положительным числом/i)).toBeInTheDocument();
  });

  test('Добавление дохода с нулевым значением', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Зарплата' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    expect(screen.getByText(/Сумма должна быть положительным числом/i)).toBeInTheDocument();
  });

  test('Добавление Дохода без категории', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    expect(screen.getByText(/Все поля должны быть заполнены/i)).toBeInTheDocument();
  });

  test('Редактирование транзакций', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    // Добавляем транзакцию
    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Зарплата' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    // Редактируем транзакцию
    fireEvent.click(screen.getByText(/Редактировать/i));
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '6000' } });
    fireEvent.click(screen.getByText(/Обновить транзакцию/i));

    expect(screen.getByText(/Транзакция обновлена/i)).toBeInTheDocument();
  });

  test('Удаление транзакций', () => {
    render(
      <AppProvider>
        <TransactionForm />
      </AppProvider>
    );

    // Добавляем транзакцию
    fireEvent.change(screen.getByLabelText(/Тип/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Зарплата' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Дата/i), { target: { value: '2023-10-01' } });
    fireEvent.click(screen.getByText(/Добавить транзакцию/i));

    // Удаляем транзакцию
    fireEvent.click(screen.getByText(/Удалить/i));

    expect(screen.getByText(/Транзакция удалена/i)).toBeInTheDocument();
  });
});
