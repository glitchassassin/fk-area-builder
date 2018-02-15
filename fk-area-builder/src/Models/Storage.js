import keys from '../keys'

class Storage {
    constructor() {
        this.developerKey = keys.GoogleDrive.developerKey;
        this.clientId = keys.GoogleDrive.clientId;
        this.appId = keys.GoogleDrive.appId;
        this.scope = ['https://www.googleapis.com/auth/drive'];
        this.active_file_id = ""
        this.change_token = null;
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
            window.gapi.load('auth', {'callback': ()=>(this.authApiLoaded = true)});
            window.gapi.load('picker', {'callback': ()=>(this.pickerApiLoaded = true)});
        };
        document.body.appendChild(script);
        
        this.downloaded_callback = (results) => (console.log(results))
    }
    
    reset() {
      this.active_file_id = "";
      this.change_token = null;
    }

    AuthorizeAndPick(callback) {
      if (!this.oauthToken) {
        this.Authorize(this.createFilePicker.bind(this));
      }
      else {
        this.createFilePicker();
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
    createFilePicker() {
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
            .setCallback((data)=>(this.filePickerCallback(data)))
            .build();
         picker.setVisible(true);
      }
    }

    // Create and render a Picker object for searching folders.
    createFolderPicker(callback) {
      if (this.picker_launched) { return; }
      if (!this.oauthToken) {
        this.Authorize(()=>(this.createFolderPicker(callback)));
        return;
      }
      this.picker_launched = true;
      console.log("Launching picker...")
      console.log(this)
      if (this.pickerApiLoaded && this.oauthToken) {
        var view = new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
            .setIncludeFolders(true) 
            .setMimeTypes('application/vnd.google-apps.folder')
            .setSelectFolderEnabled(true)
            .setParent('root');
        var picker = new window.google.picker.PickerBuilder()
            .setAppId(this.appId)
            .setOAuthToken(this.oauthToken)
            .addView(view)
            .setDeveloperKey(this.developerKey)
            .setCallback((data)=>{
              if (data.action === window.google.picker.Action.PICKED) {
                console.log(data);
                if (callback && {}.toString.call(callback) === '[object Function]') {
                  callback(data.docs[0].id);
                }
              }
              this.picker_launched = false;
            })
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    filePickerCallback(data) {
      if (data.action === window.google.picker.Action.PICKED) {
        console.log(data.docs[0]);
        this.downloadFile(data.docs[0].id, (result)=>(this.downloaded_callback(result)));
      }
      this.picker_launched = false;
    }
    
    downloadFile(file_id, callback) {
      if (!this.oauthToken) {
        this.Authorize(()=>(this.downloadFile(file_id, callback)));
        return;
      }
      if (this.isDownloading && {}.toString.call(this.isDownloading) === '[object Function]') {
        this.isDownloading();
      }
      let download_file_id = (file_id === null ? this.active_file_id : file_id);
      if (download_file_id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://www.googleapis.com/drive/v3/files/" + download_file_id + "?alt=media");
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
        console.log(download_file_id);
        xhr.onload = () => {
          this.active_file_id = download_file_id;
          this.storeChangeToken();
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
        
        xhr.onload = () => {
          this.storeChangeToken();
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
    
    didFileChange(callback) {
      if (!this.oauthToken) {
        this.Authorize(()=>(this.getFileChanges(callback)));
        return;
      }
      if (this.active_file_id) {
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', `https://www.googleapis.com/drive/v3/changes?pageToken=${this.change_token}`);
        xhr2.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
        xhr2.onload = () => {
          let response = JSON.parse(xhr2.responseText);
          if (response.changes.filter((o)=>(o.fileId === this.active_file_id)).length > 0) {
            callback(true, response);
          }
          else {
            callback(false, response);
          }
        }
        xhr2.onerror = function() {
          callback(null);
        };
        xhr2.send();
      } else {
        callback(false); // If it's a new file, it obviously hasn't changed.
      }
    }
    
    storeChangeToken() {
      console.log("Getting change token...")
      var xhr = new XMLHttpRequest();
      xhr.open('GET', `https://www.googleapis.com/drive/v3/changes/startPageToken`);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
      xhr.onload = () => {
        console.log(xhr.responseText);
        let response = JSON.parse(xhr.responseText);
        this.change_token = response.startPageToken;
        console.log("Change token stored", this)
      }
      xhr.send()
    }
    
    uploadNewFile(filename, folder, contents, callback) {
      if (!this.oauthToken) {
        this.Authorize(()=>(this.uploadNewFile(filename, folder, contents, callback)));
        return;
      }
      // Get new file ID
      var file_id_xhr = new XMLHttpRequest();
      file_id_xhr.open('GET', `https://www.googleapis.com/drive/v3/files/generateIds?count=1`);
      file_id_xhr.setRequestHeader('Authorization', 'Bearer ' + this.oauthToken);
      file_id_xhr.onload = () => {
        let response = JSON.parse(file_id_xhr.responseText);
        // Now that we have the new file ID, upload the file
        this.active_file_id = response.ids[0];
        var metadata = {
          name: filename,
          id: response.ids[0],
          parents: [folder]
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
        xhr.setRequestHeader('Content-Length', body.length);
        
        xhr.onload = () => {
          this.storeChangeToken();
          callback(xhr.responseText);
        };
        xhr.onerror = function() {
          callback(null);
        };
        xhr.send(body);
      };
      file_id_xhr.onerror = function() {
        callback(null);
      };
      file_id_xhr.send();
    }
}

export default Storage;