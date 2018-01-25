import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Dropbox } from 'dropbox';

class App extends Component {
  render() {
    var dbx = new Dropbox({ accessToken: 'REDACTED' });
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Forgotten Kingdoms Area Builder</h1>
        </header>
        <p className="App-intro">
          Hello world!
        </p>
      </div>
    );
  }
}

export default App;
