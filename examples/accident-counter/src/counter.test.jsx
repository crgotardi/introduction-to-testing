import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';

let incrementButton, decrementButton, resetButton, counter, unit

describe('Counter ', () => {
  beforeEach(() => {
    render(<Counter />);

    incrementButton = screen.getByRole('button', { name: /increment/i })
    decrementButton = screen.getByRole('button', { name: /decrement/i })
    resetButton = screen.getByRole('button', { name: /reset/i })
    counter = screen.getByTestId('counter-count')
    unit = screen.getByTestId('counter-unit')
  });

  it('renders with an initial count of 0', () => {
    expect(counter).toHaveTextContent('0')
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    expect(decrementButton).toBeDisabled()
    expect(resetButton).toBeDisabled()
  });

  it('displays "days" when the count is 0', () => {
    expect(unit).toHaveTextContent('days')
  });

  it('increments the count when the "Increment" button is clicked', async () => {
    await act(async () => {
      await userEvent.click(incrementButton)
    })

    expect(counter).toHaveTextContent(1)
  });

  it('displays "day" when the count is 1', async () => {
    await act(async () => {
      await userEvent.click(incrementButton)
    })

    expect(unit).toHaveTextContent('day')
  });

  it(
    'decrements the count when the "Decrement" button is clicked',
    async () => {
      await act(async () => {
        await render(<Counter initialCount={1} />);
      })

      expect(decrementButton).not.toBeDisabled()

      await act(async () => {
        await userEvent.click(decrementButton)
      })

      expect(counter).toHaveTextContent(0)
    },
  );

  it('does not allow decrementing below 0', async () => {
    expect(counter).toHaveTextContent(0)
    
    await act(async () => {
      await userEvent.click(decrementButton)
    })

    expect(counter).toHaveTextContent(0)
  });

  it(
    'resets the count when the "Reset" button is clicked',
    async () => {
      await act(async () => {
        await userEvent.click(incrementButton)
      })

      expect(counter).toHaveTextContent(1)

      await act(async () => {
        await userEvent.click(resetButton)
      })

      expect(counter).toHaveTextContent(0)
    },
  );

  it(
    'disables the "Decrement" and "Reset" buttons when the count is 0',
    async () => {
      await act(async () => {
        await userEvent.click(incrementButton)
      })

      expect(decrementButton).not.toBeDisabled()
      expect(resetButton).not.toBeDisabled()

      await act(async () => {
        await userEvent.click(decrementButton)
      })

      expect(decrementButton).toBeDisabled()
      expect(resetButton).toBeDisabled()
    },
  );

  it('updates the document title based on the count', async () => {
    await act(async () => {
      await userEvent.click(incrementButton)
    })

    expect(document.title).toEqual(expect.stringContaining('1 day'))
  });
});
