import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../AppContext';
import Budget from '../Budget';
import '@testing-library/jest-dom/extend-expect';

describe('Budget', () => {
  test('Установка лимита', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    expect(screen.getByText(/Категория добавлена/i)).toBeInTheDocument();
  });

  test('Превышение лимита', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '600' } });
    fireEvent.click(screen.getByText(/Обновить категорию/i));

    expect(screen.getByText(/Категория обновлена/i)).toBeInTheDocument();
  });

  test('Редактирование лимита', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    fireEvent.click(screen.getByText(/Редактировать/i));
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '600' } });
    fireEvent.click(screen.getByText(/Обновить категорию/i));

    expect(screen.getByText(/Категория обновлена/i)).toBeInTheDocument();
  });

  test('Удаление лимита', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    fireEvent.click(screen.getByText(/Удалить/i));

    expect(screen.getByText(/Категория удалена/i)).toBeInTheDocument();
  });

  test('Лимит с нулевым значением', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    expect(screen.getByText(/Лимит должен быть положительным числом/i)).toBeInTheDocument();
  });

  test('Лимит на не существующую категорию', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Не существующая категория' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    expect(screen.getByText(/Категория добавлена/i)).toBeInTheDocument();
  });

  test('Автоматическое обновление лимита', () => {
    render(
      <AppProvider>
        <Budget />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Добавить категорию/i));

    fireEvent.change(screen.getByLabelText(/Лимит/i), { target: { value: '600' } });
    fireEvent.click(screen.getByText(/Обновить категорию/i));

    expect(screen.getByText(/Категория обновлена/i)).toBeInTheDocument();
  });
});
