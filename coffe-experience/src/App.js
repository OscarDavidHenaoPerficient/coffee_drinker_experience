import React from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import {CoffeeContextProvider} from './store/coffee-context';

function App() {
  return (
    <CoffeeContextProvider>
      <Header></Header>
      <main>
        <CoffeeCards />
      </main>
    </CoffeeContextProvider>
  );
}

export default App;
