import {render, screen} from '@testing-library/react';
import CoffeeCards from './CoffeeCards';
import '@testing-library/jest-dom';
import AppContext from '../store/coffee-context';

test('show default value', () => {
  render(<CoffeeCards/>);
  expect(screen.getByText('Busca tu mejor sabor.')).toBeInTheDocument()
});

const customRender = (ui, providerProps) => {
  
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>
  )
};

test('render card with espresso coffee data', () => {
  const providerProps = {
    value: {
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
  }
  customRender(<CoffeeCards/>, {providerProps});
});
