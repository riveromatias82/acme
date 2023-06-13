import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('Should render without crashing', () => {
  render(<App />);
});

it('Should be able to search and display results for cat images', async () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(`input[name="query"]`), { target: { value: 'cats' } });
  fireEvent.submit(container.querySelector('form'));
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  expect(screen.getAllByRole('img').length).not.toBeLessThan(0);
});

it('Should navigate to the history page', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('link', { name: 'History' }));
  expect(screen.getByText(/history of searched words/i)).toBeInTheDocument();
});
