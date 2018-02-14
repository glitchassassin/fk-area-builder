import React, { Component } from 'react';
import Storage from './Storage';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainFrame from './main_frame';
import SvgIcon from 'material-ui/SvgIcon';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Area} from './Models/are_model';
import Loader from './Models/loader';

//console.log(Storage);
var storage = new Storage();

class App extends Component {
  state = {
    area: new Area()
  }
  updateAreaState(area) {
      this.setState({area});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Forgotten Kingdoms Area Builder</h1>
          <div className="footer"><a href="https://github.com/glitchassassin/fk-ascii-editor">Hosted on GitHub</a></div>
        </header>
        <div className="App-intro">
          <MuiThemeProvider>
            <MainFrame area={this.state.area} updateAreaState={this.updateAreaState.bind(this)} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

class AppHeader extends Component {
  state = {
    loaded: true,
    file: "",
  };

  handleChange = (event, loaded) => {
    this.setState({loaded: loaded});
  };
  
  setFileName = (file) => {
    this.setState({file})
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconElementRight={this.state.loaded ? <Save area={this.props.area} file={this.state.file} setFileName={this.setFileName} /> : <LoadFromGoogleDrive onDriveLoad={this.props.onDriveLoad} />}
        />
      </div>
    );
  }
}

class Save extends Component {
  state = {
    saving: false
  }
  saveDrive() {
    let contents = this.props.area.toString();
    var filename;
    if (this.props.file == "") {
      filename = this.props.area.name + ".are";
      this.setFileName(filename);
      storage.uploadNewFile(filename, contents, ()=>(this.finishSave()));
      this.setState({saving: true});
    }
  }
  finishSave() {
    this.setState({saving: false});
  }
  render() {
    return (<FlatButton onClick={(e)=>(this.saveDrive())} label={this.state.saving ? "Saving" : "Save"} />);
  }
}

class LoadFromGoogleDrive extends Component {
  loadDrive() {
    storage.AuthorizeAndPick(function(contents) {
      this.props.onDriveLoad(contents);
      //storage.uploadNewFile(contents.length+".txt", contents + `\nNew Line! (${contents.length})`, console.log);
    });
  }
  render() {
    return (<FlatButton onClick={(e)=>(this.loadDrive())} label="Load from Google Drive" />)
  }
}

export default App;
