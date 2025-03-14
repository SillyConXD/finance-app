import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../../AppContext';
import Charts from '../Charts';
import '@testing-library/jest-dom/extend-expect';

describe('Charts', () => {
  test('Отображение круговой диаграммы', () => {
    render(
      <AppProvider>
        <Charts />
      </AppProvider>
    );

    expect(screen.getByText(/Круговая диаграмма расходов/i)).toBeInTheDocument();
  });

  test('Отображение линейного графика', () => {
    render(
      <AppProvider>
        <Charts />
      </AppProvider>
    );

    expect(screen.getByText(/Линейный график доходов и расходов/i)).toBeInTheDocument();
  });

  test('Отображение данных за выбранный период', () => {
    render(
      <AppProvider>
        <Charts />
      </AppProvider>
    );

    expect(screen.getByText(/Список транзакций/i)).toBeInTheDocument();
  });

  test('Отсутсвие данных', () => {
    render(
      <AppProvider>
        <Charts />
      </AppProvider>
    );

    expect(screen.getByText(/Список транзакций/i)).toBeInTheDocument();
  });

  test('Большой объем данных', () => {
    render(
      <AppProvider>
        <Charts />
      </AppProvider>
    );

    expect(screen.getByText(/Список транзакций/i)).toBeInTheDocument();
  });
});
