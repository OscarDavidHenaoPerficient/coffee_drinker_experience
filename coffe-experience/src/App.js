import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards';
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
