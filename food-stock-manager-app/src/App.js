import React from 'react';
import { useSelector } from 'react-redux';
import { Stock } from './features/stock/Stock.js';
import { Login } from './features/login/Login.js';
import './App.css';

function App() {
  const authenticated = useSelector((state) => state.login.authenticated);
  return (
    <div className="App">
      {
        authenticated ? <div>
          <Stock />
        </div> : <header className="App-header">
          <h1>Food Stock Manager</h1>
          <Login />
        </header>
      }
    </div>
  );
}

export default App;
