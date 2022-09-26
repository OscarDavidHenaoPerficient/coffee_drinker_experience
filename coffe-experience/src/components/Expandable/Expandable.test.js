import React, {useContext} from 'react';
import Expandable from './Expandable';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import AppContext, {AppContextProvider} from '../store/coffee-context';
import userEvent from '@testing-library/user-event';

const CustomTest = () => {
  // const cxt = useContext(AppContext);
  
  return (<Expandable />);
};

const customRender  = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  )
}

describe('test app', () => {
  let providerProps;
  beforeEach(() => 
    (providerProps = {
      coffeeSelected: 'Espresso',
      allCoffeeData: [{
        ïd: 'c1',
        ingredients: [ 'cafe', '30ml agua' ],
        title: 'Espresso',
        description: 'Se inventó en Italia durante el siglo XIX, un shot de espresso se prepara mediante el traspaso a presión de una pequeña cantidad de agua a punto de hervir (entre 86 y 95 ºC) a través del café molido finamente. La espuma que se genera de manera natural en la parte superior es la medida del espresso perfecto.',
        characteristics: ['fuerte'],
      }],
      coffeeSelectedData: {
        ïd: 'c1',
        ingredients: [ 'cafe', '30ml agua' ],
        title: 'Espresso',
        description: 'Se inventó en Italia durante el siglo XIX, un shot de espresso se prepara mediante el traspaso a presión de una pequeña cantidad de agua a punto de hervir (entre 86 y 95 ºC) a través del café molido finamente. La espuma que se genera de manera natural en la parte superior es la medida del espresso perfecto.',
        characteristics: ['fuerte'],
      },
      coffeeSelectionHandler: () => {},
    }
  ))
  
  test('renders default', () => {
    render(<Expandable />);
    expect(screen.getByText('Busca tu mejor sabor.')).toBeTruthy();
  });

  test('renders content for espresso coffee', () => {
    customRender(<Expandable />, {providerProps});
    const detailsButton = screen.getByRole('button');
    fireEvent.click(detailsButton);
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });
});

