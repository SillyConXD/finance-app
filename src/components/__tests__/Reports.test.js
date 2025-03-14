import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../AppContext';
import Reports from '../Reports';
import '@testing-library/jest-dom/extend-expect';

describe('Reports', () => {
  test('Генерация отчета за месяц', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Экспортировать отчет/i));

    expect(screen.getByText(/Отчет за месяц/i)).toBeInTheDocument();
  });

  test('Сравнение с предыдущим месяцем', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    expect(screen.getByText(/Сравнение с предыдущим месяцем/i)).toBeInTheDocument();
  });

  test('Отчет за пустой период', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    expect(screen.getByText(/Отчет за пустой период/i)).toBeInTheDocument();
  });

  test('Экспорт отчета', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Экспортировать отчет/i));

    expect(screen.getByText(/Отчет экспортирован/i)).toBeInTheDocument();
  });

  test('Отчет с большим объемом данных', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    expect(screen.getByText(/Отчет с большим объемом данных/i)).toBeInTheDocument();
  });

  test('Изменение данных в отчете', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Редактировать/i));
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '6000' } });
    fireEvent.click(screen.getByText(/Обновить отчет/i));

    expect(screen.getByText(/Отчет обновлен/i)).toBeInTheDocument();
  });

  test('Платеж без даты', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '200' } });
    fireEvent.click(screen.getByText(/Добавить платеж/i));

    expect(screen.getByText(/Платеж добавлен/i)).toBeInTheDocument();
  });

  test('Добавление повторяющегося платежа', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '200' } });
    fireEvent.click(screen.getByLabelText(/Повторяющийся платеж/i));
    fireEvent.click(screen.getByText(/Добавить платеж/i));

    expect(screen.getByText(/Платеж добавлен/i)).toBeInTheDocument();
  });

  test('Уведомление о платеже', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '200' } });
    fireEvent.click(screen.getByText(/Добавить платеж/i));

    expect(screen.getByText(/Платеж добавлен/i)).toBeInTheDocument();
  });

  test('Отметка платежа как выполненного', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Отметить как выполненный/i));

    expect(screen.getByText(/Платеж отмечен как выполненный/i)).toBeInTheDocument();
  });

  test('Редактирование платежа', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Редактировать/i));
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '6000' } });
    fireEvent.click(screen.getByText(/Обновить платеж/i));

    expect(screen.getByText(/Платеж обновлен/i)).toBeInTheDocument();
  });

  test('Платеж с нулевой суммой', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/Добавить платеж/i));

    expect(screen.getByText(/Сумма должна быть положительным числом/i)).toBeInTheDocument();
  });

  test('Удаление платежа', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Удалить/i));

    expect(screen.getByText(/Платеж удален/i)).toBeInTheDocument();
  });

  test('Платеж без даты', () => {
    render(
      <AppProvider>
        <Reports />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Категория/i), { target: { value: 'Еда' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '200' } });
    fireEvent.click(screen.getByText(/Добавить платеж/i));

    expect(screen.getByText(/Платеж добавлен/i)).toBeInTheDocument();
  });
});
