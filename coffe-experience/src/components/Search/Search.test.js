import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Search from './Search';

test('renders the select input with its options', () => {
  render(<Search />);
  const coffeeSelector = screen.getByTestId('selection_drawer');
  expect(coffeeSelector).toBeInTheDocument();
  expect(screen.getByTestId('Americano')).toBeInTheDocument()
});