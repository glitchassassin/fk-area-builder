import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, {ListItem} from 'material-ui/List';
import Dialog, {DialogContent, DialogActions, DialogTitle, DialogContentText} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import ListSubheader from 'material-ui/List/ListSubheader';
import withTheme from 'material-ui/styles/withTheme';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ColorCodeEditor } from '../UIComponents/QuillEditor';
import { RoomActions, UiStateActions, ExitActions, DoorResetActions, RoomResetActions } from '../Models/actionTypes';

import Table, {
    TableBody,
    TableHead,
    TableRow,
    TableCell,
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
    DoorReset,
    RoomReset,
    vnum_sort
}
from '../Models/model_templates'
import {
    FlagSelector,
    MultiFlagSelector,
    VnumAutoComplete,
    ValidatedTextField
}
from '../UIComponents/FlagSelectors'
import {Validate} from '../UIComponents/GenericEditors'
import {RoomValidator, ExitValidator, DoorResetValidator, RoomResetValidator} from '../Models/model_validator'
import {TrapResetEditor, ExtraDescriptionsEditor, ProgramsEditor, EditorDialog} from '../UIComponents/GenericEditors'
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
        return rooms.sort(vnum_sort).map((room, index) => (
            <TableRow key={index} hover onClick={() => (this.props.openEditor(room.uuid))}>
                <TableCell padding="dense" width={"100px"}>
                    <IconButton tooltip="Delete" onClick={(e)=>{e.stopPropagation(); this.props.openConfirmDelete(room.uuid)}} style={icon_button_style}>
                        <Icon color="error">delete_forever</Icon>
                    </IconButton>
                    {room_validator.validate_state(this.props.state, room).length > 0 && (
                    <IconButton tooltip="Show Errors" onClick={(e)=>{e.stopPropagation(); this.props.openErrors(room.uuid)}} style={icon_button_style}>
                        <Icon color="primary">error</Icon>
                    </IconButton>
                    )}
                </TableCell>
                <TableCell padding="dense">{room.vnum}</TableCell>
                <TableCell padding="dense" width={"50%"}>{room.sdesc}</TableCell>
                <TableCell padding="dense">{room.sector ? room.sector.code : ""}</TableCell>
                <TableCell padding="dense">{room.room_flags ? room.room_flags.map((flag)=>(flag.code)).join("|") : ""}</TableCell>
            </TableRow>
            ))
    }

    render() {
        let room = this.get_room_by_uuid(this.props.ui_state.room_current_room)
        return (
            <div>
            <Table padding="dense">
                <TableHead>
                    <TableRow>
                        <TableCell padding="dense" width={"120px"}></TableCell>
                        <TableCell padding="dense">vnum</TableCell>
                        <TableCell padding="dense" width={"50%"}>Short description</TableCell>
                        <TableCell padding="dense">Sector</TableCell>
                        <TableCell padding="dense">Room Flags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.generateItems(this.props.rooms)}
                    <TableRow>
                        <TableCell padding="dense">
                            <IconButton tooltip="Add" onClick={this.props.newRoom}>
                                <Icon>add_box</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            { room !== undefined && // Don't bother creating these while we have no rooms.
            <React.Fragment>
                <RoomEditor open={this.props.ui_state.room_editor_open} />
                <Dialog
                    open={this.props.ui_state.room_confirm_delete_open}
                    onClose={this.props.cancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{`Delete ${room.sdesc}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Are you sure you want to delete room ${room.vnum} (${room.sdesc})? You cannot undo this action!`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            autoFocus
                            onClick={this.props.cancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            color={"primary"}
                            onClick={()=>(this.props.confirmDelete(this.props.ui_state.room_current_room))}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.props.ui_state.room_errors_open}
                    onClose={this.props.closeErrors}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{`Room Errors for room ${room.vnum}`}</DialogTitle>
                    <DialogContent>
                        <List>
                            {room_validator.validate_state(this.props.state, room).map((error, index) => (
                                <ListItem key={index} primaryText={error} leftIcon={<Icon color="primary">error</Icon>} />
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.props.closeErrors}
                            autoFocus>
                            Done
                        </Button>
                    </DialogActions>
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
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:room_id });
            dispatch({ type:UiStateActions.OPEN_ROOM_EDITOR });
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
        confirmDelete: (uuid) => {
            dispatch({ type:UiStateActions.SET_CURRENT_ROOM, value:null });
            dispatch({ type:RoomActions.REMOVE, index:uuid });
            dispatch({ type:UiStateActions.CLOSE_ROOM_CONFIRM_DELETE });
        },
        cancelDelete: () => {dispatch({ type:UiStateActions.CLOSE_ROOM_CONFIRM_DELETE })},
    })
)(RoomPanel)

const paper_style = theme => ({
    paper: {
        padding: "5px",
        margin: "5px",
        backgroundColor: theme.palette.secondary.main
    }
})

class RoomEditor extends React.Component {
    handleChange = (e,v)=>(this.props.setProp(this.props.room.uuid, e.target.id, v))
    render() {
        return (
            <EditorDialog 
                open={this.props.ui_state.room_editor_open} 
                onClose={this.props.handleClose}
                title={"Edit Room"}
                selected_tab={this.props.ui_state.room_current_tab}
                setTab={this.props.setTab}
                tabs={["Room","Extra Descs","Exits","Programs","Resets"]}>
                <Validate validator={room_validator}>
                    {this.props.ui_state.room_current_tab === 0 && 
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ListSubheader>Descriptions</ListSubheader>
                        </Grid>
                        <Grid item xs={3}>
                            <ValidatedTextField 
                                label="vnum" 
                                id="vnum" 
                                fullWidth={true} 
                                value={this.props.room.vnum} 
                                autoComplete="off" 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={9}>
                            <ColorCodeEditor 
                                label="Short description" 
                                id="sdesc" 
                                value={this.props.room.sdesc} 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <ColorCodeEditor 
                                label="Long description" 
                                id="ldesc" 
                                rows={5} 
                                value={this.props.room.ldesc} 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <ListSubheader>Details</ListSubheader>
                        </Grid>
                        <Grid item xs={9}>
                            <MultiFlagSelector 
                                id="room_flags" 
                                label="Room Flags" 
                                flags={ROOM_FLAGS} 
                                value={this.props.room.room_flags} 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={3}>
                            <FlagSelector 
                                id="sector" 
                                label="Sector" 
                                flags={ROOM_SECTOR_FLAGS} 
                                value={this.props.room.sector} 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <ValidatedTextField 
                                label="Teleport Delay" 
                                id="teleport_delay" 
                                value={this.props.room.teleport_delay} 
                                autoComplete="off" 
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <VnumAutoComplete 
                                label="Teleport Target" 
                                id="teleport_target" 
                                value={this.props.room.teleport_target} 
                                onChange={this.handleChange} 
                                dataSource={this.props.rooms} />
                        </Grid>
                        <Grid item xs={4}>
                            <ValidatedTextField 
                                label="Room Capacity [Tunnel]" 
                                id="tunnel" 
                                value={this.props.room.tunnel} 
                                autoComplete="off" 
                                onChange={this.handleChange} />
                        </Grid>
                    </Grid>}
                    {this.props.ui_state.room_current_tab === 1 && 
                    <Grid container spacing={8}>
                        <ExtraDescriptionsEditor 
                            id="extra_descriptions" 
                            pointer={this.props.room.uuid} />
                    </Grid>}
                    {this.props.ui_state.room_current_tab === 2 && 
                    <Grid container spacing={8}>
                        <ExitsEditor 
                            id="exits" 
                            pointer={this.props.room.uuid} />
                    </Grid>}
                    {this.props.ui_state.room_current_tab === 3 && 
                    <Grid container spacing={8}>
                        <ProgramsEditor 
                            id="programs" 
                            pointer={this.props.room.uuid}
                            triggers={ROOM_PROGRAM_TRIGGERS} />
                    </Grid>}
                    {this.props.ui_state.room_current_tab === 4 && 
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <ListSubheader>Room Resets</ListSubheader>
                        </Grid>
                        <RoomResetsEditor 
                            id="room_resets" 
                            vnum={this.props.room.vnum} />
                        <Grid item xs={12}>
                            <ListSubheader>Door Resets</ListSubheader>
                        </Grid>
                        <DoorResetsEditor 
                            id="door_resets" 
                            vnum={this.props.room.vnum} />
                    </Grid>}
                </Validate>
            </EditorDialog>  
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
        setTab: (e, index) => {
            dispatch({type:UiStateActions.SET_ROOM_CURRENT_TAB, value:index})
        }
    })
)(RoomEditor)

class ExitsEditor extends React.Component {
    generate() {
        console.log(this.props.exits)
        return this.props.exits.filter((e)=>(e.room===this.props.pointer)).map((exit, index) => (
            <Grid item key={index} xs={12}>
            <Paper classes={{root:this.props.classes.paper}}>
                <Grid container spacing={8}>
                    <Grid item xs={2}>
                    <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(exit.uuid))}>
                        <Icon color="error">remove_circle</Icon>
                    </IconButton>
                    </Grid>
                    <Validate validator={exit_validator}>
                    <Grid item xs={10}>
                        <FlagSelector 
                            id="direction" 
                            label="Direction" 
                            flags={EXIT_DIRECTIONS} 
                            value={exit.direction} 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={12}>
                        <ValidatedTextField 
                            label="Comment" 
                            id="comment"
                            fullWidth={true} 
                            value={exit.comment} 
                            autoComplete="off" 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <ValidatedTextField 
                            label={exit.direction === EXIT_DIRECTIONS.DDIR_SOMEWHERE ? "Somewhere exit keywords" : "Door keywords"}
                            id="somewhere_door_keyword"
                            fullWidth={true}
                            value={exit.somewhere_door_keyword}
                            autoComplete="off"
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <MultiFlagSelector 
                            id="door_flags" 
                            label="Door Flags" 
                            flags={EXIT_DOOR_FLAGS} 
                            value={exit.door_flags} 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <VnumAutoComplete 
                            label="Door Key" 
                            id="door_key" 
                            value={exit.door_key} 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} 
                            dataSource={this.props.items} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <VnumAutoComplete 
                            label="Exit Target" 
                            id="target_vnum" 
                            value={exit.target_vnum} 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} 
                            dataSource={this.props.rooms} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FlagSelector 
                            id="exit_size" 
                            label="Exit Size" 
                            flags={EXIT_SIZES} 
                            value={exit.exit_size} 
                            onChange={(e,v)=>(this.props.setProp(exit.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={16}>
                {this.generate()}
                <Grid item xs={1}>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.pointer))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}
ExitsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
ExitsEditor = withStyles(paper_style)(connect(
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
)(ExitsEditor))

class DoorResetsEditor extends React.Component {
    modelClass = DoorReset;
    generate() {
        return this.props.door_resets.filter((r)=>(r.room===this.props.vnum)).map((reset, index) => (
            <Grid item xs={12} key={index}>
            <Paper classes={{root:this.props.classes.paper}}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={1}>
                        <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                            <Icon color="error">remove_circle</Icon>
                        </IconButton>
                    </Grid>
                    <Validate validator={door_reset_validator}>
                    <Grid item xs={5}>
                        <FlagSelector 
                            id="exit" 
                            label="Exit" 
                            flags={DOOR_RESET_DIRECTIONS} 
                            value={reset.exit} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                    </Grid>
                    <Grid item xs={5}>
                        <FlagSelector 
                            id="exit_state" 
                            label="Exit State" 
                            flags={DOOR_RESET_FLAGS} 
                            value={reset.exit_state} 
                            onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                    </Grid>
                    </Validate>
                    <Grid item xs={12}>
                        <TrapResetEditor 
                            id="trap_reset"
                            pointer={reset.uuid} />
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={16}>
                {this.generate()}
                <Grid item xs={1}>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}
DoorResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
DoorResetsEditor = withStyles(paper_style)(connect(
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
)(DoorResetsEditor))

class RoomResetsEditor extends React.Component {
    modelClass = RoomReset;
    generate() {
        return this.props.room_resets.filter(r=>(r.room===this.props.vnum)).map((reset, index) => (
            <Grid item xs={12} key={index}>
                <Paper classes={{root:this.props.classes.paper}}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={1}>
                            <IconButton tooltip="Remove" onClick={()=>(this.props.handleDelete(reset.uuid))}>
                                <Icon color="error">remove_circle</Icon>
                            </IconButton>
                        </Grid>
                        <Validate validator={room_reset_validator}>
                        <Grid item xs={5}>
                            <FlagSelector 
                                id="bit_type" 
                                label="Reset Bit" 
                                flags={RESET_BIT_CODES} 
                                value={reset.bit_type} 
                                onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                        </Grid>
                        <Grid item xs={5}>
                            <FlagSelector 
                                id="flag" 
                                label="Room Flag" 
                                flags={ROOM_FLAGS} 
                                value={reset.flag} 
                                onChange={(e,v)=>(this.props.setProp(reset.uuid, e.target.id, v))} />
                        </Grid>
                        </Validate>
                    </Grid>
                </Paper>
            </Grid>
        ));
    }
    render() {
        return (
            <Grid container spacing={16}>
                {this.generate()}
                <Grid item xs={1}>
                    <IconButton tooltip="Add" onClick={()=>(this.props.handleNew(this.props.vnum))}>
                        <Icon>add_box</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}
RoomResetsEditor.propTypes = {
    classes: PropTypes.object.isRequired
}
RoomResetsEditor = withStyles(paper_style)(connect(
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
)(RoomResetsEditor))

export default withTheme()(RoomPanel);