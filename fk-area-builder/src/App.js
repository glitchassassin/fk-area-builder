import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainFrame from './main_frame';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Area} from './Models/are_model';
import Loader from './Models/loader';
import GoogleDriveMenu from './tab_panels/GoogleDriveMenu';
import Warning from 'material-ui/svg-icons/alert/warning';
import muiThemeable from 'material-ui/styles/muiThemeable';

//console.log(Storage);

class App extends Component {
  state = {
    area: new Area(),
    error_open: false,
    error_text: ""
  }
  updateAreaState(area) {
      this.setState({area});
  }
  render() {
    let title = "Forgotten Kingdoms Area Builder" + (this.state.area.name ? " | " + this.state.area.name : "");
    return (
      <MuiThemeProvider>
        <div className="App">
          <ThemedAppHeader title={title} area={this.state.area} updateAreaState={this.updateAreaState.bind(this)} openErrors={this.openErrors}/>
          <div className="App-intro">
              <MainFrame area={this.state.area} updateAreaState={this.updateAreaState.bind(this)} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

class AppHeader extends Component {
  state = {
    loaded: false,
    menuOpen: false,
    menuAnchor: null,
    status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Warning color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.area !== this.state.area) {
      this.setState({ status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Warning color={this.props.muiTheme.palette.alternateTextColor} /></IconButton> });
    }
  }
  componentDidMount() {
    window.onbeforeunload = (e) => {
      console.log(this.state.status);
      if (this.state.status.props.id != "saved") {
        let warning = "You have unsaved changes. Discard?"; // Browser isn't actually required to show this - 
        e.returnValue = warning;                            // may just give a generic warning
        return warning;
      }
    }
  }
  
  onDriveLoad = (contents) => {
    if (contents) {
      this.props.updateAreaState(new Loader(contents).area);
    }
  }
  clearArea = ()=>(this.props.updateAreaState(new Area()))
  
  setStatus = (icon) => (this.setState({status: icon}));
  openMenu = (event) => (this.setState({menuOpen: true, menuAnchor: event.currentTarget}))
  closeMenu = () => (this.setState({menuOpen: false}))
  
  render() {
    return (
      <AppBar
        title={this.props.title}
        onLeftIconButtonClick={this.openMenu} 
        iconElementRight={<span>{this.state.status}</span>}>
        <GoogleDriveMenu 
          open={this.state.menuOpen}
          area={this.props.area}
          setStatus={this.setStatus}
          onFileLoad={this.onDriveLoad} 
          closeMenu={this.closeMenu}
          onNew={this.clearArea}
          anchor={this.state.menuAnchor} />
      </AppBar>
    );
  }
}

var ThemedAppHeader = muiThemeable()(AppHeader)

export default App;
