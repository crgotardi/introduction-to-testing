import { screen, fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { createButton } from './button.js';

describe('createButton', () => {
  let button;

  beforeEach(() => {
    button = createButton()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should create a button element', () => {
    document.body.appendChild(button)
    const btn = screen.getByRole('button', { name: 'Click Me' })
    expect(btn).toBeInTheDocument()
  });

  it('should have the text "Click Me"', () => {
    expect(button.textContent).toBe('Click Me')
  });

  it('should change the text to "Clicked!" when clicked', async () => {
    document.body.appendChild(button)
    const btn = screen.getByRole('button', { name: 'Click Me' })

    await userEvent.click(btn)

    expect(button.textContent).toBe('Clicked!')
  });
});
