import React from 'react';
import { Stock } from './features/stock/Stock.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Food Stock Manager
        </p>
        <Stock />
      </header>
    </div>
  );
}

export default App;
