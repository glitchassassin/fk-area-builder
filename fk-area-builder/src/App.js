import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './Models/are_model';

class App extends Component {
  render() {
    let loader = new Loader()
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Forgotten Kingdoms Area Builder</h1>
        </header>
        <p className="App-intro">
          <pre>
            {loader.toString()}
          </pre>
        </p>
      </div>
    );
  }
}

export default App;
