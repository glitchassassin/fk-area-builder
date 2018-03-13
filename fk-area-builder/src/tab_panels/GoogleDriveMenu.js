import React from 'react';
import Storage from '../Models/Storage';
import AreaExporter from '../Models/are_export';
import Popover from 'material-ui/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';

var area_exporter = new AreaExporter();

class GoogleDriveMenu extends React.Component {
    state = {
        error_open: false,
        error_text: "",
        confirm_open: false,
        confirm_text: "",
        saving: false,
        file_active: false,
    }
    storage = new Storage()
    closeErrors = () => (this.setState({error_open:false}))
    displayError = (error_text) => (this.setState({error_text:error_text, error_open:true}))
    
    newArea() {
        this.props.closeMenu();
        this.props.onNew();
        this.setState({file_active:false})
        this.storage.reset();
    }
    saveDrive() {
        this.props.closeMenu();
        
        if (this.props.validator.validate(this.props.area).length > 0) {
            this.displayError("Cannot save area with errors!")
            console.log(this.props.validator.validate(this.props.area))
            return;
        }
        this.props.setStatus(<IconButton id="loading" tooltip="Loading"><CircularProgress color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>);
        this.storage.didFileChange((changed)=>{
            if (changed) {
                this.setState({confirm_open:true})
                return;
            }
            // Has not changed on disk - commit changes.
            this.forceSaveDrive()
        })
    }
    saveAsDrive() {
        this.props.closeMenu();
        
        if (this.props.validator.validate(this.props.area).length > 0) {
            this.displayError("Cannot save area with errors!")
            console.log(this.props.validator.validate(this.props.area))
            return;
        }
        this.storage.createFolderPicker((folder)=>{
            let filename = this.props.area.name + ".are"; // Should eventually prompt to select a file/location, but this works temporarily
            console.log("Saving new file", filename, folder);
            let contents = area_exporter.renderArea(this.props.area);
            this.storage.uploadNewFile(filename, folder, contents, ()=>(this.finishSave()));
            this.props.setStatus(<IconButton id="loading" tooltip="Saving"><CircularProgress color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>)
            this.setState({saving: true});
        })
    }
    forceSaveDrive() {
        if (this.props.validator.validate(this.props.area).length > 0) {
            this.displayError("Cannot save area with errors!")
            console.log(this.props.validator.validate(this.props.area))
            return;
        }
        this.props.setStatus(<IconButton id="loading" tooltip="Loading"><CircularProgress color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>);
        let contents = area_exporter.renderArea(this.props.area);
        if (this.storage.active_file_id !== "") {
            this.storage.updateCurrentFile(contents, ()=>(this.finishSave()));
        }
    }
    loadDrive() {
        this.props.closeMenu();
        this.storage.downloaded_callback = (contents) => {
            this.finishLoad(contents);
        }
        this.storage.isDownloading = ()=>{
            this.props.setStatus(<IconButton id="loading" tooltip="Loading"><CircularProgress color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>);
        }
        this.storage.AuthorizeAndPick();
    }
    reloadDrive() {
        this.storage.downloadFile(null,(contents) => {
            this.finishLoad(contents);
        });
        this.props.setStatus(<IconButton id="loading" tooltip="Loading"><CircularProgress color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>)
    }
    closeConfirm(callback) {
        this.setState({confirm_open: false})
        if (callback) {
            callback()
        }
    }
    finishSave() {
        this.props.onFileLoad();
        this.setState({file_active: true});
        this.props.setStatus(<IconButton id="saved" tooltip="No unsaved changes"><Check color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>)
    }
    finishLoad(contents) {
        try {
            this.props.onFileLoad(contents);
        } catch (e) {
            this.displayError("Unable to parse area file.");
            console.trace();
            console.log(e);
        }
        this.props.setStatus(<IconButton id="saved" tooltip="No unsaved changes"><Check color={this.props.muiTheme.palette.alternateTextColor} /></IconButton>)
    }
    
    render() {
        return (
            <React.Fragment>
                <Popover
                    open={this.props.open}
                    anchorEl={this.props.anchor}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.props.closeMenu} >
                    <Menu>
                        <MenuItem onClick={(e)=>(this.newArea())} primaryText="New" />
                        <Divider/>
                        <MenuItem onClick={(e)=>(this.saveDrive())} primaryText="Save" disabled={this.storage.active_file_id === ""} />
                        <MenuItem onClick={(e)=>(this.saveAsDrive())} primaryText="Save As..." />
                        <MenuItem onClick={(e)=>(this.loadDrive())} primaryText="Load" />
                    </Menu>
                </Popover>
                <Dialog 
                    open={this.state.error_open} 
                    actions={<FlatButton label="Okay" primary={true} keyboardFocused={true} onClick={this.closeErrors} />}
                    modal={false} 
                    title={"Error"}>
                        {this.state.error_text}
                </Dialog>
                <Dialog 
                    open={this.state.confirm_open} 
                    actions={[
                        <FlatButton label="Discard local" primary={true} keyboardFocused={true} onClick={()=>(this.closeConfirm(this.reloadDrive.bind(this)))} />,
                        <FlatButton label="Overwrite Drive" primary={true} keyboardFocused={true} onClick={()=>(this.closeConfirm(this.forceSaveDrive.bind(this)))} />]}
                    modal={false} 
                    title={"Error"}>
                        Area file has changed on Google Drive. Discard local changes and reload from Drive, or save and overwrite the Drive version?
                </Dialog>
            </React.Fragment>
        );
    }
}

export default muiThemeable()(GoogleDriveMenu);