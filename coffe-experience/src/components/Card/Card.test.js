import Card from "./Card";
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

const propsTest = () => {
  return (<p>test child</p>)
}

test('renders card with its children', () => {
  render(<Card>{propsTest()}</Card> );
  const text = screen.getByText('test child');
  expect(text).toBeTruthy()
});

test('renders element in DOM', () => {
  render(<Card>{propsTest()}</Card>);
  const id = screen.getByTestId('card');
  expect(id).toBeInTheDocument();
});
