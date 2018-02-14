import React, { Component } from 'react';
import Storage from './Storage';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainFrame from './main_frame';
import SvgIcon from 'material-ui/SvgIcon';
//console.log(Storage);
var storage = new Storage();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Forgotten Kingdoms Area Builder</h1>
          <div class="footer"><a href="https://github.com/glitchassassin/fk-ascii-editor">Hosted on GitHub</a></div>
        </header>
        <div className="App-intro">
          <MuiThemeProvider>
            <MainFrame />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

function test_google_drive() {
  storage.AuthorizeAndPick(function(contents) {
    console.log(contents);
    storage.uploadNewFile(contents.length+".txt", contents + `\nNew Line! (${contents.length})`, console.log);
  });
}

export default App;
