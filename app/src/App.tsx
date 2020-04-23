import React from "react";
import { Todos } from "./components/Todos";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todos />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
