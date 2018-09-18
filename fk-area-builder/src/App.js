import React, { Component } from 'react';
import './App.css';
import MainFrame from './main_frame';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import populateArea from './Models/loader';
import GoogleDriveMenu from './tab_panels/GoogleDriveMenu';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { GlobalActions } from './Models/actionTypes';
import CssBaseline from '@material-ui/core/CssBaseline';

console.log("MainFrame:", MainFrame)

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#c7a4ff',
      main: '#9575cd',
      dark: '#512da8',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#fff',
    },
    error: {
      main: "#f4511e"
    }
  }
});
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop:"64px"
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: "64px"
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <ThemedAppHeader />
          <div className="App-intro">
              <MainFrame />
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
    status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Icon style={{color:this.props.theme.palette.primary.contrastText}}>warning</Icon></IconButton>
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      this.setState({ status: <IconButton id="unsaved" tooltip="Unsaved Changes"><Icon style={{color:this.props.theme.palette.primary.contrastText}}>warning</Icon></IconButton> });
    }
  }
  componentDidMount() {
    window.onbeforeunload = (e) => {
      if (this.state.status.props.id !== "saved") {
        let warning = "You have unsaved changes. Discard?"; // Browser isn't actually required to show this - 
        e.returnValue = warning;                            // may just give a generic warning
        return warning;
      }
    }
    //this.props.loadArea(testArea)
  }
  
  setStatus = (icon) => (this.setState({status: icon}));
  openMenu = (event) => (this.setState({menuOpen: true, menuAnchor: event.currentTarget}))
  closeMenu = () => (this.setState({menuOpen: false}))
  
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="fixed" classes={{root:this.props.classes.appBar}}>
          <Toolbar>
            <IconButton onClick={this.openMenu} color="inherit" aria-label="Menu" className={this.props.classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <GoogleDriveMenu 
              open={this.state.menuOpen}
              setStatus={this.setStatus}
              onFileLoad={this.props.loadArea} 
              closeMenu={this.closeMenu}
              onNew={this.props.newArea}
              anchor={this.state.menuAnchor} />
            <Typography variant="title" color="inherit" align="center" className={this.props.classes.flex}>
              {"Forgotten Kingdoms Area Builder" + (this.props.title ? " | " + this.props.title : "")}
            </Typography>
            {this.state.status}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
AppHeader = connect(
  (state) => {
    return {
      state: state,
      title: state.area.name
    };
  },
  (dispatch) => {
    return {
      newArea: ()=>{
        dispatch({ type: GlobalActions.NEW })
      },
      loadArea: (area)=>{
        if (area) {
          populateArea(area, dispatch);
        }
      }
    }
  }
)(AppHeader);

var ThemedAppHeader = withStyles(styles)(withTheme()(AppHeader));

export default App;