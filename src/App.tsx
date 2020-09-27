import React from 'react';
import './App.css';
import Board from './components/Board';
import Board1 from './components/Board1';

function App() {
  return (
    <div className="App">
      <h2 className="header">Хрестики - нулики</h2>
      {/* <Board /> */}
      <Board1 />
    </div>
  );
}

export default App;
