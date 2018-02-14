import React, { Component } from 'react';
import Storage from './Storage';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainFrame from './main_frame';
import SvgIcon from 'material-ui/SvgIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Area} from './Models/are_model';
import Loader from './Models/loader';

//console.log(Storage);
var storage = new Storage();

class App extends Component {
  state = {
    area: new Area(),
    error_open: false,
    error_text: ""
  }
  updateAreaState(area) {
      this.setState({area});
  }
  closeErrors = () => (this.setState({error_open:false}))
  openErrors = (error_text) => (this.setState({error_text:error_text, error_open:true}))
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppHeader title="Forgotten Kingdoms Area Builder" area={this.state.area} updateAreaState={this.updateAreaState.bind(this)} openErrors={this.openErrors}/>
          <div className="App-intro">
              <MainFrame area={this.state.area} updateAreaState={this.updateAreaState.bind(this)} />
          </div>
        </div>
        <Dialog open={this.state.error_open} actions={<FlatButton label="Okay" primary={true} keyboardFocused={true} onClick={this.closeErrors} />} modal={false} title={"Error"}>{this.state.error_text}</Dialog>
      </MuiThemeProvider>
    );
  }
}

class AppHeader extends Component {
  state = {
    loaded: false,
  };
  
  onDriveLoad = (contents) => {
    this.props.updateAreaState(new Loader(contents).area);
    this.setState({loaded: true});
  }

  render() {
    return (
      <AppBar
        title={this.props.title}
        iconElementRight={this.state.loaded ? 
          (<Save area={this.props.area} file={this.state.file} setFileName={this.setFileName} openErrors={this.props.openErrors} />) :
          (<React.Fragment>
            <Save area={this.props.area} file={this.state.file} setFileName={this.setFileName} openErrors={this.props.openErrors} />
            &nbsp;
            <LoadFromGoogleDrive onDriveLoad={this.onDriveLoad} openErrors={this.props.openErrors} />
          </React.Fragment>)}
      />
    );
  }
}

class Save extends Component {
  state = {
    saving: false
  }
  saveDrive() {
    if (this.props.area.validate().length > 0) {
      this.props.openErrors("Cannot save area with errors!")
      return;
    }
    let contents = this.props.area.toString();
    var filename;
    if (storage.active_file_id == "") {
      filename = this.props.area.name + ".are"; // Should eventually prompt to select a file/location, but this works temporarily
      console.log("Saving new file", filename);
      storage.uploadNewFile(filename, contents, ()=>(this.finishSave()));
      this.setState({saving: true});
    }
    else {
      console.log("Updating current file");
      storage.updateCurrentFile(contents, ()=>(this.finishSave()));
    }
  }
  finishSave() {
    this.setState({saving: false});
  }
  render() {
    return (<RaisedButton primary={true} onClick={(e)=>(this.saveDrive())} label={this.state.saving ? "Saving" : "Save to Drive"} />);
  }
}

class LoadFromGoogleDrive extends Component {
  state = {
    loading: false
  }
  loadDrive() {
    storage.AuthorizeAndPick((contents) => {
      this.props.onDriveLoad(contents);
    });
    this.setState({loading:true});
  }
  render() {
    return (<RaisedButton primary={true} onClick={(e)=>(this.loadDrive())} label={this.state.loading ? "Loading..." : "Load from Drive"} />)
  }
}

export default App;
