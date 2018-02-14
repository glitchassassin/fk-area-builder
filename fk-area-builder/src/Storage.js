import keys from './keys'

class Storage {
    constructor() {
        this.developerKey = keys.GoogleDrive.developerKey;
        this.clientId = keys.GoogleDrive.clientId;
        this.appId = keys.GoogleDrive.appId;
        this.scope = ['https://www.googleapis.com/auth/drive'];
        this.active_file_id = ""
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
            window.gapi.load('auth', {'callback': ()=>(this.authApiLoaded = true)});
            window.gapi.load('picker', {'callback': ()=>(this.pickerApiLoaded = true)});
        };
        document.body.appendChild(script);
        
        this.downloaded_callback = (results) => (console.log(results))
    }

    AuthorizeAndPick(callback) {
      if (!this.oauthToken) {
        this.Authorize(this.createPicker);
      }
      else {
        this.createPicker();
      }
      if (callback && {}.toString.call(callback) === '[object Function]') {
        this.downloaded_callback = callback;
      }
    }
    
    Authorize(callback) {
      window.gapi.auth.authorize(
        {
          'client_id': this.clientId,
          'scope': this.scope,
          'immediate': false
        },
        (authResult) => (this.handleAuthResult(authResult, callback)));
    }

    handleAuthResult(authResult, callback) {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        callback();
      }
    }

    // Create and render a Picker object for searching files.
    createPicker() {
      if (this.picker_launched) { return; }
      this.picker_launched = true;
      console.log("Launching picker...")
      console.log(this)
      if (this.pickerApiLoaded && this.oauthToken) {
        var view = new window.google.picker.DocsView().setIncludeFolders(true).setParent('root');
        var picker = new window.google.picker.PickerBuilder()
            .setAppId(this.appId)
            .setOAuthToken(this.oauthToken)
            .addView(view)
            .addView(new window.google.picker.DocsUploadView())
            .setDeveloperKey(this.developerKey)
            .setCallback((data)=>(this.pickerCallback(data)))
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    pickerCallback(data) {
      if (data.action === window.google.picker.Action.PICKED) {
        console.log(data.docs[0]);
        this.downloadFile(data.docs[0].id, (result)=>(this.downloaded_callback(result)));
      }
      this.picker_launched = false;
    }
    
    downloadFile(file_id, callback) {
      var that = this;
      if (!this.oauthToken) {
        this.Authorize(()=>(this.downloadFile(file_id, callback)));
        return;
      }
      if (file_id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://www.googleapis.com/drive/v3/files/" + file_id + "?alt=media");
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
        console.log(file_id);
        xhr.onload = function() {
          console.log(file_id);
          that.active_file_id = file_id;
          callback(xhr.responseText);
        };
        xhr.onerror = function() {
          callback(null);
        };
        xhr.send();
      } else {
        callback(null);
      }
    }
    
    updateCurrentFile(contents, callback) {
      if (!this.oauthToken) {
        this.Authorize(()=>(this.updateCurrentFile(contents, callback)));
        return;
      }
      if (this.active_file_id) {
        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', `https://www.googleapis.com/upload/drive/v3/files/${this.active_file_id}?uploadType=media`);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
        //xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=foo_bar_baz');
        //xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=foo_bar_baz');
        xhr.setRequestHeader('Content-Length', contents.length);
        
        xhr.onload = function() {
          callback(xhr.responseText);
        };
        xhr.onerror = function() {
          callback(null);
        };
        xhr.send(contents);
      } else {
        callback(null);
      }
    }
    
    uploadNewFile(filename, contents, callback) {
      if (!this.oauthToken) {
        this.Authorize(()=>(this.uploadNewFile(filename, contents, callback)));
        return;
      }
      var metadata = {
        name: filename
      }
      var body = `--foo_bar_baz
Content-Type: application/json; charset=UTF-8

${JSON.stringify(metadata)}

--foo_bar_baz
Content-Type: text/plain

${contents}
--foo_bar_baz--`;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', `https://www.googleapis.com/upload/drive/v3/files/?uploadType=multipart`);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
      xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=foo_bar_baz');
      //xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=foo_bar_baz');
      xhr.setRequestHeader('Content-Length', body.length);
      
      xhr.onload = function() {
        callback(xhr.responseText);
      };
      xhr.onerror = function() {
        callback(null);
      };
      xhr.send(body);
    }
}

export default Storage;