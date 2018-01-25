import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Dropbox } from 'dropbox';

var CLIENT_ID = 'qvp7dr49kmtfozw';

class App extends Component {
  render() {
    // Parses the url and gets the access token if it is in the urls hash
    function getAccessTokenFromUrl() {
     return parseQueryString(window.location.hash).access_token;
    }
    // If the user was just redirected from authenticating, the urls hash will
    // contain the access token.
    function isAuthenticated() {
      return !!getAccessTokenFromUrl();
    }
    // Render a list of items to #files
    function renderItems(items) {
      var filesContainer = document.getElementById('files');
      items.forEach(function(item) {
        var li = document.createElement('li');
        li.innerHTML = item.name;
        filesContainer.appendChild(li);
      });
    }
    if (isAuthenticated()) {
      var dropbox_segment = (
          <div id="authed-section">
            <p>You have successfully authenticated. Below are the contents of your root directory. They were fetched using the SDK and access token.</p>
            <ul id="files"></ul>
          </div>);
      // Create an instance of Dropbox with the access token and use it to
      // fetch and render the files in the users root directory.
      var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
      dbx.filesListFolder({path: ''})
        .then(function(response) {
          renderItems(response.entries);
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      // Set the login anchors href using dbx.getAuthenticationUrl()
      var dbx = new Dropbox({ clientId: CLIENT_ID });
      var authUrl = dbx.getAuthenticationUrl('https://fk-area-builder-glitchassassin.c9users.io/');
      
      var dropbox_segment = (
          <div id="pre-auth-section">
            <p>This example takes the user through Dropbox's API OAuth flow using <code>Dropbox.getAuthenticationUrl()</code> method [<a href="http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#getAuthenticationUrl">docs</a>] and then uses the generated access token to list the contents of their root directory.</p>
            <a href={authUrl} id="authlink" class="button">Authenticate</a>
            <p class="info">Once authenticated, it will use the access token to list the files in your root directory.</p>
          </div>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Forgotten Kingdoms Area Builder</h1>
        </header>
        <p className="App-intro">
          {dropbox_segment}
        </p>
      </div>
    );
  }
  
  
}

function parseQueryString(str) {
  var ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}

export default App;
