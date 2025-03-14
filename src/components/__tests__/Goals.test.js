import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../AppContext';
import Goals from '../Goals';
import '@testing-library/jest-dom/extend-expect';

describe('Goals', () => {
  test('Добавление цели', () => {
    render(
      <AppProvider>
        <Goals />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Цель/i), { target: { value: 'Новая цель' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Добавить цель/i));

    expect(screen.getByText(/Цель добавлена/i)).toBeInTheDocument();
  });

  test('Внесение средств в цель', () => {
    render(
      <AppProvider>
        <Goals />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Цель/i), { target: { value: 'Новая цель' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Добавить цель/i));

    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '500' } });
    fireEvent.click(screen.getByText(/Обновить цель/i));

    expect(screen.getByText(/Цель обновлена/i)).toBeInTheDocument();
  });

  test('Превышение цели', () => {
    render(
      <AppProvider>
        <Goals />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Цель/i), { target: { value: 'Новая цель' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Добавить цель/i));

    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1500' } });
    fireEvent.click(screen.getByText(/Обновить цель/i));

    expect(screen.getByText(/Цель обновлена/i)).toBeInTheDocument();
  });

  test('Удаление цели', () => {
    render(
      <AppProvider>
        <Goals />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Цель/i), { target: { value: 'Новая цель' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Добавить цель/i));

    fireEvent.click(screen.getByText(/Удалить/i));

    expect(screen.getByText(/Цель удалена/i)).toBeInTheDocument();
  });

  test('Редактирование цели', () => {
    render(
      <AppProvider>
        <Goals />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/Цель/i), { target: { value: 'Новая цель' } });
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Добавить цель/i));

    fireEvent.click(screen.getByText(/Редактировать/i));
    fireEvent.change(screen.getByLabelText(/Сумма/i), { target: { value: '1500' } });
    fireEvent.click(screen.getByText(/Обновить цель/i));

    expect(screen.getByText(/Цель обновлена/i)).toBeInTheDocument();
  });
});
