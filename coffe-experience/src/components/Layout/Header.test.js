import {render, screen} from '@testing-library/react'
import Header from './Header';
import '@testing-library/jest-dom'

test('loads and displays title', () => {
  render(<Header />);
  const title = screen.getByText('Coffee Styles');
  expect(title).toBeInTheDocument()
});

test('loads and displays background image', () => {
  render(<Header />);
  const image = screen.getByTestId('coffeeBeans');
  expect(image).toBeInTheDocument();
});
