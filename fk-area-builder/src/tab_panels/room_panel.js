import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { red900 } from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {equal_recursively} from '../Models/model'
import { connect } from 'react-redux';
import { RoomActions, UiStateActions, ExitActions, DoorResetActions, RoomResetActions } from '../Models/actionTypes';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
}
from 'material-ui/Table';
import {
    EXIT_DIRECTIONS,
    EXIT_DOOR_FLAGS,
    EXIT_SIZES,
    ROOM_FLAGS,
    ROOM_SECTOR_FLAGS,
    ROOM_PROGRAM_TRIGGERS,
    DOOR_RESET_DIRECTIONS,
    DOOR_RESET_FLAGS,
    RESET_BIT_CODES
}
from '../Models/flags';
import {
    Room,
    Exit,
    DoorReset,
    RoomReset
}
from '../Models/area_model'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete
}
from '../UIComponents/FlagSelectors'
import {Validate} from '../UIComponents/GenericEditors'
import {RoomValidator, ExitValidator, DoorResetValidator, RoomResetValidator} from '../Models/model_validator'
import {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor} from '../UIComponents/GenericEditors'
import {ModelComponent, ModelArrayComponent} from '../UIComponents/ModelComponents'
const uuid = require('uuid/v4');

const room_validator = new RoomValidator();
const exit_validator = new ExitValidator();
const door_reset_validator = new DoorResetValidator();
const room_reset_validator = new RoomResetValidator();

const icon_button_style = {
    padding: "5px",
    width: "auto",
    height: "auto",
}

class RoomPanel extends React.Component {
    get_room_by_uuid = (uuid) => {
        let matches = this.props.rooms.filter((room)=>(room.uuid===uuid))
        if (matches.length) {
            return matches[0]
        }
        //throw "No room matching UUID: " + uuid;
    }
    
    generateItems(rooms) {
        return rooms.map((room, index) => (
            <TableRow key={index}>
                <TableRowColumn width={100}>
                    <IconButton tooltip="Edit" onClick={() => (this.props.openEditor(room.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons">mode_edit</FontIcon>
                    </IconButton>
                    <IconButton tooltip="Delete" onClick={()=>(this.props.openConfirmDelete(room.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={red900}>delete_forever</FontIcon>
                    </IconButton>
                    {room_validator.validate_state(this.props.state, room).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={()=>(this.props.openErrors(room.uuid))} style={icon_button_style}>
                        <FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>
                    </IconButton>
                    )}
                </TableRowColumn>
                <TableRowColumn width={100}>{room.vnum}</TableRowColumn>
                <TableRowColumn>{room.sdesc}</TableRowColumn>
                <TableRowColumn>{room.sector ? room.sector.code : ""}</TableRowColumn>
                <TableRowColumn>{room.room_flags ? room.room_flags.map((flag)=>(flag.code)).join("|") : ""}</TableRowColumn>
            </TableRow>
            ))
    }

    render() {
        const confirmActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.cancelDelete}
            />,
            <FlatButton
                label="Delete"
                id={this.props.ui_state.room_current_room} // So confirmDelete can pull the correct uuid
                primary={true}
                onClick={this.props.confirmDelete}
            />,
            ]
        const errorsActions = [
            <FlatButton
                label="Done"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.closeErrors}
            />
            ]
        let room = this.get_room_by_uuid(this.props.ui_state.room_current_room)
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width={100}>Edit</TableHeaderColumn>
                        <TableHeaderColumn width={100}>vnum</TableHeaderColumn>
                        <TableHeaderColumn>Short description</TableHeaderColumn>
                        <TableHeaderColumn>Sector</TableHeaderColumn>
                        <TableHeaderColumn>Room Flags</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.generateItems(this.props.rooms)}
                    <TableRow>
                        <TableRowColumn width={100}>
                            <IconButton tooltip="Add" onClick={this.props.newRoom}>
                                <FontIcon className="material-icons">add_box</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
            { room !== undefined && // Don't bother creating these while we have no rooms.
            <React.Fragment>
                <RoomEditor open={this.props.ui_state.room_editor_open} />
                <Dialog open={this.props.ui_state.room_confirm_delete_open} actions={confirmActions} modal={false} title={`Delete ${room.sdesc}?`}>{`Are you sure you want to delete room ${room.vnum} (${room.sdesc})? You cannot undo this action!`}</Dialog>
                <Dialog open={this.props.ui_state.room_errors_open} actions={errorsActions} modal={false} title={`Room Errors for room ${room.vnum}`}>
                    <List>
                        {room_validator.validate_state(this.props.state, room).map((error, index) => (
                            <ListItem key={index} primaryText={error} leftIcon={<FontIcon className="material-icons" color={this.props.muiTheme.palette.accent1Color}>error</FontIcon>} />
                        ))}
                    </List>
                </Dialog>
            </React.Fragment>
            }
        </div>
        )
    }
}
RoomPanel = connect(
    (state) => ({state: state, rooms: state.rooms, ui_state: state.ui_state}),
    (dispatch) => ({
        newRoom: () => {
            let room_id = uuid();
            dispatch({ type:RoomActions.ADD, value:room_id });
        },
        openEditor: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ROOM_EDITOR });
        },
        closeEditor: () => {dispatch({ type:UiStateActions.CLOSE_ROOM_EDITOR })},
        openErrors: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ROOM_ERRORS });
        },
        closeErrors: () => {dispatch({ type:UiStateActions.CLOSE_ROOM_ERRORS })},
        openConfirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:uuid });
            dispatch({ type:UiStateActions.OPEN_ROOM_CONFIRM_DELETE });
        },
        confirmDelete: (e, v) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:null });
            dispatch({ type:RoomActions.REMOVE, index:e.target.id });
            dispatch({ type:UiStateActions.CLOSE_ROOM_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_ROOM_CONFIRM_DELETE })},
    })
)(RoomPanel)

const paper_style = {
    padding: "5px",
    margin: "5px"
}

class RoomEditor extends ModelComponent {
    modelClass = Room;
    handleChange = (e,v)=>(this.props.setProp(this.props.room.uuid, e.target.id, v))
    render() {
        const actions = [
        <FlatButton label="Done" primary={true} onClick={this.props.handleClose} />,
        ];
        return (
            <Dialog title="Edit Room" modal={false} open={this.props.open} actions={actions} onRequestClose={this.props.handleClose} autoScrollBodyContent={true}>
                <Tabs>
                    <Tab label="Descriptions">
                        <Validate validator={room_validator}>
                        <TextField 
                            floatingLabelText="vnum" 
                            id="vnum" 
                            value={this.props.room.vnum} 
                            autoComplete="off" 
                            onChange={this.handleChange} />
                        <TextField 
                            floatingLabelText="Short description" 
                            id="sdesc" 
                            fullWidth={true} 
                            value={this.props.room.sdesc} 
                            autoComplete="off" 
                            onChange={this.handleChange} />
                        <TextField 
                            floatingLabelText="Long description" 
                            id="ldesc" 
                            multiLine={true} 
                            rows={5} 
                            fullWidth={true} 
                            value={this.props.room.ldesc} 
                            autoComplete="off" 
                            onChange={this.handleChange} />
                        </Validate>
                    </Tab>
                    <Tab label="Details">
                        <Validate validator={room_validator}>
                        <MultiFlagSelector 
                            id="room_flags" 
                            label="Room Flags" 
                            flags={ROOM_FLAGS} 
                            value={this.props.room.room_flags} 
                            onChange={this.handleChange} />
                        <FlagSelector 
                            id="sector" 
                            label="Sector" 
                            flags={ROOM_SECTOR_FLAGS} 
                            value={this.props.room.sector} 
                            onChange={this.handleChange} />
                        <TextField 
                            floatingLabelText="Teleport Delay" 
                            id="teleport_delay" 
                            value={this.props.room.teleport_delay} 
                            autoComplete="off" 
                            onChange={this.handleChange} />
                        <VnumAutoComplete 
                            floatingLabelText="Teleport Target" 
                            id="teleport_target" 
                            value={this.props.room.teleport_target} 
                            onChange={this.handleChange} 
                            dataSource={this.props.rooms} />
                        <TextField 
                            floatingLabelText="Room Capacity [Tunnel]" 
                            id="tunnel" 
                            value={this.props.room.tunnel} 
                            autoComplete="off" 
                            onChange={this.handleChange} />
                        </Validate>
                    </Tab>
                    <Tab label="Extra Descs">
                        <ExtraDescriptionsEditor 
                            id="extra_descriptions" 
                            pointer={this.props.room.uuid} />
                    </Tab>
                    <Tab label="Exits">
                        <ExitsEditor 
                            id="exits" 
                            pointer={this.props.room.uuid} />
                    </Tab>
                    <Tab label="Programs">
                        <ProgramsEditor 
                            id="programs" 
                            pointer={this.props.room.uuid}
                            triggers={ROOM_PROGRAM_TRIGGERS} />
                    </Tab>
                    <Tab label="Resets">
                        <Subheader>Room Resets</Subheader>
                        <RoomResetsEditor 
                            id="room_resets" 
                            vnum={this.props.room.vnum} />
                        <Subheader>Door Resets</Subheader>
                        <DoorResetsEditor 
                            id="door_resets" 
                            vnum={this.props.room.vnum} />
                    </Tab>
                </Tabs>
            </Dialog>  
        )
    }
}
RoomEditor = connect(
    (state)=>({
        room: (state.rooms.filter((room)=>(room.uuid===state.ui_state.room_current_room)))[0],
        rooms: state.rooms,
        ui_state: state.ui_state
    }),
    (dispatch)=>({
        handleClose: () => {dispatch({ type:UiStateActions.CLOSE_ROOM_EDITOR })},
        setProp: (index, key, value) => {dispatch({ type:RoomActions.SET_PROP, index, key, value })},
    })
)(RoomEditor)

class ExitsEditor extends React.Component {
    generate() {
        return this.props.exits.filter((e)=>(e.room===this.props.pointer)).map((exit, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(exit.uuid))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={exit_validator}>
                <FlagSelector 
                    id="direction" 
                    label="Direction" 
                    flags={EXIT_DIRECTIONS} 
                    value={exit.direction} 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText="Comment" 
                    id="comment"
                    fullWidth={true} 
                    value={exit.comment} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                <TextField 
                    floatingLabelText={exit.direction === EXIT_DIRECTIONS.DDIR_SOMEWHERE ? "Somewhere exit keywords" : "Door keywords"} 
                    id="somewhere_door_keyword" 
                    fullWidth={true} 
                    value={exit.somewhere_door_keyword} 
                    autoComplete="off" 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                <MultiFlagSelector 
                    id="door_flags" 
                    label="Door Flags" 
                    flags={EXIT_DOOR_FLAGS} 
                    value={exit.door_flags} 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                <VnumAutoComplete 
                    floatingLabelText="Door Key" 
                    id="door_key" 
                    value={exit.door_key} 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} 
                    dataSource={this.props.items} />
                <VnumAutoComplete 
                    floatingLabelText="Exit Target" 
                    id="target_vnum" 
                    value={exit.target_vnum} 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} 
                    dataSource={this.props.rooms} />
                <FlagSelector 
                    id="exit_size" 
                    label="Exit Size" 
                    flags={EXIT_SIZES} 
                    value={exit.exit_size} 
                    onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                </Validate>
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}
ExitsEditor = connect(
    (state)=>({
        exits: state.exits,
        rooms: state.rooms,
        items: state.items
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:ExitActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:ExitActions.REMOVE, index })},
        handleNew: (pointer) => {
            dispatch({ type:ExitActions.ADD })
            dispatch({ type:ExitActions.SET_PROP, key:"pointer", value:pointer })
        }
    })
)(ExitsEditor)

class DoorResetsEditor extends React.Component {
    modelClass = DoorReset;
    generate() {
        return this.props.door_resets.filter((r)=>(r.room===this.props.vnum)).map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={door_reset_validator}>
                <FlagSelector 
                    id="exit" 
                    label="Exit" 
                    flags={DOOR_RESET_DIRECTIONS} 
                    value={reset.exit} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="exit_state" 
                    label="Exit State" 
                    flags={DOOR_RESET_FLAGS} 
                    value={reset.exit_state} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                </Validate>
                <TrapResetEditor 
                    id="trap_reset" 
                    pointer={reset.uuid} />
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}
DoorResetsEditor = connect(
    (state)=>({
        door_resets: state.door_resets,
        rooms: state.rooms,
        items: state.items
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:DoorResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:DoorResetActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:DoorResetActions.ADD })
            dispatch({ type:DoorResetActions.SET_PROP, key:"room", value:vnum })
        }
    })
)(DoorResetsEditor)

class RoomResetsEditor extends React.Component {
    modelClass = RoomReset;
    generate() {
        return this.props.room_resets.filter(r=>(r.room===this.props.vnum)).map((reset, index) => (
            <Paper style={paper_style} zDepth={1} key={index}>
                <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                    <FontIcon className="material-icons" color={red900}>remove_circle</FontIcon>
                </IconButton>
                <Validate validator={room_reset_validator}>
                <FlagSelector 
                    id="bit_type" 
                    label="Reset Bit" 
                    flags={RESET_BIT_CODES} 
                    value={reset.bit_type} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                <FlagSelector 
                    id="flag" 
                    label="Room Flag" 
                    flags={ROOM_FLAGS} 
                    value={reset.flag} 
                    onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                </Validate>
            </Paper>
        ));
    }
    render() {
        return (
            <React.Fragment>
                {this.generate()}
                <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                    <FontIcon className="material-icons">add_box</FontIcon>
                </IconButton>
            </React.Fragment>
        )
    }
}
RoomResetsEditor = connect(
    (state)=>({
        room_resets: state.room_resets
    }),
    (dispatch) => ({
        setProp: (index, key, value) => {dispatch({ type:RoomResetActions.SET_PROP, index, key, value})},
        handleDelete: (index) => {dispatch({ type:RoomResetActions.REMOVE, index })},
        handleNew: (vnum) => {
            dispatch({ type:RoomResetActions.ADD })
            dispatch({ type:RoomResetActions.SET_PROP, key:"room", value:vnum })
        }
    })
)(RoomResetsEditor)

export default muiThemeable()(RoomPanel);