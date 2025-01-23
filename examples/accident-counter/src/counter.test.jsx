import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';

describe('Counter ', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('renders with an initial count of 0', () => {
    const counter = screen.getByTestId('counter-count')
    expect(counter).toHaveTextContent('0')

  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    const decrementButton = screen.getByRole('button', { name: /decrement/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })

    expect(decrementButton).toBeDisabled()
    expect(resetButton).toBeDisabled()
  });

  it('displays "days" when the count is 0', () => {
    const unit = screen.getByTestId('counter-unit')
    expect(unit).toHaveTextContent('days')
  });

  it('increments the count when the "Increment" button is clicked', async () => {
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    const counter = screen.getByTestId('counter-count')

    await userEvent.click(incrementButton)
    expect(counter).toHaveTextContent(1)
  });

  it('displays "day" when the count is 1', async () => {
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    const unit = screen.getByTestId('counter-unit')

    await userEvent.click(incrementButton)

    expect(unit).toHaveTextContent('day')
  });

  it(
    'decrements the count when the "Decrement" button is clicked',
    async () => {
      const decrementButton = screen.getByRole('button', { name: /decrement/i })
      const incrementButton = screen.getByRole('button', { name: /increment/i })
      const counter = screen.getByTestId('counter-count')

      expect(counter).toHaveTextContent(0)
      await userEvent.click(incrementButton)
      expect(counter).toHaveTextContent(1)
      await userEvent.click(decrementButton)
      expect(counter).toHaveTextContent(0)
    },
  );

  it('does not allow decrementing below 0', async () => {
    const decrementButton = screen.getByRole('button', { name: /decrement/i })
    const counter = screen.getByTestId('counter-count')

    expect(counter).toHaveTextContent(0)
    await userEvent.click(decrementButton)
    expect(counter).toHaveTextContent(0)
  });

  it(
    'resets the count when the "Reset" button is clicked',
    async () => {
      const incrementButton = screen.getByRole('button', { name: /increment/i })
      const resetButton = screen.getByRole('button', { name: /reset/i })
      const counter = screen.getByTestId('counter-count')

      await userEvent.click(incrementButton)
      expect(counter).toHaveTextContent(1)

      await userEvent.click(resetButton)
      expect(counter).toHaveTextContent(0)
    },
  );

  it(
    'disables the "Decrement" and "Reset" buttons when the count is 0',
    async () => {
      const incrementButton = screen.getByRole('button', { name: /increment/i })
      const decrementButton = screen.getByRole('button', { name: /decrement/i })
      const resetButton = screen.getByRole('button', { name: /reset/i })

      await userEvent.click(incrementButton)

      expect(decrementButton).not.toBeDisabled()
      expect(resetButton).not.toBeDisabled()

      await userEvent.click(decrementButton)

      expect(decrementButton).toBeDisabled()
      expect(resetButton).toBeDisabled()
    },
  );

  it('updates the document title based on the count', async () => {
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    await userEvent.click(incrementButton)

    expect(document.title).toInclude('1 day')
  });
});
